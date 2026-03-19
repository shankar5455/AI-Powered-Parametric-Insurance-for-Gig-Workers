export const mockUser = {
  id: 1,
  name: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  city: 'Bangalore',
  deliveryType: 'Swiggy',
  joinedDate: '2024-01-15',
};

export const mockInsurancePlan = {
  planName: 'Standard Plan',
  premium: '₹25/week',
  status: 'Active',
  coverageType: 'Heat + Pollution',
  startDate: '2025-03-01',
  endDate: '2025-03-31',
};

export const mockDashboardStats = {
  earningsProtected: '₹4,500',
  riskLevel: 'Medium',
  totalClaims: 3,
  activeSince: 'March 2025',
};

export const mockPlans = [
  {
    id: 1,
    name: 'Basic Plan',
    price: '₹15/week',
    priceValue: 15,
    coverage: ['Heat Disruption'],
    description: 'Coverage for extreme heat conditions affecting delivery.',
    color: 'blue',
    popular: false,
  },
  {
    id: 2,
    name: 'Standard Plan',
    price: '₹25/week',
    priceValue: 25,
    coverage: ['Heat Disruption', 'Pollution Alert'],
    description: 'Comprehensive coverage for heat and air pollution events.',
    color: 'indigo',
    popular: true,
  },
  {
    id: 3,
    name: 'Premium Plan',
    price: '₹50/week',
    priceValue: 50,
    coverage: ['Rain Disruption', 'Heat Disruption', 'Pollution Alert', 'Flood Alert', 'Storm Warning'],
    description: 'Full protection against all weather and environmental disruptions.',
    color: 'green',
    popular: false,
  },
];

export const mockClaims = [
  {
    id: 1,
    date: '2025-03-15',
    type: 'Rain',
    amount: '₹300',
    status: 'Approved',
  },
  {
    id: 2,
    date: '2025-03-10',
    type: 'Heat',
    amount: '₹200',
    status: 'Approved',
  },
  {
    id: 3,
    date: '2025-03-05',
    type: 'Pollution',
    amount: '₹150',
    status: 'Pending',
  },
  {
    id: 4,
    date: '2025-02-28',
    type: 'Rain',
    amount: '₹300',
    status: 'Approved',
  },
];

export const mockAdminStats = {
  totalUsers: 1284,
  totalClaims: 342,
  totalPayout: '₹1,24,500',
  activePlans: 987,
  monthlyGrowth: '+12%',
  claimsThisMonth: 48,
};

export const mockAdminUsers = [
  { id: 1, name: 'Ravi Kumar', city: 'Bangalore', plan: 'Standard', status: 'Active' },
  { id: 2, name: 'Priya Singh', city: 'Mumbai', plan: 'Premium', status: 'Active' },
  { id: 3, name: 'Amit Sharma', city: 'Delhi', plan: 'Basic', status: 'Active' },
  { id: 4, name: 'Sunita Rao', city: 'Chennai', plan: 'Standard', status: 'Inactive' },
  { id: 5, name: 'Kiran Patel', city: 'Pune', plan: 'Premium', status: 'Active' },
];

export const mockMonthlyData = [
  { month: 'Oct', claims: 28, users: 950 },
  { month: 'Nov', claims: 35, users: 1020 },
  { month: 'Dec', claims: 42, users: 1080 },
  { month: 'Jan', claims: 30, users: 1120 },
  { month: 'Feb', claims: 38, users: 1200 },
  { month: 'Mar', claims: 48, users: 1284 },
];
