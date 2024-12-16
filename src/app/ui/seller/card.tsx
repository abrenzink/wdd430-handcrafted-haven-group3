import Image from "next/image";
//import { Seller } from "@/app/lib/definitions";
import { fetchSellerById } from "@/app/lib/data";


export async function SellerCard({ sellerId }: { sellerId: string }) {
  const seller = await fetchSellerById(sellerId);

  if (!seller) {
    return null; // or show an error message
  }

  return (
    <div className="flex items-start gap-6 p-4 pb-10">
      <Image
        src={`/logos/${seller.image_url}`}
        alt={seller.shop_name}
        width={150}
        height={150}
        className="object-cover rounded-full"
      />
      <div className="p-10">
        <h2 className="text-xl font-bold">{seller.shop_name}</h2>
        <p className="text-sm text-gray-700">{seller.bio}</p>
      </div>
    </div>
  );
}
