export type Seller = {
    id: number;
    shop_name: string;
    bio: string;
    image_url: string;
    member_id: number;
  };
  
  export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    seller_id: string;
    created_at: string;
    updated_at: string;
  };
  
  export type Member = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'seller' | 'buyer';
    created_at: string;
    updated_at: string;
  };
  
  export type Review = {
    id: number;
    product_id: number;
    member_id: number;
    rating: number;
    comment: string;
  };
  