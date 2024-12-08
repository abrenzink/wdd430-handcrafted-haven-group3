import { fetchSellerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import NavBar from '@/app/ui/util/header';
import { SellerCard } from '@/app/ui/seller/card';
import { CardWrapper } from '@/app/ui/products/cards';

export default async function Page(props:{
  params: Promise<{id: string }>,
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  
  const resolvedParams = await props.params;
  const id = resolvedParams.id;

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  // Fetch the seller data
  const seller = await fetchSellerById(id);
//   let sellerProducts = null;
  if (seller) {
    // sellerProducts = await fetchProductsBySellerId(id)
  }
//   let categoryProducts = null;
//   if (product) {
//     categoryProducts = await fetchProductByCategory(product.category, 4)
//   }
  

  if (!seller) {
    notFound();
  }

  return (
    <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-5 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 col-end-3 items-center sm:items-start w-full">
      <NavBar />
      <div className="pt-16">
      {seller && (
        <SellerCard sellerId={id}/>
      )}
      </div>
      <h1 className="text-2xl font-bold p-4">Products:</h1>
      <CardWrapper seller_id={id} query={query} limit={4}/>
    </main>
    </div>
  );
}
