// API Service for backend communication
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-backend-nine-ruddy.vercel.app/api' 
  : 'http://localhost:5050/api'
const UPLOAD_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-backend-nine-ruddy.vercel.app/api/upload' 
  : 'http://localhost:5050/api/upload'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.uploadURL = UPLOAD_URL
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
      
      // 431 hatası için özel kontrol
      if (response.status === 431) {
        throw new Error('Request headers too large. Please try with smaller data.')
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      
      // Bağlantı hataları için özel mesaj
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen sunucunun çalıştığından emin olun.')
      }
      
      throw error
    }
  }

  // Projects API
  async getProjects() {
    return this.request('/projects')
  }

  async getProject(id) {
    return this.request(`/projects/${id}`)
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

  // Vercel Blob Upload API
  async uploadImage(file) {
    try {
      // 1. Vercel Blob'a upload URL al
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('adminToken') && { 
            Authorization: `Bearer ${localStorage.getItem('adminToken')}` 
          })
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type
        })
      })

      if (!response.ok) {
        throw new Error('Upload URL alınamadı')
      }

      const { url } = await response.json()
      
      // 2. Dosyayı Vercel Blob'a yükle
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })

      if (!uploadResponse.ok) {
        throw new Error('Dosya yüklenemedi')
      }

      // 3. Blob URL'ini döndür (query parametrelerini kaldır)
      const blobUrl = url.split('?')[0]
      return { url: blobUrl }
      
    } catch (error) {
      console.error('Vercel Blob upload error:', error)
      // Hata durumunda placeholder resim döndür
      return { url: '/images/placeholder-project.jpg' }
    }
  }

  async deleteImage(filename) {
    return this.request(`/upload/${filename}`, {
      method: 'DELETE'
    })
  }
}

// Create singleton instance
const apiService = new ApiService()
export default apiService
