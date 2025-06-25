'use client'

import Header from '../components/Header'
import EmployeeCard from '../components/EmployeeCard'
import { useBookmarkStore } from '../store/bookmarkStore'
import { Users, Trash2, TrendingUp, Briefcase } from 'lucide-react'

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore()

  const handlePromote = (employee) => {
    alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`)
  }

  const handleAssign = (employee) => {
    alert(`Assign to Project action for ${employee.firstName} ${employee.lastName}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bookmarked Employees
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your favorite employees for quick access and actions.
          </p>
        </div>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No bookmarks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bookmark employees from the dashboard to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarks.map((employee) => (
              <div key={employee.id} className="relative group">
                <EmployeeCard employee={employee} />
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeBookmark(employee.id)}
                    className="btn-secondary flex items-center space-x-1"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                  <button
                    onClick={() => handlePromote(employee)}
                    className="btn-success flex items-center space-x-1"
                    title="Promote"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Promote</span>
                  </button>
                  <button
                    onClick={() => handleAssign(employee)}
                    className="btn-primary flex items-center space-x-1"
                    title="Assign to Project"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Assign</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 