import { VALIDATION_RULES, ERROR_MESSAGES } from './constants'

// Generic validation functions
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`
  }
  return null
}

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }
  return null
}

export const validateMaxLength = (value, maxLength, fieldName) => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be no more than ${maxLength} characters`
  }
  return null
}

export const validatePattern = (value, pattern, fieldName, errorMessage) => {
  if (value && !pattern.test(value)) {
    return errorMessage
  }
  return null
}

export const validateRange = (value, min, max, fieldName) => {
  const numValue = parseInt(value)
  if (value && (isNaN(numValue) || numValue < min || numValue > max)) {
    return `${fieldName} must be between ${min}-${max}`
  }
  return null
}

// Project validation functions
export const validateProjectTitle = (title) => {
  const requiredError = validateRequired(title, 'Project title')
  if (requiredError) return requiredError

  const minLengthError = validateMinLength(
    title, 
    VALIDATION_RULES.PROJECT.TITLE.MIN_LENGTH, 
    'Project title'
  )
  if (minLengthError) return minLengthError

  const maxLengthError = validateMaxLength(
    title, 
    VALIDATION_RULES.PROJECT.TITLE.MAX_LENGTH, 
    'Project title'
  )
  if (maxLengthError) return maxLengthError

  return null
}

export const validateProjectDescription = (description) => {
  const requiredError = validateRequired(description, 'Project description')
  if (requiredError) return requiredError

  const minLengthError = validateMinLength(
    description, 
    VALIDATION_RULES.PROJECT.DESCRIPTION.MIN_LENGTH, 
    'Project description'
  )
  if (minLengthError) return minLengthError

  const maxLengthError = validateMaxLength(
    description, 
    VALIDATION_RULES.PROJECT.DESCRIPTION.MAX_LENGTH, 
    'Project description'
  )
  if (maxLengthError) return maxLengthError

  return null
}

export const validateProjectTechnologies = (technologies) => {
  if (!technologies || technologies.length === 0) {
    return ERROR_MESSAGES.PROJECT.TECHNOLOGIES_REQUIRED
  }

  const techArray = Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()).filter(t => t)
  
  if (techArray.length < VALIDATION_RULES.PROJECT.TECHNOLOGIES.MIN_COUNT) {
    return ERROR_MESSAGES.PROJECT.TECHNOLOGIES_MIN_COUNT
  }

  if (techArray.length > VALIDATION_RULES.PROJECT.TECHNOLOGIES.MAX_COUNT) {
    return ERROR_MESSAGES.PROJECT.TECHNOLOGIES_MAX_COUNT
  }

  return null
}

export const validateProjectUrl = (url, fieldName = 'URL') => {
  if (!url || url.trim() === '') return null // URL is optional

  // More flexible URL validation that accepts various domains
  const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/
  
  if (!urlPattern.test(url)) {
    return ERROR_MESSAGES.PROJECT.URL_INVALID
  }

  return null
}

export const validateProjectYear = (year) => {
  const requiredError = validateRequired(year, 'Year')
  if (requiredError) return requiredError

  const rangeError = validateRange(
    year, 
    VALIDATION_RULES.PROJECT.YEAR.MIN, 
    VALIDATION_RULES.PROJECT.YEAR.MAX, 
    'Year'
  )
  return rangeError
}

export const validateProjectImage = (image, isEditing = false) => {
  // Eğer düzenleme modundaysa ve resim yoksa, hata verme
  if (isEditing && !image) {
    return null
  }
  
  // Yeni proje eklerken resim zorunlu
  if (!isEditing && !image) {
    return ERROR_MESSAGES.PROJECT.IMAGE_REQUIRED
  }
  
  return null
}

// Admin validation functions
export const validateAdminEmail = (email) => {
  const requiredError = validateRequired(email, 'Email address')
  if (requiredError) return requiredError

  const patternError = validatePattern(
    email, 
    VALIDATION_RULES.ADMIN.EMAIL.PATTERN, 
    'Email address', 
    ERROR_MESSAGES.ADMIN.EMAIL_INVALID
  )
  return patternError
}

export const validateAdminPassword = (password) => {
  const requiredError = validateRequired(password, 'Password')
  if (requiredError) return requiredError

  const minLengthError = validateMinLength(
    password, 
    VALIDATION_RULES.ADMIN.PASSWORD.MIN_LENGTH, 
    'Password'
  )
  if (minLengthError) return minLengthError

  const maxLengthError = validateMaxLength(
    password, 
    VALIDATION_RULES.ADMIN.PASSWORD.MAX_LENGTH, 
    'Password'
  )
  if (maxLengthError) return maxLengthError

  return null
}

// File validation functions
export const validateFileSize = (file, maxSize) => {
  if (file && file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
  }
  return null
}

export const validateFileType = (file, allowedTypes) => {
  if (file && !allowedTypes.includes(file.type)) {
    return `File type not supported. Allowed types: ${allowedTypes.join(', ')}`
  }
  return null
}

// Complete project validation
export const validateProjectForm = (formData, isEditing = false) => {
  const errors = {}

  // Validate title
  const titleError = validateProjectTitle(formData.title)
  if (titleError) errors.title = titleError

  // Validate description
  const descriptionError = validateProjectDescription(formData.description)
  if (descriptionError) errors.description = descriptionError

  // Validate technologies
  const technologiesError = validateProjectTechnologies(formData.technologies)
  if (technologiesError) errors.technologies = technologiesError

  // Validate URLs (optional)
  if (formData.liveUrl) {
    const liveUrlError = validateProjectUrl(formData.liveUrl, 'Live URL')
    if (liveUrlError) errors.liveUrl = liveUrlError
  }

  if (formData.githubUrl) {
    const githubUrlError = validateProjectUrl(formData.githubUrl, 'GitHub URL')
    if (githubUrlError) errors.githubUrl = githubUrlError
  }

  // Validate year
  const yearError = validateProjectYear(formData.year)
  if (yearError) errors.year = yearError

  // Validate image - düzenleme modunda resim zorunlu değil
  const imageError = validateProjectImage(formData.image, isEditing)
  if (imageError) errors.image = imageError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Complete admin validation
export const validateAdminForm = (formData) => {
  const errors = {}

  // Validate email
  const emailError = validateAdminEmail(formData.email)
  if (emailError) errors.email = emailError

  // Validate password
  const passwordError = validateAdminPassword(formData.password)
  if (passwordError) errors.password = passwordError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
