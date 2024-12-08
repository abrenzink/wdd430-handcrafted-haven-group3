import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { members } from '../../lib/placeholder-data';

const client = await db.connect();

// async function seedMembers() {
//     // IMPORTANT: If you receive an error with "code": "42710", 
//     // it means the enum type already exists in PostgreSQL. 
//     // This error can be safely ignored if the type is already created.
//     // PostgreSQL CREATE TYPE does not support "IF NOT EXISTS". 

//     await client.sql`CREATE TYPE user_role AS ENUM ('admin', 'seller', 'buyer');`;

//     await client.sql`
//       CREATE TABLE IF NOT EXISTS members (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,
//         role user_role NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         deleted_at TIMESTAMP DEFAULT NULL
//       );
//     `;
  
//     const insertedMembers = await Promise.all(
//       members.map((member) => {
//         return client.sql`
//           INSERT INTO members (id, name, email, password, role)
//           VALUES (${member.id}, ${member.name}, ${member.email}, ${member.password}, ${member.role})
//           ON CONFLICT (email) DO NOTHING;
//         `;
//       })
//     );
  
//     return insertedMembers;
//   }

export async function GET() {
  try {
    await client.sql`BEGIN`;
    const result = await addHashedPasswords();
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: result }), { status: 200 });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.error('Error updating passwords:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

async function addHashedPasswords() {
  // Retrieve existing members from the database
  const membersInDb = await client.sql`
    SELECT id, password FROM members;
  `;

  // Create a map to access the original passwords from placeholder data
  const membersMap = new Map(members.map((member) => [member.id, member.password]));

  // Update unhashed passwords
  for (const member of membersInDb.rows) { // Use .rows to access the data
    const originalPassword = membersMap.get(member.id);

    if (originalPassword && !member.password.startsWith('$2b$')) { // Check if already hashed
      const hashedPassword = await bcrypt.hash(originalPassword, 10);

      // Update the password in the database
      await client.sql`
        UPDATE members
        SET password = ${hashedPassword}
        WHERE id = ${member.id};
      `;
    }
  }

  return 'Passwords successfully updated';
}