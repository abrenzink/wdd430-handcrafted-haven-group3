import Image from 'next/image';
import { fetchProductById, fetchSellerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import NavBar from '@/app/ui/util/header';
import SellerCard from '@/app/ui/seller/card';
import CardWrapper from '@/app/ui/products/cards';

export default async function Page({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

  // Fetch the product data
  const product = await fetchProductById(id);
  let seller = null;
  if (product) {
    seller = await fetchSellerById(product.seller_id)
  }
//   let categoryProducts = null;
//   if (product) {
//     categoryProducts = await fetchProductByCategory(product.category, 4)
//   }
  

  if (!product) {
    notFound();
  }

  return (
    <main>
      <NavBar />
      <div className="pt-20 md:pt-5">
      <h1 className="text-4xl font-bold">{product.name}</h1>
        <div className="md:flex">
            <Image
                src={product.image_url}
                alt={product.name}
                width={500}
                height={300}
                className="h-40 w-full object-cover rounded-md mb-4"
            />
            <div>
                <p className="text-sm text-gray-700">{product.description}</p>
                <p className="mt-2 font-semibold">${product.price}</p>
                <p className="mt-1 text-xs text-gray-500">Category: {product.category}</p>
            </div>
        </div>
      </div>
      <div className="pt-16">
      {seller && (
        <SellerCard seller={seller}/>
      )}
      </div>
      <h1 className="text-2xl font-bold p-4">Similar Products:</h1>
      <CardWrapper limit={4}/>
    </main>
  );
}