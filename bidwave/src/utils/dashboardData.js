export const BUYER_STATS = [
  { label: "Active Bids", value: "4" },
  { label: "Auctions Won", value: "12" },
  { label: "Total Spent", value: "₹1.2L" },
  { label: "Items Received", value: "11" },
];

export const SELLER_STATS = [
  { label: "Active Listings", value: "3" },
  { label: "Total Sold", value: "18" },
  { label: "Total Earned", value: "₹2.4L" },
  { label: "Pending Payout", value: "₹8,400" },
];

export const BUYER_ORDERS = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&fit=crop",
    amount: 12400,
    delivery: 80,
    status: "in_transit",
    date: "Jun 1, 2025",
  },
  {
    id: 2,
    title: "Vintage Mechanical Watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&fit=crop",
    amount: 45000,
    delivery: 80,
    status: "delivered",
    date: "May 28, 2025",
  },
  {
    id: 3,
    title: "Canon EOS R50 Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&fit=crop",
    amount: 38000,
    delivery: 150,
    status: "payment_pending",
    date: "Jun 2, 2025",
  },
  {
    id: 4,
    title: "PlayStation 5 Console",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=100&fit=crop",
    amount: 42000,
    delivery: 150,
    status: "awaiting_item",
    date: "May 30, 2025",
  },
];

export const SELLER_LISTINGS = [
  {
    id: 1,
    title: 'MacBook Pro 14" M2',
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&fit=crop",
    currentBid: 95000,
    totalBids: 43,
    status: "live",
    endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Trek Mountain Bike",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=100&fit=crop",
    currentBid: 22000,
    totalBids: 19,
    status: "live",
    endsAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Antique Brass Table Lamp",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&fit=crop",
    currentBid: 3200,
    totalBids: 9,
    status: "ended",
    endsAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Handmade Wooden Bookshelf",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=100&fit=crop",
    currentBid: 8500,
    totalBids: 12,
    status: "awaiting_shipment",
    endsAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];
