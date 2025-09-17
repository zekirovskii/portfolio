// API Service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://backend-one-beige-70.vercel.app/api'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    console.log(' API Base URL:', this.baseURL)
  }

  // Generic HTTP request method with timeout
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    console.log('📡 Making request to:', url)
    console.log('📡 Request options:', options)
    
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options,
      // Timeout'u 30 saniyeye çıkarın
       // 30 saniye timeout
    }

    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      console.log('⏳ Sending request...')
      const response = await fetch(url, config)
      
      console.log('📥 Response status:', response.status)
      console.log('📥 Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Response error text:', errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { message: errorText }
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Response data:', data)
      return data
      
    } catch (error) {
      console.error('❌ Request failed:', error)
      console.error('❌ Error name:', error.name)
      console.error('❌ Error message:', error.message)
      
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
      console.log('📋 Fetching projects...')
      const result = await this.request('/projects')
      console.log(' Projects result:', result)
      return result
    } catch (error) {
      console.error('❌ Failed to fetch projects:', error)
      // Fallback: boş array döndür
      return { success: true, data: [] }
    }
  }

  async createProject(projectData) {
    try {
      console.log('➕ Creating project...')
      console.log('➕ Project data:', JSON.stringify(projectData, null, 2))
      
      const result = await this.request('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      })
      
      console.log('➕ Project created:', result)
      return result
    } catch (error) {
      console.error('❌ Failed to create project:', error)
      throw error
    }
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
  async adminLogin(email, password) {
  try {
    console.log('�� Attempting login with:', { email, password })
    
    const result = await this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ 
        username: email, // email yerine username gönder
        password: password 
      })
    })
    
    console.log('🔐 Login result:', result)
    return result
  } catch (error) {
    console.error('❌ Login failed:', error)
    throw error
  }
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
