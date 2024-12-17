'use server';
 
import { signIn } from 'auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


const FormSchema = z.object({
  id: z.number().int(),
  product_id: z.number({
    invalid_type_error: 'Please select a product',
  }).int(),
  reviewer_name: z.string({invalid_type_error: 'Please enter a valid Name.',}),
  rating: z.number().int().gte(1).lte(5),
  comment: z.string(),
});

const AddReview = FormSchema.omit({id: true });
const maxIdQuery = await sql`SELECT MAX(id) FROM reviews`;
const maxId = maxIdQuery.rows[0]?.max ?? 0;
const nextId = (maxId+ 1);

export type State = {
  errors?: {
    product_id?: string[];
    reviewer_name?: string[];
    rating?: string[];
    comment?: string[];
  };
  message?: string | null;
};

export async function addReview(prevState: State, formData: FormData) { 
  
  const validatedFields = AddReview.safeParse({
    product_id: Number(formData.get('product_id')),
    reviewer_name: formData.get('reviewer_name'),
    rating: Number(formData.get('rating')),
    comment: formData.get('comment'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: { ...validatedFields.error.flatten().fieldErrors},
      message: 'Missing Fields. Failed to Add Review.',
    };
  }
   const { product_id, reviewer_name, rating, comment } = validatedFields.data;
  console.log(`QUERY STRING:   INSERT INTO reviews (product_id, reviewer_name, rating, comment)
      VALUES (${product_id}, ${reviewer_name}, ${rating}, ${comment})
      RETURNING id;`);
    try {
    // Insert query
     await sql`
      INSERT INTO reviews (id, product_id, reviewer_name, rating, comment)
      VALUES (${nextId}, ${product_id}, ${reviewer_name}, ${rating}, ${comment})
      RETURNING id;`;  // This will return the inserted review's id

  } catch (error) {
     console.error('Database error:', error); // Log the error for debugging
    return {message: '500: Failed to Add Reivew.'}
  }
  revalidatePath(`/products/${product_id}`);
  redirect(`/products/${product_id}`);
}

