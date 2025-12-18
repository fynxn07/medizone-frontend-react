import React from 'react'
import SideBar from './SideBar'

function AdminLayout({children}) {
  return (
    <div className='flex'>
        <SideBar />
        <main className=" flex-1 p-6 bg-gray-100 min-h-screen ml-64">
        {children}
      </main>
    </div> 
  )
}

export default AdminLayout