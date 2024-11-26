import Image from "next/image";
import CardWrapper from "./ui/products/cards";
import NavBar from "./ui/util/header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <NavBar />

        <Image
          className="w-full mt-2"
          src="/hero-mobile.webp"
          alt="Hancrafted Haven Hero"
          width={700}
          height={464}
          priority
        />
        <CardWrapper/>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
