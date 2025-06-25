'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import EmployeeCard from './components/EmployeeCard'
import SearchAndFilter from './components/SearchAndFilter'
import { useEmployees } from './hooks/useEmployees'
import { filterEmployees } from './lib/utils'
import { Loader2, Users, AlertCircle, ArrowUp } from 'lucide-react'
import CreateUserModal from './components/CreateUserModal'
import { useAuthStore } from './store/authStore'

export default function Dashboard() {
  const { employees, loading, error } = useEmployees()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    department: '',
    rating: ''
  })
  const [showCreate, setShowCreate] = useState(false)
  const [localEmployees, setLocalEmployees] = useState([])
  const { isAuthenticated, login } = useAuthStore()
  const [showTop, setShowTop] = useState(false)

  const filteredEmployees = filterEmployees([...employees, ...localEmployees], searchTerm, filters)

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const handleFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleCreateUser = (user) => {
    setLocalEmployees(prev => [
      {
        ...user,
        id: Date.now(),
        rating: 3,
        bio: 'Newly created employee.',
        age: parseInt(user.age),
        department: user.department,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: { city: 'N/A', state: 'N/A' },
        phone: 'N/A',
        skills: [],
      },
      ...prev
    ])
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="card p-8 max-w-sm w-full flex flex-col items-center animate-fade-in">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">HR Dashboard Login</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400 text-center">Sign in to access the dashboard.</p>
          <button onClick={login} className="btn-primary w-full">Login</button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading employees...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Error Loading Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <CreateUserModal open={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreateUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Employee Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage and track employee performance across your organization
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <button
                onClick={() => setShowCreate(true)}
                className="btn-primary flex items-center space-x-1"
              >
                <span>+ Create User</span>
              </button>
              <Users className="w-4 h-4" />
              <span>{filteredEmployees.length} of {employees.length + localEmployees.length} employees</span>
            </div>
          </div>

          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            searchTerm={searchTerm}
            filters={filters}
          />
        </div>

        {/* Employee Grid */}
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        )}
      </main>
      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
} 