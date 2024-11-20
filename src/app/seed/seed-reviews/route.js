import { db } from '@vercel/postgres';
import { reviews } from '../../lib/placeholder-data';

const client = await db.connect();

async function seedReviews() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id),
      member_id INTEGER NOT NULL,
      FOREIGN KEY (member_id) REFERENCES members(id),
      rating INTEGER,
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    );
  `;


  const insertedReviews = await Promise.all(
    reviews.map(async (review) => {
      // Check if seller_id exists on table 'sellers'
      const member = await client.sql`
        SELECT id FROM members WHERE id = ${review.member_id};
      `;

      const product = await client.sql`
      SELECT id FROM products WHERE id = ${review.product_id};
    `;

      if (member.rowCount > 0 && product.rowCount > 0) {
        return client.sql`
          INSERT INTO reviews (id, product_id, member_id, rating, comment)
          VALUES (${review.id}, ${review.product_id}, ${review.member_id}, ${review.rating}, ${review.comment})
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }),
  );

  return insertedReviews;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedReviews();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Reviews table seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }