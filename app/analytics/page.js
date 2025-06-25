'use client'

import Header from '../components/Header'
import { Bar, Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useEmployees } from '../hooks/useEmployees'
import { useBookmarkStore } from '../store/bookmarkStore'
import { departments } from '../lib/utils'
import { Loader2, BarChart3 } from 'lucide-react'

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
  const { employees, loading } = useEmployees()
  const { bookmarks } = useBookmarkStore()

  // Department-wise average ratings
  const departmentRatings = departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept)
    const avgRating = deptEmployees.length
      ? (deptEmployees.reduce((sum, e) => sum + e.rating, 0) / deptEmployees.length).toFixed(2)
      : 0
    return avgRating
  })

  // Mocked bookmark trends (last 6 months)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const bookmarkTrends = [2, 4, 6, 8, 7, bookmarks.length]

  const barData = {
    labels: departments,
    datasets: [
      {
        label: 'Avg Rating',
        data: departmentRatings,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 8,
      },
    ],
  }

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Bookmarks',
        data: bookmarkTrends,
        fill: false,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
            <BarChart3 className="w-7 h-7 text-primary-600" />
            <span>Analytics</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Visualize employee performance and bookmark trends.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading analytics...</span>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Department Ratings Bar Chart */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Department-wise Average Ratings
              </h2>
              <Bar data={barData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 5,
                    ticks: { stepSize: 1 },
                  },
                },
              }} />
            </div>

            {/* Bookmark Trends Line Chart */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Bookmark Trends (Last 6 Months)
              </h2>
              <Line data={lineData} options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  y: {
                    min: 0,
                    ticks: { stepSize: 2 },
                  },
                },
              }} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 