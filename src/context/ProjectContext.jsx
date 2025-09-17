import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import apiService from '../services/apiService'

// Context
const ProjectContext = createContext()

// Action types
const PROJECT_ACTIONS = {
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Helper function to sort projects by creation date (newest first)
const sortProjectsByDate = (projects) => {
  return [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Initial state
const initialState = {
  projects: [],
  loading: false,
  error: null
}

// Reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
        error: null
      }
    case PROJECT_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: sortProjectsByDate([...state.projects, action.payload])
      }
    case PROJECT_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: sortProjectsByDate(
          state.projects.map(project =>
            project._id === action.payload._id ? action.payload : project
          )
        )
      }
    case PROJECT_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== action.payload)
      }
    case PROJECT_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case PROJECT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}

// Provider component
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load projects only when needed
  const loadProjects = async () => {
    if (state.projects.length > 0) return // Already loaded
    
    dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await apiService.getProjects()
      
      if (response.status === 'success') {
        // ✅ Backend'den gelen format: response.data.projects
        const projects = response.data.projects || []
        dispatch({ type: PROJECT_ACTIONS.SET_PROJECTS, payload: projects })
      } else {
        dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: response.message })
      }
    } catch (error) {
      console.error('Error loading projects:', error)
      dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to load projects' })
    }
  }

  // ✅ Normal user'lar için projeleri yükle
  useEffect(() => {
    // Admin sayfası değilse ve henüz yüklenmemişse yükle
    const isAdminPage = window.location.pathname.includes('/admin')
    
    if (!isInitialized && !isAdminPage) {
      loadProjects()
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Add project
  const addProject = async (projectData) => {
    try {
      const response = await apiService.createProject(projectData)
      
      // Backend'den gelen format: {status: 'success', message: '...', data: {...}}
      if (response.status === 'success') {
        dispatch({ type: PROJECT_ACTIONS.ADD_PROJECT, payload: response.data })
        return { success: true, data: response.data }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('Error adding project:', error)
      return { success: false, message: 'Failed to add project' }
    }
  }

  // Update project
  const updateProject = async (id, projectData) => {
    try {
      const response = await apiService.updateProject(id, projectData)
      
      // Backend'den gelen format: {status: 'success', message: '...', data: {...}}
      if (response.status === 'success') {
        dispatch({ type: PROJECT_ACTIONS.UPDATE_PROJECT, payload: response.data })
        return { success: true, data: response.data }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('Error updating project:', error)
      return { success: false, message: 'Failed to update project' }
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    try {
      const response = await apiService.deleteProject(id)
      
      // Backend'den gelen format: {status: 'success', message: '...', data: {...}}
      if (response.status === 'success') {
        dispatch({ type: PROJECT_ACTIONS.DELETE_PROJECT, payload: id })
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      return { success: false, message: 'Failed to delete project' }
    }
  }

  // Get featured projects
  const getFeaturedProjects = () => {
    return state.projects.filter(project => project.featured === true)
  }

  // Get projects by category
  const getProjectsByCategory = (category) => {
    return state.projects.filter(project => project.category === category)
  }

  const value = {
    ...state,
    loadProjects,
    addProject,
    updateProject,
    deleteProject,
    getFeaturedProjects,
    getProjectsByCategory
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

// Hook to use project context
export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}

// Alias for backward compatibility
export const useProjectContext = useProjects

export default ProjectContext

