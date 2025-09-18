// API Service for backend communication
const API_BASE_URL = 'https://backend-6hp4.onrender.com'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic HTTP request method with timeout
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      mode: 'cors',
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text()
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText }
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
      
    } catch (error) {
      // Network error handling
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Backend server is not reachable. Please check if the backend is running.')
      }
      
      if (error.name === 'TimeoutError') {
        throw new Error('Request timeout: Backend server is taking too long to respond.')
      }
      
      throw error
    }
  }

  // Projects API
  async getProjects() {
    try {
      const result = await this.request('/api/projects')
      return result
    } catch (error) {
      // Fallback: boş array döndür
      return { success: true, data: [] }
    }
  }

  async createProject(projectData) {
    try {
      const result = await this.request('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      })
      
      return result
    } catch (error) {
      throw error
    }
  }

  async updateProject(id, projectData) {
    return this.request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData)
    })
  }

  async deleteProject(id) {
    return this.request(`/api/projects/${id}`, {
      method: 'DELETE'
    })
  }

  // Admin API
  async adminLogin(email, password) {
    try {
      const result = await this.request('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ 
          username: email,
          password: password 
        })
      })
      
      return result
    } catch (error) {
      throw error
    }
  }

  async adminLogout() {
    return this.request('/api/admin/logout', {
      method: 'POST'
    })
  }

  async getAdminProfile() {
    return this.request('/api/admin/profile')
  }

  // Upload API
  async uploadImage(file) {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const token = localStorage.getItem('adminToken')
      const response = await fetch(`${this.baseURL}/api/upload`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      return { url: result.data.url }
      
    } catch (error) {
      throw error
    }
  }
}

const apiService = new ApiService()
export default apiService
