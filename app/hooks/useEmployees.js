'use client'

import { useState, useEffect } from 'react'
import { getRandomDepartment, getRandomRating } from '../lib/utils'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://dummyjson.com/users?limit=20')
      
      if (!response.ok) {
        throw new Error('Failed to fetch employees')
      }
      
      const data = await response.json()
      
      // Enhance the data with additional fields
      const enhancedEmployees = data.users.map(user => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating(),
        bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 2} years in the industry. Passionate about delivering high-quality results and continuous learning.`,
        hireDate: new Date(Date.now() - Math.random() * 1000 * 24 * 60 * 60 * 365).toISOString().split('T')[0],
        salary: Math.floor(Math.random() * 50000) + 50000,
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'].slice(0, Math.floor(Math.random() * 4) + 2)
      }))
      
      setEmployees(enhancedEmployees)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === parseInt(id))
  }

  const updateEmployee = (id, updates) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === parseInt(id) ? { ...emp, ...updates } : emp
      )
    )
  }

  return {
    employees,
    loading,
    error,
    getEmployeeById,
    updateEmployee,
    refetch: fetchEmployees
  }
} 