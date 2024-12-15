import { notFound } from 'next/navigation';
import NavBar from '@/app/ui/util/header';
import { SellerCard } from '@/app/ui/seller/card';
import { CardWrapper, ProductPageCard } from '@/app/ui/products/cards';
import { CardsSkeleton, ProductPageCardSkeleton } from '@/app/ui/products/skeletons';
import { SellerCardSkeleton } from '@/app/ui/seller/skeletons';
import { Suspense } from 'react';
import { fetchProductById } from '@/app/lib/data';
import { ReviewWrapper, ReviewsCardWrapperSkeleton } from '@/app/ui/products/review';

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
  
  // Fetch the product data to verify existence
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 col-end-3 items-center sm:items-start w-full">
        <NavBar />
        <div className="pt-20 md:pt-5">
          <Suspense fallback={<ProductPageCardSkeleton />}>
            <ProductPageCard id={id} />
          </Suspense>

        </div>
        <div className="pt-16">
          {product.seller_id && (
            <Suspense fallback={<SellerCardSkeleton />}>
              <SellerCard sellerId={product.seller_id} />
            </Suspense>
          )}
          <Suspense fallback={<ReviewsCardWrapperSkeleton />}>
            <ReviewWrapper product_id={id} limit={10} />
          </Suspense>
        </div>
        <h1 className="text-2xl font-bold p-4">Similar Products:</h1>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper seller_id='' query={query} limit={8}  />
        </Suspense>
      </main>
    </div>
  );
}
