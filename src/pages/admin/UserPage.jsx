import { useEffect, useState } from "react"
import api from "../../api"

export default function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="space-y-3">
        {users.map(u => (
          <div key={u.id} className="bg-zinc-900 p-4 rounded">
            <p>{u.email}</p>
            <p className="text-sm text-zinc-400">{u.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}