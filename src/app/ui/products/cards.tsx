import Link from 'next/link';
import Image from 'next/image';
import { fetchProductsData } from '@/app/lib/data';


export default async function CardWrapper({ limit }: { limit: number }) {
  const products = await fetchProductsData(limit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        src={product.image_url}
        alt={product.name}
        width={500}
        height={300}
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-sm text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold">${product.price}</p>
      <p className="mt-1 text-xs text-gray-500">Category: {product.category}</p>
    </div>
  );
}
  