//import { Ubuntu } from '@/app/ui/fonts';
//import { fetchCardData } from '@/app/lib/data';


export default function CardWrapper() {
    const products = [
      {
        id: 1,
        name: 'Handmade Ceramic Mug',
        description: 'A beautifully crafted ceramic mug with a unique design.',
        price: 20.00,
        image_url: 'https://example.com/images/ceramic_mug.jpg',
        category: 'ceramics',
        seller_id: 1,  // Seller: Alice Johnson
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z',
      },
      {
        id: 2,
        name: 'Wooden Serving Tray',
        description: 'A handcrafted wooden tray for serving food or drinks.',
        price: 35.00,
        image_url: 'https://example.com/images/wooden_tray.jpg',
        category: 'woodwork',
        seller_id: 2,  // Seller: Bob Smith
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z',
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
        <img
          src={product.image_url}
          alt={product.name}
          className="h-40 w-full object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
        <p className="mt-1 text-xs text-gray-500">Category: {product.category}</p>
      </div>
    );
  }
  