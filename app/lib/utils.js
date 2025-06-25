// Generate random department
export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Design',
  'Product',
  'Operations',
  'Legal',
  'Support'
]

export const getRandomDepartment = () => {
  return departments[Math.floor(Math.random() * departments.length)]
}

// Generate random performance rating (1-5)
export const getRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1
}

// Generate performance history
export const generatePerformanceHistory = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const history = []
  
  for (let i = 0; i < 12; i++) {
    history.push({
      month: months[i],
      rating: getRandomRating(),
      feedback: `Good performance in ${months[i]}. Keep up the great work!`
    })
  }
  
  return history
}

// Generate mock projects
export const generateProjects = () => {
  const projectTypes = ['Web App', 'Mobile App', 'API Development', 'UI/UX Design', 'Data Analysis', 'Marketing Campaign']
  const projects = []
  
  for (let i = 0; i < Math.floor(Math.random() * 4) + 2; i++) {
    projects.push({
      id: i + 1,
      name: `${projectTypes[Math.floor(Math.random() * projectTypes.length)]} Project`,
      status: ['Completed', 'In Progress', 'Planning'][Math.floor(Math.random() * 3)],
      progress: Math.floor(Math.random() * 100),
      startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
  }
  
  return projects
}

// Generate mock feedback
export const generateFeedback = () => {
  const feedbackTypes = ['Positive', 'Constructive', 'Neutral']
  const feedback = []
  
  for (let i = 0; i < Math.floor(Math.random() * 5) + 3; i++) {
    feedback.push({
      id: i + 1,
      type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
      message: `Sample feedback message ${i + 1}. This is a detailed feedback about the employee's performance.`,
      date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reviewer: `Manager ${Math.floor(Math.random() * 5) + 1}`
    })
  }
  
  return feedback
}

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Get rating color
export const getRatingColor = (rating) => {
  if (rating >= 4) return 'success'
  if (rating >= 3) return 'warning'
  return 'danger'
}

// Search filter function
export const filterEmployees = (employees, searchTerm, filters) => {
  return employees.filter(employee => {
    const matchesSearch = !searchTerm || 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = !filters.department || filters.department === employee.department
    const matchesRating = !filters.rating || employee.rating === filters.rating
    
    return matchesSearch && matchesDepartment && matchesRating
  })
} 