import { fetchSellerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import NavBar from '@/app/ui/util/header';
import { SellerCard } from '@/app/ui/seller/card';
import { CardWrapper } from '@/app/ui/products/cards';

export default async function Page(props:{ params: Promise<{id: string }>}) {
 const resolvedParams = await props.params;
  const id = resolvedParams.id;

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
    <main>
      <NavBar />
      <div className="pt-16">
      {seller && (
        <SellerCard sellerId={id}/>
      )}
      </div>
      <h1 className="text-2xl font-bold p-4">Products:</h1>
      <CardWrapper limit={4}/>
    </main>
  );
}
