import Image from "next/image";
//import { Seller } from "@/app/lib/definitions";
import { fetchSellerById } from "@/app/lib/data";


export async function SellerCard({ sellerId }: { sellerId: string }) {
  const seller = await fetchSellerById(sellerId);

  if (!seller) {
    return null; // or show an error message
  }

  return (
    <div className="flex items-start gap-6">
      <Image
        src={seller.image_url}
        alt={seller.shop_name}
        width={40}
        height={40}
        className="h-40 w-40 object-cover rounded-full"
      />
      <div>
        <h2 className="text-xl font-bold">{seller.shop_name}</h2>
        <p className="text-sm text-gray-700">{seller.bio}</p>
      </div>
    </div>
  );
}
