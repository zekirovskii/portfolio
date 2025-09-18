import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiUpload, FiSave, FiImage, FiAlertCircle } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { validateProjectForm, validateFileSize, validateFileType } from '../../utils/validators'
import { FILE_UPLOAD, PROJECT_CATEGORIES, PROJECT_STATUSES } from '../../utils/constants'
import apiService from '../../services/apiService'

const ProjectForm = ({ project, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'Web Development',
    status: 'Completed',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    year: new Date().getFullYear().toString(),
    image: null,
    imagePreview: null
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        category: project.category || 'Web Development',
        status: project.status || 'Completed',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        year: project.year || new Date().getFullYear().toString(),
        image: null,
        imagePreview: project.image || null
      })
    } else {
      setFormData({
        title: '',
        description: '',
        technologies: '',
        category: 'Web Development',
        status: 'Completed',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        year: new Date().getFullYear().toString(),
        image: null,
        imagePreview: null
      })
    }
    setErrors({})
  }, [project])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Önce resmi backend'e yükle
      try {
        setIsUploading(true)
        const uploadResult = await apiService.uploadImage(file)
        
        // Yüklenen resmin URL'ini kullan
        setFormData(prev => ({
          ...prev,
          image: uploadResult.url, // Backend'den gelen URL
          imagePreview: uploadResult.url
        }))
        
      } catch (error) {
        console.error('Resim yükleme hatası:', error)
        // Hata durumunda kullanıcıya bilgi ver
        setErrors(prev => ({
          ...prev,
          image: 'Resim yüklenemedi. Lütfen tekrar deneyin veya farklı bir resim seçin.'
        }))
        // Resmi temizle
        setFormData(prev => ({
          ...prev,
          image: null,
          imagePreview: null
        }))
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form - düzenleme modunda resim zorunlu değil
    const validation = validateProjectForm(formData, !!project)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        category: formData.category,
        status: formData.status, // Backend'de mapping yapılacak
        liveUrl: formData.liveUrl || '',
        githubUrl: formData.githubUrl || '',
        featured: formData.featured,
        year: formData.year,
        // Backend'e gönderilecek resim URL'i
        image: formData.imagePreview || formData.image || project?.image || '/images/placeholder-project.jpg'
      }
      
      // ID'leri temizle (backend'de yeni ID oluşturulacak veya mevcut ID kullanılacak)
      delete projectData.id
      delete projectData._id
      delete projectData.createdAt
      delete projectData.updatedAt
      delete projectData.__v
      
      await onSave(projectData)
      
      // Form'u temizle
      setFormData({
        title: '',
        description: '',
        technologies: '',
        category: 'Web Development',
        status: 'Completed',
        liveUrl: '',
        githubUrl: '',
        featured: false,
        year: new Date().getFullYear().toString(),
        image: null,
        imagePreview: null
      })
      setErrors({})
      
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <MagicCard className="p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiX className="text-white text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Image {!project && '*'}
              </label>
              <div className="space-y-4">
                {/* Image Preview */}
                {formData.imagePreview && (
                  <div className="relative">
                    <img
                      src={formData.imagePreview}
                      alt="Project preview"
                      className="w-full h-48 object-cover rounded-xl border border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    >
                      <FiX className="text-white text-sm" />
                    </button>
                  </div>
                )}
                
                {/* Image Upload */}
                <div className="relative">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition-colors ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="text-center">
                      <FiImage className="mx-auto text-4xl text-gray-400 mb-2" />
                      <p className="text-gray-400">
                        {isUploading ? 'Uploading...' : formData.imagePreview ? 'Change image' : 'Upload image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF (Max 5MB)
                        {project && <span className="block text-yellow-400">Optional for editing</span>}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Error */}
                {errors.image && (
                  <div className="flex items-center text-red-400 text-sm">
                    <FiAlertCircle className="mr-2" />
                    {errors.image}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="Enter project title"
                />
                {errors.title && (
                  <div className="flex items-center text-red-400 text-sm mt-1">
                    <FiAlertCircle className="mr-2" />
                    {errors.title}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category || 'Web Development'}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PROJECT_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                required
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-colors ${
                  errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                placeholder="Enter project description"
              />
              {errors.description && (
                <div className="flex items-center text-red-400 text-sm mt-1">
                  <FiAlertCircle className="mr-2" />
                  {errors.description}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Technologies (separate with commas) *
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies || ''}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                  errors.technologies ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                placeholder="React, Node.js, MongoDB"
              />
              {errors.technologies && (
                <div className="flex items-center text-red-400 text-sm mt-1">
                  <FiAlertCircle className="mr-2" />
                  {errors.technologies}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status || 'Completed'}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year *
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.year ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="2024"
                />
                {errors.year && (
                  <div className="flex items-center text-red-400 text-sm mt-1">
                    <FiAlertCircle className="mr-2" />
                    {errors.year}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.liveUrl ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="https://my-project.vercel.app"
                />
                {errors.liveUrl && (
                  <div className="flex items-center text-red-400 text-sm mt-1">
                    <FiAlertCircle className="mr-2" />
                    {errors.liveUrl}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
                    errors.githubUrl ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                  }`}
                  placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && (
                  <div className="flex items-center text-red-400 text-sm mt-1">
                    <FiAlertCircle className="mr-2" />
                    {errors.githubUrl}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured || false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
              />
              <label className="text-gray-300">Mark as featured project</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiSave className="mr-2" />
                    Save
                  </div>
                )}
              </motion.button>
            </div>
          </form>
        </MagicCard>
      </motion.div>
    </div>
  )
}

export default ProjectForm