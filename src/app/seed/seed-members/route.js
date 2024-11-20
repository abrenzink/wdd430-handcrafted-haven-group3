import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { members } from '../../lib/placeholder-data';

const client = await db.connect();

async function seedMembers() {
    // IMPORTANT: If you receive an error with "code": "42710", 
    // it means the enum type already exists in PostgreSQL. 
    // This error can be safely ignored if the type is already created.
    // PostgreSQL CREATE TYPE does not support "IF NOT EXISTS". 

    await client.sql`CREATE TYPE user_role AS ENUM ('admin', 'seller', 'buyer');`;

    await client.sql`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role user_role NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `;
  
    const insertedMembers = await Promise.all(
      members.map((member) => {
        return client.sql`
          INSERT INTO members (id, name, email, password, role)
          VALUES (${member.id}, ${member.name}, ${member.email}, ${member.password}, ${member.role})
          ON CONFLICT (email) DO NOTHING;
        `;
      })
    );
  
    return insertedMembers;
  }

export async function GET() {
    try {
      await client.sql`BEGIN`;
      const result = await seedMembers();
      await client.sql`COMMIT`;
  
      return Response.json({ message: `Members table seeded successfully` });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }