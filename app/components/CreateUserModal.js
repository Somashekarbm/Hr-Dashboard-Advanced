'use client'

import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'

export default function CreateUserModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    department: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.age || !form.department) {
      setError('All fields are required.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email address.')
      return
    }
    setError('')
    onCreate(form)
    onClose()
    setForm({ firstName: '', lastName: '', email: '', age: '', department: '' })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex items-center space-x-2 mb-4">
          <UserPlus className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Employee</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field flex-1"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field flex-1"
            />
          </div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
            type="email"
          />
          <div className="flex space-x-2">
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Age"
              className="input-field flex-1"
              type="number"
              min="18"
            />
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Department"
              className="input-field flex-1"
            />
          </div>
          {error && <div className="text-danger-600 text-sm">{error}</div>}
          <button type="submit" className="btn-primary w-full mt-2">Create</button>
        </form>
      </div>
    </div>
  )
} 