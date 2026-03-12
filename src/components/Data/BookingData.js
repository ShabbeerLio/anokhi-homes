const BookingData = [
  {
    id: 1,
    customerId: "user1",
    agentId: "agent1",
    plot: "A-12",

    totalAmount: 1200000,
    amountPaid: 120000,

    status: "Confirmed",

    paymentSchedule: {
      booking: {
        percent: 10,
        amount: 120000,
        paid: true,
        date: "2026-03-01",
      },

      agreement: {
        percent: 25,
        amount: 300000,
        dueDays: 30,
        paid: false,
        date: null,
      },

      full: {
        percent: 65,
        amount: 780000,
        dueDays: 90,
        paid: false,
        date: null,
      },
    },
  },

  {
    id: 2,
    customerId: "user2",
    agentId: "agent2",
    plot: "B-5",

    totalAmount: 850000,
    amountPaid: 0,

    status: "Pending",

    paymentSchedule: {
      booking: {
        percent: 10,
        amount: 85000,
        paid: false,
        date: null,
      },

      agreement: {
        percent: 25,
        amount: 212500,
        dueDays: 30,
        paid: false,
        date: null,
      },

      full: {
        percent: 65,
        amount: 552500,
        dueDays: 90,
        paid: false,
        date: null,
      },
    },
  },

  {
    id: 3,
    customerId: "user3",
    agentId: "agent3",
    plot: "C-8",

    totalAmount: 1000000,
    amountPaid: 40000,

    status: "Rejected",

    paymentSchedule: {
      booking: {
        percent: 10,
        amount: 100000,
        paid: false,
        date: null,
      },

      agreement: {
        percent: 25,
        amount: 250000,
        dueDays: 30,
        paid: false,
        date: null,
      },

      full: {
        percent: 65,
        amount: 650000,
        dueDays: 90,
        paid: false,
        date: null,
      },
    },
  },
  {
  id: 4,
  customerId: "user4",
  agentId: "agent4",
  plot: "D-10",

  totalAmount: 1500000,
  amountPaid: 525000,

  status: "Confirmed",

  paymentSchedule: {
    booking: {
      percent: 10,
      amount: 150000,
      paid: true,
      date: "2026-02-10",
    },

    agreement: {
      percent: 25,
      amount: 375000,
      dueDays: 30,
      paid: true,
      date: "2026-03-05",
    },

    full: {
      percent: 65,
      amount: 975000,
      dueDays: 90,
      paid: false,
      date: null,
    },
  },
}
];

export default BookingData;