import { useState } from 'react'
import { DataTable } from '../components/DataTable'
import type { Column } from '../components/DataTable'
import { users } from '../data/sampleData'
import type { User } from '../data/sampleData'

const statusClass: Record<User['status'], string> = {
  Active: 'badge badge--success',
  Inactive: 'badge badge--danger',
  Pending: 'badge badge--warning',
}

const columns: Column<User>[] = [
  { key: 'id', header: 'ID', sortable: true, align: 'right' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    align: 'center',
    render: (_, row) => <span className={statusClass[row.status]}>{row.status}</span>,
  },
  { key: 'joined', header: 'Joined', sortable: true },
]

function UsersPage() {
  const [selected, setSelected] = useState<User | null>(null)

  return (
    <section className="page">
      <div className="page__header">
        <h1>Users</h1>
        <p className="page__subtitle">Manage team members. Click a row to view details.</p>
      </div>
      <DataTable
        title="User List"
        data={users}
        columns={columns}
        rowKey="id"
        pageSize={5}
        onRowClick={setSelected}
      />
      {selected && (
        <div className="page__selected">
          Selected: <strong>{selected.name}</strong> ({selected.email}) — {selected.role}
        </div>
      )}
    </section>
  )
}

export default UsersPage
