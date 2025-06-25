'use client'

import Link from 'next/link'
import { useBookmarkStore } from '../store/bookmarkStore'
import { getRatingColor } from '../lib/utils'
import { 
  Star, 
  Bookmark as BookmarkIcon, 
  BookmarkCheck, 
  Eye, 
  TrendingUp,
  Mail,
  Building
} from 'lucide-react'

export default function EmployeeCard({ employee }) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()
  const bookmarked = isBookmarked(employee.id)
  const ratingColor = getRatingColor(employee.rating)

  const handleBookmarkToggle = (e) => {
    e.preventDefault()
    if (bookmarked) {
      removeBookmark(employee.id)
    } else {
      addBookmark(employee)
    }
  }

  const handlePromote = (e) => {
    e.preventDefault()
    // This would typically trigger an API call
    alert(`Promotion request sent for ${employee.firstName} ${employee.lastName}`)
  }

  return (
    <div className="card p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {employee.firstName[0]}{employee.lastName[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center max-w-[140px] truncate" title={employee.email}>
              <Mail className="w-3 h-3 mr-1" />
              <span className="truncate">{employee.email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Department & Age */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Building className="w-4 h-4 mr-1" />
          {employee.department}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Age: {employee.age}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Performance Rating
          </span>
          <span className={`badge badge-${ratingColor}`}>
            {employee.rating}/5
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= employee.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Link
            href={`/employee/${employee.id}`}
            className="btn-primary flex-1 flex items-center justify-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Link>
          <button
            onClick={handlePromote}
            className="btn-success flex items-center justify-center space-x-1 px-3"
            title="Promote Employee"
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleBookmarkToggle}
            className="btn-secondary flex items-center justify-center space-x-1 px-3"
            title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-primary-600" />
            ) : (
              <BookmarkIcon className="w-5 h-5 text-gray-400 hover:text-primary-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 