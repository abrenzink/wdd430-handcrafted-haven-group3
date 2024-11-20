import { db } from '@vercel/postgres';
import { sellers } from '../../lib/placeholder-data';

const client = await db.connect();

async function seedSellers() {
    // Criando a tabela 'sellers' com o campo 'id' como SERIAL
    await client.sql`
      CREATE TABLE IF NOT EXISTS sellers (
        id SERIAL PRIMARY KEY,
        shop_name VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        image_url VARCHAR(255) DEFAULT NULL,
        member_id INTEGER NOT NULL,
        FOREIGN KEY (member_id) REFERENCES members(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT NULL
      );
    `;
  
    // Inserindo os vendedores na tabela 'sellers'
    const insertedSellers = await Promise.all(
      sellers.map(async (seller) => {
        const member = await client.sql`
          SELECT id FROM members WHERE id = ${seller.member_id};
        `;
        if (member.rowCount > 0) {
          return client.sql`
          INSERT INTO sellers (id, shop_name, bio, member_id)
          VALUES (${seller.id}, ${seller.shop_name}, ${seller.bio}, ${seller.member_id})
          ON CONFLICT (id) DO NOTHING;
        `;
        }
      }),
    );
  
    return insertedSellers;
  }

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedSellers();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Sellers table seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }