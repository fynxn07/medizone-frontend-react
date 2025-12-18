import React, { useEffect } from 'react'
import { useState } from 'react';
import { Import } from 'lucide-react';
import { getUsers, blockUser } from '../Services/AdminApi'

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const Block = async (user) => {
    try {

      const updatedUser = await blockUser(user.id, !user.isBlock);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="mb-4">
        <input type='text'
          placeholder='Search by name or email... '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full" />
      </div>

      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              (user.username || "").toLowerCase().includes(search.toLowerCase()) ||
              (user.email || "").toLowerCase().includes(search.toLowerCase())
            )

            .map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.is_staff ? "Admin" : "User"}</td>


                <td className="border p-2">
                  <button
                    onClick={() => Block(user)}
                    className={`px-2 py-1 rounded ${user.isBlock ? "bg-green-500" : "bg-red-500"
                      } text-white text-center`}
                  >
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                </td>


              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement