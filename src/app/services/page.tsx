import { Metadata } from "next";
import NavBar from "@/app/ui/util/header";

export const metadata: Metadata ={
  title: 'Services | HandCrafted Haven',
} 

export default function Contact() {
return (
    <div className="border-4 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 col-end-3 items-center sm:items-start w-full">
        <NavBar />
        <div>
          <h1> Services Page Coming Soon</h1>
        </div>
      </main>
    </div>

  );
}