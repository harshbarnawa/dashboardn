import React from 'react'
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8'>
        <div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8'>
            <div className='flex flex-col'>
            <h1 className='text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0'>Dashboard</h1>
            <p className="text-lg text-gray-600 mt-3">
                Welcome back! Here you can manage your tasks, view analytics, and make adjustments.
            </p>
            </div>
            <div>
                <Link href='/tasks'>
                <div>
                    <h2>Tasks</h2>
                    <span>📋</span>
                </div>
                <p>
                    View, organize, and manage your daily tasks.
                </p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Dashboard