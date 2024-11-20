const sellers = [
  { id: 1, shop_name: 'Alice\'s Pottery', bio: 'Handmade ceramic artist with a love for nature.', member_id: 1 },
  { id: 2, shop_name: 'Bob\'s Woodworks', bio: 'Woodworker creating custom furniture pieces.', member_id: 2 },
  { id: 3, shop_name: 'Clara\'s Knits', bio: 'Knitting beautiful scarves, hats, and mittens.', member_id: 3 },
  { id: 4, shop_name: 'David\'s Metals', bio: 'Metalworker making unique sculptures.', member_id: 4 },
  { id: 5, shop_name: 'Eva\'s Eco Jewelry', bio: 'Jewelry designer focused on eco-friendly pieces.', member_id: 5 },
  { id: 6, shop_name: 'Frank\'s Leather', bio: 'Leatherworker crafting handmade bags and wallets.', member_id: 6 },
  { id: 7, shop_name: 'Grace\'s Art Studio', bio: 'Painter and visual artist inspired by abstract designs.', member_id: 7 },
  { id: 8, shop_name: 'Henry\'s Candles', bio: 'Crafting candles with a focus on unique scents.', member_id: 8 },
  { id: 9, shop_name: 'Isla\'s Felt Creations', bio: 'Felt artist creating hand-stitched animals and dolls.', member_id: 9 },
  { id: 10, shop_name: 'Jack\'s Rustic Home', bio: 'Handcrafting rustic home decor and furniture.', member_id: 10 },
];

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
        updated_at: '2024-11-19T10:00:00Z'
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
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 3,
        name: 'Knitted Wool Scarf',
        description: 'A cozy, hand-knitted wool scarf perfect for cold weather.',
        price: 45.00,
        image_url: 'https://example.com/images/wool_scarf.jpg',
        category: 'accessories',
        seller_id: 3,  // Seller: Clara Davis
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 4,
        name: 'Metal Sculpture',
        description: 'A unique, handcrafted metal sculpture for home or garden decor.',
        price: 120.00,
        image_url: 'https://example.com/images/metal_sculpture.jpg',
        category: 'art',
        seller_id: 4,  // Seller: David Lee
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 5,
        name: 'Eco-Friendly Silver Necklace',
        description: 'A handcrafted silver necklace with an eco-friendly design.',
        price: 85.00,
        image_url: 'https://example.com/images/silver_necklace.jpg',
        category: 'jewelry',
        seller_id: 5,  // Seller: Eva Garcia
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 6,
        name: 'Leather Wallet',
        description: 'A handmade leather wallet with a simple, classic design.',
        price: 45.00,
        image_url: 'https://example.com/images/leather_wallet.jpg',
        category: 'accessories',
        seller_id: 6,  // Seller: Frank Miller
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 7,
        name: 'Abstract Canvas Painting',
        description: 'A vibrant and modern abstract painting for your home or office.',
        price: 250.00,
        image_url: 'https://example.com/images/abstract_painting.jpg',
        category: 'art',
        seller_id: 7,  // Seller: Grace White
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 8,
        name: 'Scented Candle Set',
        description: 'A set of three hand-poured scented candles with unique fragrances.',
        price: 30.00,
        image_url: 'https://example.com/images/scented_candles.jpg',
        category: 'home_decor',
        seller_id: 8,  // Seller: Henry Moore
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 9,
        name: 'Handcrafted Felt Animals',
        description: 'A collection of hand-stitched felt animals, each uniquely designed.',
        price: 20.00,
        image_url: 'https://example.com/images/felt_animals.jpg',
        category: 'toys',
        seller_id: 9,  // Seller: Isla Taylor
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
        id: 10,
        name: 'Rustic Wood Shelves',
        description: 'Handcrafted rustic wood shelves perfect for home decor.',
        price: 70.00,
        image_url: 'https://example.com/images/rustic_shelves.jpg',
        category: 'woodwork',
        seller_id: 10,  // Seller: Jack Black
        created_at: '2024-11-19T10:00:00Z',
        updated_at: '2024-11-19T10:00:00Z'
    },
    {
      id: 11,
      name: 'Handmade Ceramic Bowl',
      description: 'A handcrafted ceramic bowl with a smooth, polished finish.',
      price: 30.00,
      image_url: 'https://example.com/images/ceramic_bowl.jpg',
      category: 'ceramics',
      seller_id: 1,  // Seller: Alice Johnson
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 12,
      name: 'Wooden Coffee Table',
      description: 'A sturdy, handmade wooden coffee table, perfect for any living room.',
      price: 150.00,
      image_url: 'https://example.com/images/wooden_coffee_table.jpg',
      category: 'woodwork',
      seller_id: 2,  // Seller: Bob Smith
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 13,
      name: 'Knitted Wool Hat',
      description: 'A cozy, hand-knitted wool hat to keep you warm during the winter.',
      price: 30.00,
      image_url: 'https://example.com/images/wool_hat.jpg',
      category: 'accessories',
      seller_id: 3,  // Seller: Clara Davis
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 14,
      name: 'Metal Wall Art',
      description: 'A stunning piece of metal wall art, handmade to add charm to any room.',
      price: 95.00,
      image_url: 'https://example.com/images/metal_wall_art.jpg',
      category: 'art',
      seller_id: 4,  // Seller: David Lee
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 15,
      name: 'Eco-Friendly Wooden Earrings',
      description: 'A pair of handmade wooden earrings made from sustainable materials.',
      price: 25.00,
      image_url: 'https://example.com/images/wooden_earrings.jpg',
      category: 'jewelry',
      seller_id: 5,  // Seller: Eva Garcia
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 16,
      name: 'Leather Crossbody Bag',
      description: 'A handmade leather crossbody bag with an adjustable strap.',
      price: 120.00,
      image_url: 'https://example.com/images/leather_crossbody_bag.jpg',
      category: 'accessories',
      seller_id: 6,  // Seller: Frank Miller
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 17,
      name: 'Abstract Art Print',
      description: 'A print of an original abstract painting, framed and ready to hang.',
      price: 85.00,
      image_url: 'https://example.com/images/abstract_art_print.jpg',
      category: 'art',
      seller_id: 7,  // Seller: Grace White
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 18,
      name: 'Lavender Scented Candle',
      description: 'A hand-poured lavender scented candle with a calming fragrance.',
      price: 15.00,
      image_url: 'https://example.com/images/lavender_candle.jpg',
      category: 'home_decor',
      seller_id: 8,  // Seller: Henry Moore
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 19,
      name: 'Handmade Felt Doll',
      description: 'A cute, hand-stitched felt doll, perfect for children.',
      price: 25.00,
      image_url: 'https://example.com/images/felt_doll.jpg',
      category: 'toys',
      seller_id: 9,  // Seller: Isla Taylor
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 20,
      name: 'Rustic Wooden Shelf',
      description: 'A handmade rustic wooden shelf, perfect for any living space.',
      price: 80.00,
      image_url: 'https://example.com/images/rustic_wooden_shelf.jpg',
      category: 'woodwork',
      seller_id: 10,  // Seller: Jack Black
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 21,
      name: 'Ceramic Mugs Set',
      description: 'Set of two handmade ceramic mugs, perfect for your morning coffee.',
      price: 40.00,
      image_url: 'https://example.com/images/ceramic_mugs.jpg',
      category: 'ceramics',
      seller_id: 1,  // Seller: Alice Johnson
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 22,
      name: 'Handmade Wooden Spoon',
      description: 'A hand-carved wooden spoon made from sustainable hardwood.',
      price: 18.00,
      image_url: 'https://example.com/images/wooden_spoon.jpg',
      category: 'woodwork',
      seller_id: 2,  // Seller: Bob Smith
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 23,
      name: 'Chunky Knit Blanket',
      description: 'A chunky hand-knit blanket to keep you cozy during winter.',
      price: 150.00,
      image_url: 'https://example.com/images/chunky_blanket.jpg',
      category: 'knits',
      seller_id: 3,  // Seller: Clara Davis
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 24,
      name: 'Metal Garden Sculpture',
      description: 'A beautifully crafted metal sculpture designed for outdoor gardens.',
      price: 200.00,
      image_url: 'https://example.com/images/metal_garden_sculpture.jpg',
      category: 'art',
      seller_id: 4,  // Seller: David Lee
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
  },
  {
      id: 25,
      name: 'Recycled Glass Necklace',
      description: 'A beautiful necklace made from 100% recycled glass.',
      price: 35.00,
      image_url: 'https://example.com/images/recycled_glass_necklace.jpg',
      category: 'jewelry',
      seller_id: 5,  // Seller: Eva Garcia
      created_at: '2024-11-19T10:00:00Z',
      updated_at: '2024-11-19T10:00:00Z'
    }
];

const members = [
  { id: 1, name: 'Alice Johnson', email: 'aliceuser@example.com', password: 'hashedpassword1', role: 'seller', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 2, name: 'Bob Smith', email: 'bobuser@example.com', password: 'hashedpassword2', role: 'seller', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 3, name: 'Clara Davis', email: 'claraduser@example.com', password: 'hashedpassword3', role: 'buyer', created_at: '2024-01-02', updated_at: '2024-01-02' },
  { id: 4, name: 'David Lee', email: 'daviduser@example.com', password: 'hashedpassword4', role: 'buyer', created_at: '2024-01-03', updated_at: '2024-01-03' },
  { id: 5, name: 'Eva Garcia', email: 'evauser@example.com', password: 'hashedpassword5', role: 'buyer', created_at: '2024-01-04', updated_at: '2024-01-04' },
  { id: 6, name: 'Frank Miller', email: 'frankuser@example.com', password: 'hashedpassword6', role: 'seller', created_at: '2024-01-05', updated_at: '2024-01-05' },
  { id: 7, name: 'Grace White', email: 'graceuser@example.com', password: 'hashedpassword7', role: 'buyer', created_at: '2024-01-06', updated_at: '2024-01-06' },
  { id: 8, name: 'Henry Moore', email: 'henryuser@example.com', password: 'hashedpassword8', role: 'buyer', created_at: '2024-01-07', updated_at: '2024-01-07' },
  { id: 9, name: 'Isla Taylor', email: 'islauser@example.com', password: 'hashedpassword9', role: 'seller', created_at: '2024-01-08', updated_at: '2024-01-08' },
  { id: 10, name: 'Jack Black', email: 'jackuser@example.com', password: 'hashedpassword10', role: 'buyer', created_at: '2024-01-09', updated_at: '2024-01-09' },
  { id: 11, name: 'Olivia Brown', email: 'oliviauser@example.com', password: 'hashedpassword11', role: 'buyer', created_at: '2024-01-10', updated_at: '2024-01-10' },
  { id: 12, name: 'Liam Harris', email: 'liamuser@example.com', password: 'hashedpassword12', role: 'seller', created_at: '2024-01-11', updated_at: '2024-01-11' },
];

const reviews = [
  { id: 1, product_id: 1, member_id: 1, rating: 5, comment: 'Absolutely love these handmade ceramics! The details are stunning.' },
  { id: 2, product_id: 2, member_id: 2, rating: 4, comment: 'Great custom furniture, but a bit on the expensive side.' },
  { id: 3, product_id: 3, member_id: 3, rating: 5, comment: 'Beautiful scarves! Perfect for the winter season.' },
  { id: 4, product_id: 4, member_id: 4, rating: 3, comment: 'Sculpture is nice, but the finish could be improved.' },
  { id: 5, product_id: 5, member_id: 5, rating: 5, comment: 'Eco-friendly and stylish jewelry, love it!' },
  { id: 6, product_id: 6, member_id: 6, rating: 5, comment: 'Amazing craftsmanship on the leather bags. Very durable!' },
  { id: 7, product_id: 7, member_id: 7, rating: 4, comment: 'The painting is good, but I expected more vibrant colors.' },
  { id: 8, product_id: 8, member_id: 8, rating: 5, comment: 'The candles smell amazing! So relaxing.' },
  { id: 9, product_id: 9, member_id: 9, rating: 4, comment: 'The felt creations are cute, but a little pricey for the size.' },
  { id: 10, product_id: 10, member_id: 10, rating: 5, comment: 'Rustic and unique home decor pieces that really stand out.' },
  { id: 11, product_id: 1, member_id: 11, rating: 5, comment: 'The pottery is beautiful and the craftsmanship is top notch. Highly recommend!' },
  { id: 12, product_id: 2, member_id: 12, rating: 5, comment: 'Love the custom furniture! It fits perfectly in my living room.' }
];


export { products, sellers, reviews, members };
  