// Form validation constants
export const VALIDATION_RULES = {
  PROJECT: {
    TITLE: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100,
      REQUIRED: true
    },
    DESCRIPTION: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 500,
      REQUIRED: true
    },
    TECHNOLOGIES: {
      MIN_COUNT: 1,
      MAX_COUNT: 10,
      REQUIRED: true
    },
    URL: {
      PATTERN: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
      REQUIRED: false
    },
    YEAR: {
      MIN: 2020,
      MAX: new Date().getFullYear() + 1,
      REQUIRED: true
    }
  },
  ADMIN: {
    EMAIL: {
      PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      REQUIRED: true
    },
    PASSWORD: {
      MIN_LENGTH: 6,
      MAX_LENGTH: 50,
      REQUIRED: true
    }
  }
}

// Error messages
export const ERROR_MESSAGES = {
  PROJECT: {
    TITLE_REQUIRED: 'Project title is required',
    TITLE_MIN_LENGTH: `Project title must be at least ${VALIDATION_RULES.PROJECT.TITLE.MIN_LENGTH} characters`,
    TITLE_MAX_LENGTH: `Project title must be no more than ${VALIDATION_RULES.PROJECT.TITLE.MAX_LENGTH} characters`,
    DESCRIPTION_REQUIRED: 'Project description is required',
    DESCRIPTION_MIN_LENGTH: `Description must be at least ${VALIDATION_RULES.PROJECT.DESCRIPTION.MIN_LENGTH} characters`,
    DESCRIPTION_MAX_LENGTH: `Description must be no more than ${VALIDATION_RULES.PROJECT.DESCRIPTION.MAX_LENGTH} characters`,
    TECHNOLOGIES_REQUIRED: 'At least one technology must be selected',
    TECHNOLOGIES_MIN_COUNT: `At least ${VALIDATION_RULES.PROJECT.TECHNOLOGIES.MIN_COUNT} technology must be selected`,
    TECHNOLOGIES_MAX_COUNT: `Maximum ${VALIDATION_RULES.PROJECT.TECHNOLOGIES.MAX_COUNT} technologies can be selected`,
    URL_INVALID: 'Please enter a valid URL (must start with http:// or https://)',
    YEAR_INVALID: `Year must be between ${VALIDATION_RULES.PROJECT.YEAR.MIN}-${VALIDATION_RULES.PROJECT.YEAR.MAX}`,
    IMAGE_REQUIRED: 'Project image is required'
  },
  ADMIN: {
    EMAIL_REQUIRED: 'Email address is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: `Password must be at least ${VALIDATION_RULES.ADMIN.PASSWORD.MIN_LENGTH} characters`,
    PASSWORD_MAX_LENGTH: `Password must be no more than ${VALIDATION_RULES.ADMIN.PASSWORD.MAX_LENGTH} characters`
  }
}

// Success messages
export const SUCCESS_MESSAGES = {
  PROJECT: {
    CREATED: 'Project created successfully',
    UPDATED: 'Project updated successfully',
    DELETED: 'Project deleted successfully'
  },
  ADMIN: {
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful'
  }
}

// Project categories
export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Blockchain',
  'Desktop Application',
  'Game Development',
  'Data Science',
  'DevOps'
]

// Project statuses
export const PROJECT_STATUSES = [
  { value: 'Completed', label: 'Completed' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Planning', label: 'Planning' },
  { value: 'On Hold', label: 'On Hold' }
]

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
}
