import { Metadata } from 'next';
import Image from "next/image";
import { CardWrapper } from "./ui/products/cards";
import NavBar from "./ui/util/header";
import { Suspense } from "react";
import { CardsSkeleton } from "./ui/products/skeletons";

export const metadata: Metadata = {
  title: 'Home | Handcrafted Haven',
}

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 col-end-3 items-center sm:items-start w-full">
        <NavBar />

        <Image
          className="w-full"
          src="/hero-mobile.webp"
          alt="Hancrafted Haven Hero"
          width={700}
          height={465}
          priority
        />

        <div>
          <h3 className="font-ubuntu text-xl font-bold ">Welcome to Handcrafted Haven</h3>
          <p className="md:hidden">
              Discover unique, handmade treasures crafted by talented artisans. From jewelry to home décor, every piece is a story of creativity and care. Shop, support, and celebrate the beauty of handmade goods. 
          </p>
          <p className="hidden md:block">
            Experience the beauty of handmade artistry at Handcrafted Haven, your go-to marketplace for unique, artisan-crafted products. We connect independent makers with customers who value creativity, authenticity, and craftsmanship.

            From intricate jewelry and bespoke clothing to home décor and personalized gifts, every item in our collection is designed to inspire and delight. By shopping here, you support a community of passionate artisans dedicated to their craft.

            Explore the stories behind the creations and find something truly special—because every purchase is a celebration of handmade magic. 
          </p>
        </div>
        <Suspense key={query} fallback={ <CardsSkeleton/> }>
          <CardWrapper query={query} limit={8}/>
        </Suspense>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
