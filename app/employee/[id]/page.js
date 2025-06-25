'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '../../components/Header'
import { useEmployees } from '../../hooks/useEmployees'
import { useBookmarkStore } from '../../store/bookmarkStore'
import { 
  generatePerformanceHistory, 
  generateProjects, 
  generateFeedback,
  getRatingColor,
  formatDate
} from '../../lib/utils'
import { 
  ArrowLeft, 
  Star, 
  Bookmark as BookmarkIcon, 
  BookmarkCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  TrendingUp,
  User,
  FileText,
  MessageSquare
} from 'lucide-react'

export default function EmployeeDetails() {
  const params = useParams()
  const router = useRouter()
  const { getEmployeeById } = useEmployees()
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()
  const [activeTab, setActiveTab] = useState('overview')

  const employee = getEmployeeById(params.id)

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Employee not found
            </h1>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const bookmarked = isBookmarked(employee.id)
  const ratingColor = getRatingColor(employee.rating)
  const performanceHistory = generatePerformanceHistory()
  const projects = generateProjects()
  const feedback = generateFeedback()

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'feedback', name: 'Feedback', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Employee Header */}
        <div className="card p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {employee.department} • Age {employee.age}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= employee.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`badge badge-${ratingColor}`}>
                    {employee.rating}/5 Rating
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBookmarkToggle}
                className={`p-3 rounded-lg transition-colors ${
                  bookmarked
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              >
                {bookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <BookmarkIcon className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={() => alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`)}
                className="btn-success flex items-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Promote</span>
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{employee.address?.city}, {employee.address?.state}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Hired: {formatDate(employee.hireDate)}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Bio
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {employee.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <span key={index} className="badge badge-info">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Performance History (Last 12 Months)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {performanceHistory.map((month, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {month.month}
                        </div>
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= month.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <span className={`badge ${
                        project.status === 'Completed' ? 'badge-success' :
                        project.status === 'In Progress' ? 'badge-warning' :
                        'badge-info'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Started: {formatDate(project.startDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${
                          item.type === 'Positive' ? 'badge-success' :
                          item.type === 'Constructive' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {item.type}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          by {item.reviewer}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 