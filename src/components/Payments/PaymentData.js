const PaymentsData = [
  {
    id: "PAY001",
    client: "Rahul Sharma",
    phone: "9876543210",
    project: "Green City",

    totalAmount: 500000,
    paidAmount: 150000,

    payments: [
      {
        type: "booking",
        amount: 50000,
        mode: "UPI",
        date: "2026-02-18",
        status: "Approved",
        transactionId: "TXN001",
        attachment: "receipt1.pdf",
      },
      {
        type: "agreement",
        amount: 100000,
        mode: "Bank Transfer",
        date: "2026-03-01",
        status: "Approved",
        transactionId: "TXN002",
        attachment: "receipt2.pdf",
      },
    ],

    mode: "UPI",
    status: "Approved",
    dueStatus: "Partial Due",
    date: "2026-02-18",
  },

  {
    id: "PAY002",
    client: "Imran Khan",
    phone: "9123456789",
    project: "Sunshine Colony",

    totalAmount: 800000,
    paidAmount: 80000,

    payments: [
      {
        type: "booking",
        amount: 80000,
        mode: "Cash",
        date: "2026-01-10",
        status: "Approved",
        transactionId: "TXN001",
        attachment: "receipt1.pdf",
      },
    ],

    mode: "Cash",
    status: "Pending",
    dueStatus: "Partial Due",
    date: "2026-01-10",
  },

  {
    id: "PAY003",
    client: "Arjun Mehta",
    phone: "9988776655",
    project: "Palm Residency",

    totalAmount: 600000,
    paidAmount: 600000,

    payments: [
      {
        type: "booking",
        amount: 60000,
        mode: "UPI",
        date: "2026-02-01",
        status: "Approved",
        transactionId: "TXN001",
        attachment: "receipt1.pdf",
      },
      {
        type: "agreement",
        amount: 150000,
        mode: "UPI",
        date: "2026-02-20",
        status: "Approved",
        transactionId: "TXN001",
        attachment: "receipt1.pdf",
      },
      {
        type: "full",
        amount: 390000,
        mode: "Bank Transfer",
        date: "2026-03-05",
        status: "Approved",
        transactionId: "TXN001",
        attachment: "receipt1.pdf",
      },
    ],

    mode: "Bank Transfer",
    status: "Approved",
    dueStatus: "Paid",
    date: "2026-02-01",
  },
];

export default PaymentsData;
