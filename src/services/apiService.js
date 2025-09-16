// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-one-beige-70.vercel.app/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic HTTP request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Projects API
  async getProjects() {
    return this.request('/projects')
  }

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    })
  }

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    })
  }

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE'
    })
  }

  // Admin API
  async adminLogin(credentials) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  async adminLogout() {
    return this.request('/admin/logout', {
      method: 'POST'
    })
  }

  async getAdminProfile() {
    return this.request('/admin/profile')
  }

  // Upload API
  async uploadImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${this.baseURL}/upload/image`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      return { url: result.data.url }
      
    } catch (error) {
      console.error('Upload error:', error)
      return { url: '/images/placeholder-project.jpg' }
    }
  }
}

const apiService = new ApiService()
export default apiService
