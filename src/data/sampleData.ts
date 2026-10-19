export type User = {
  id: number
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  joined: string
}

export type Product = {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
}

export const users: User[] = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Editor', status: 'Active', joined: '2024-02-20' },
  { id: 3, name: 'Rohan Gupta', email: 'rohan@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-03-05' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', role: 'Editor', status: 'Pending', joined: '2024-04-11' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Viewer', status: 'Active', joined: '2024-05-22' },
  { id: 6, name: 'Ananya Iyer', email: 'ananya@example.com', role: 'Admin', status: 'Active', joined: '2024-06-30' },
  { id: 7, name: 'Karan Mehta', email: 'karan@example.com', role: 'Viewer', status: 'Inactive', joined: '2024-07-14' },
  { id: 8, name: 'Divya Nair', email: 'divya@example.com', role: 'Editor', status: 'Active', joined: '2024-08-09' },
  { id: 9, name: 'Arjun Verma', email: 'arjun@example.com', role: 'Viewer', status: 'Pending', joined: '2024-09-18' },
  { id: 10, name: 'Meera Joshi', email: 'meera@example.com', role: 'Editor', status: 'Active', joined: '2024-10-02' },
  { id: 11, name: 'Rahul Das', email: 'rahul@example.com', role: 'Viewer', status: 'Active', joined: '2024-11-25' },
  { id: 12, name: 'Isha Kapoor', email: 'isha@example.com', role: 'Admin', status: 'Inactive', joined: '2024-12-12' },
]

export const products: Product[] = [
  { id: 101, name: 'Wireless Mouse', category: 'Electronics', price: 799, stock: 120, rating: 4.3 },
  { id: 102, name: 'Mechanical Keyboard', category: 'Electronics', price: 3499, stock: 45, rating: 4.7 },
  { id: 103, name: 'Office Chair', category: 'Furniture', price: 8999, stock: 12, rating: 4.1 },
  { id: 104, name: 'Standing Desk', category: 'Furniture', price: 18999, stock: 0, rating: 4.6 },
  { id: 105, name: 'Water Bottle', category: 'Accessories', price: 499, stock: 300, rating: 4.0 },
  { id: 106, name: 'Laptop Stand', category: 'Accessories', price: 1299, stock: 75, rating: 4.4 },
  { id: 107, name: 'USB-C Hub', category: 'Electronics', price: 2199, stock: 8, rating: 3.9 },
  { id: 108, name: 'Desk Lamp', category: 'Furniture', price: 1599, stock: 34, rating: 4.2 },
  { id: 109, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 12999, stock: 22, rating: 4.8 },
  { id: 110, name: 'Notebook Pack', category: 'Stationery', price: 349, stock: 500, rating: 4.5 },
]
