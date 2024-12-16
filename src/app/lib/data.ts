import { sql } from '@vercel/postgres';
import { db } from '@vercel/postgres';
import {
    Product,
    Seller,
    Review,
} from "./definitions";




export async function fetchProductsData(
  limit: number,
  query: string,
  seller_id?: string,
) {
    try {
      if (limit <= 0) {
        throw new Error('The limit must be a positive number.');
      }
  
      const data = seller_id
    ? await sql<Product>`
        SELECT
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          products.category,
          products.created_at,
          sellers.id AS seller_id,
          sellers.shop_name
        FROM products
        JOIN sellers ON products.seller_id = sellers.id
        WHERE
          sellers.id = ${seller_id} AND (
            products.name ILIKE ${`%${query}%`} OR
            products.description ILIKE ${`%${query}%`} OR
            products.category ILIKE ${`%${query}%`} OR
            sellers.shop_name ILIKE ${`%${query}%`}
          )
        LIMIT ${limit};
      `
    : await sql<Product>`
        SELECT
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          products.category,
          products.created_at,
          sellers.id AS seller_id,
          sellers.shop_name
        FROM products
        JOIN sellers ON products.seller_id = sellers.id
        WHERE
          products.name ILIKE ${`%${query}%`} OR
          products.description ILIKE ${`%${query}%`} OR
          products.category ILIKE ${`%${query}%`} OR
          sellers.shop_name ILIKE ${`%${query}%`}
        LIMIT ${limit};
      `;
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      return data.rows;
  
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch product data.');
    }
  }

  export async function fetchReviewsData(limit: number, product_id: string) {
    try {
      const data = await sql<Review>`SELECT * FROM reviews WHERE product_id = ${product_id} LIMIT ${limit}`;
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      return data.rows || null;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return null;
    }
  }

export async function fetchProductById(id: string) {
    try {
      const { rows } = await sql<Product>`SELECT * FROM products WHERE id = ${id}`;
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
  }

  export async function fetchProductByCategory(category: string, limit: number) {
    try {
      const { rows } = await sql<Product>`SELECT * FROM products WHERE category = ${category} LIMIT ${limit}`;
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
  }


export async function fetchSellerById(id: string) {
    try {
      const { rows } = await sql<Seller>`SELECT * FROM sellers WHERE id = ${id}`;
      //await new Promise((resolve) => setTimeout(resolve, 3000));
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
}

export async function fetchReviewsById(product_id: string, limit: number) {
  try {
    const { rows } = await sql<Review>`SELECT * FROM reviews WHERE id = ${product_id} LIMIT ${limit}`;
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return rows || null;
  }catch (error) {
  console.error('Error fetching product reviews', error);
  return null;
  }
}

export async function fetchReviewIdIndex() {
  try {
    const { rows } = await sql<Review>`SELECT id FROM reviews ORDER BY id DESC LIMIT 1`;
    return rows || null;
  }catch (error) {
  console.error('Error fetching product reviews id index', error);
  return null;
  }
}

export async function addReview(reviewData: { 
  product_id: string,
  reviewer_name: string,
  rating: number,
  comment: string 
}) {

  const client = await db.connect();
    try {
    // Insert query
    const { rows } = await client.sql`
      INSERT INTO reviews (product_id, reviewer_name, rating, comment)
      VALUES (${reviewData.product_id}, ${reviewData.reviewer_name}, ${reviewData.rating}, ${reviewData.comment})
      RETURNING id;`;  // This will return the inserted review's id

    return rows ? rows[0].id : null;  // Return the id of the inserted review or null if nothing is inserted
  } catch (error) {
    console.error('Error inserting review', error);
    throw new Error('Undable to insert review');
    //return null; // Return null if there was an error
  }
}

/*


  export type Review = {
    id: number;
    product_id: number;
    reviewer_name: string;
    rating: number;
    comment: string;
  };
export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

*/