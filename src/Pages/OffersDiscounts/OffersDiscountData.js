const OffersDiscoountData = [
  {
    id: "DS001",
    title: "Early Bird Discount",
    description: "Limited period discount",
    amount: 10,
    type: "percentage",
    terms: "Valid before 31 March",
    userType: ["user"],
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    status: "active",
  },
  {
    id: "OF001",
    title: "Diwali Mega Offer",
    description: "Festival offer",
    assets: "image-url",
    priceValue: 200000,
    userType: ["agent"],
    startDate: "2026-10-01",
    endDate: "2026-10-31",
    status: "inactive",
  },
  {
    id: "OF002",
    title: "New Year Offer",
    description: "Special price",
    priceValue: 150000,
    userType: ["agent", "user"],
    startDate: "2026-01-01",
    endDate: "2026-03-28",
    status: "active",
  },
];

export default OffersDiscoountData;
