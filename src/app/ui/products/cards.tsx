import Link from 'next/link';
import Image from 'next/image';
import { fetchProductsData, fetchProductById } from '@/app/lib/data';


export async function CardWrapper({ limit }: { limit: number }) {
  const products = await fetchProductsData(limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard key={product.id} product={product} />
        </Link>
      ))}
    </div>
  );
}

export function ProductCard({
  product,
}: {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
  };
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <Image
      //I used this image as a place holder to see the layout. 
      //DELETE LINE 36 and UNCOMMENT 37
        src={"/ceramicMug.jpg"}
        // src={"product.image_url"}
        alt={product.name}
        width={500}
        height={300}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-ubuntu font-bold">{product.name}</h3>
      <p className="text-sm font-ubuntu text-gray-700">{product.description}</p>
      <p className="mt-2 font-ubtuntu font-semibold">${product.price}</p>
      <p className="mt-1 font-ubtuntu text-xs text-gray-500">Category: {product.category}</p>
    </div>
  );
}
  

export async function ProductPageCard({ id }: { id: string }) {
  const product = await fetchProductById(id);

  if (!product) {
    return null; // or show an error message
  }

  return (
    <div>
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
  );
}