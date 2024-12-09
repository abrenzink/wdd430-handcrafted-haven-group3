import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { Member, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getMember(email: string): Promise<Member | undefined> {
  try {
    const member = await sql<Member>`SELECT * FROM members WHERE email=${email}`;
    return member.rows[0];
  } catch (error) {
    console.error('Failed to fetch member:', error);
    throw new Error('Failed to fetch member.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const member = await getMember(email);
          if (!member) return null;

          const passwordsMatch = await bcrypt.compare(password, member.password);
          if (passwordsMatch) {
            const user: User = {
              id: member.id.toString(),
              email: member.email,
              name: member.name,
              password: member.password,
            };
            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});