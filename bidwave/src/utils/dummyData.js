export const DUMMY_AUCTIONS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Headphones",
    description:
      "Industry leading noise cancellation with 30hr battery life. Barely used, mint condition.",
    category: "Electronics",
    size: "Small",
    deliveryCharge: 80,
    currentBid: 12400,
    startingBid: 8000,
    totalBids: 24,
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop",
    seller: "Rohan M.",
    status: "live",
  },
  {
    id: 2,
    title: "Vintage Mechanical Watch",
    description:
      "Rare 1970s Swiss mechanical watch. Fully serviced and working perfectly.",
    category: "Accessories",
    size: "Small",
    deliveryCharge: 80,
    currentBid: 45000,
    startingBid: 30000,
    totalBids: 57,
    endsAt: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&fit=crop",
    seller: "Priya S.",
    status: "live",
  },
  {
    id: 3,
    title: "Canon EOS R50 Camera",
    description:
      "Mirrorless camera with 18-45mm kit lens. 100% shutter count, all original accessories included.",
    category: "Electronics",
    size: "Medium",
    deliveryCharge: 150,
    currentBid: 38000,
    startingBid: 25000,
    totalBids: 31,
    endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&fit=crop",
    seller: "Amit K.",
    status: "live",
  },
  {
    id: 4,
    title: 'MacBook Pro 14" M2',
    description:
      "Apple MacBook Pro M2 chip, 16GB RAM, 512GB SSD. AppleCare valid till 2026.",
    category: "Electronics",
    size: "Medium",
    deliveryCharge: 150,
    currentBid: 95000,
    startingBid: 75000,
    totalBids: 43,
    endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&fit=crop",
    seller: "Sneha R.",
    status: "live",
  },
  {
    id: 5,
    title: "Handmade Wooden Bookshelf",
    description:
      "Solid teak wood bookshelf, 5 shelves, custom built. Perfect condition.",
    category: "Furniture",
    size: "Large",
    deliveryCharge: 400,
    currentBid: 8500,
    startingBid: 5000,
    totalBids: 12,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&fit=crop",
    seller: "Vikram T.",
    status: "live",
  },
  {
    id: 6,
    title: "PlayStation 5 Console",
    description:
      "PS5 Disc Edition with 2 controllers and 3 games. Excellent condition.",
    category: "Electronics",
    size: "Medium",
    deliveryCharge: 150,
    currentBid: 42000,
    startingBid: 35000,
    totalBids: 38,
    endsAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&fit=crop",
    seller: "Arjun P.",
    status: "live",
  },
  {
    id: 7,
    title: "Antique Brass Table Lamp",
    description:
      "Beautiful antique brass lamp from Rajasthan. Unique piece, fully functional.",
    category: "Home Decor",
    size: "Small",
    deliveryCharge: 80,
    currentBid: 3200,
    startingBid: 2000,
    totalBids: 9,
    endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&fit=crop",
    seller: "Meera J.",
    status: "live",
  },
  {
    id: 8,
    title: "Trek Mountain Bike",
    description:
      "Trek Marlin 7 mountain bike, 2022 model. Hydraulic disc brakes, barely ridden.",
    category: "Sports",
    size: "Large",
    deliveryCharge: 400,
    currentBid: 22000,
    startingBid: 15000,
    totalBids: 19,
    endsAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&fit=crop",
    seller: "Karan B.",
    status: "live",
  },
];

export const CATEGORIES = [
  "All",
  "Electronics",
  "Accessories",
  "Furniture",
  "Home Decor",
  "Sports",
];
export const SIZES = ["All", "Small", "Medium", "Large"];
