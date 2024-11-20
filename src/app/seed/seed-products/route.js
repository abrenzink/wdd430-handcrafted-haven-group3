import { db } from '@vercel/postgres';
import { products } from '../../lib/placeholder-data';

const client = await db.connect();

async function seedProducts() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      image_url VARCHAR(255),
      category VARCHAR(255) NOT NULL,
      seller_id INTEGER NOT NULL,
      FOREIGN KEY (seller_id) REFERENCES sellers(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      deleted_at TIMESTAMP DEFAULT NULL
    );
  `;


  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      // Check if seller_id exists on table 'sellers'
      const seller = await client.sql`
        SELECT id FROM sellers WHERE id = ${product.seller_id};
      `;

      if (seller.rowCount > 0) {
        return client.sql`
          INSERT INTO products (id, name, description, price, image_url, category, seller_id)
          VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.image_url}, ${product.category}, ${product.seller_id})
          ON CONFLICT (id) DO NOTHING;
        `;
      }
    }),
  );

  return insertedProducts;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedProducts();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Products table seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }