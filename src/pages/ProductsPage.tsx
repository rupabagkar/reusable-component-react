import { DataTable } from '../components/DataTable'
import type { Column } from '../components/DataTable'
import { products } from '../data/sampleData'
import type { Product } from '../data/sampleData'

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

const columns: Column<Product>[] = [
  { key: 'id', header: 'SKU', sortable: true },
  { key: 'name', header: 'Product', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  {
    key: 'price',
    header: 'Price',
    sortable: true,
    align: 'right',
    render: (_, row) => currency.format(row.price),
  },
  {
    key: 'stock',
    header: 'Stock',
    sortable: true,
    align: 'center',
    render: (_, row) =>
      row.stock === 0 ? (
        <span className="badge badge--danger">Out of stock</span>
      ) : row.stock < 15 ? (
        <span className="badge badge--warning">Low ({row.stock})</span>
      ) : (
        <span className="badge badge--success">{row.stock}</span>
      ),
  },
  {
    key: 'rating',
    header: 'Rating',
    sortable: true,
    align: 'right',
    render: (_, row) => `★ ${row.rating.toFixed(1)}`,
  },
]

function ProductsPage() {
  return (
    <section className="page">
      <div className="page__header">
        <h1>Products</h1>
        <p className="page__subtitle">Browse the product catalog with search, sort and pagination.</p>
      </div>
      <DataTable title="Product Catalog" data={products} columns={columns} rowKey="id" pageSize={6} />
    </section>
  )
}

export default ProductsPage
