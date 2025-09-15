import React, { createContext, useContext, useReducer, useEffect } from 'react'
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
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.updatedAt || 0)
    const dateB = new Date(b.createdAt || b.updatedAt || 0)
    return dateB - dateA // Yeni tarihler önce gelsin
  })
}

// Reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: sortProjectsByDate(action.payload),
        loading: false,
        error: null
      }
    case PROJECT_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: sortProjectsByDate([...state.projects, action.payload]),
        loading: false,
        error: null
      }
    case PROJECT_ACTIONS.UPDATE_PROJECT:
      const updatedProjects = state.projects.map(project => {
        // ID'leri karşılaştır (_id veya id)
        const projectId = project._id || project.id
        const updatedProjectId = action.payload._id || action.payload.id
        
        if (projectId === updatedProjectId) {
          return action.payload
        }
        return project
      })
      return {
        ...state,
        projects: sortProjectsByDate(updatedProjects),
        loading: false,
        error: null
      }
    case PROJECT_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => {
          const projectId = project._id || project.id
          return projectId !== action.payload
        }),
        loading: false,
        error: null
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

// Initial state
const initialState = {
  projects: [],
  loading: true,
  error: null
}

// Provider component
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Load projects from API on mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
        const projects = await apiService.getProjects()
        dispatch({ type: PROJECT_ACTIONS.SET_PROJECTS, payload: projects })
      } catch (error) {
        console.error('Error loading projects:', error)
        dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to load projects' })
      }
    }

    loadProjects()
  }, [])

  // Actions
  const addProject = async (projectData) => {
    try {
      dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
      const newProject = await apiService.createProject(projectData)
      dispatch({ type: PROJECT_ACTIONS.ADD_PROJECT, payload: newProject })
      return newProject
    } catch (error) {
      console.error('Error adding project:', error)
      dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to add project' })
      throw error
    }
  }

  const updateProject = async (id, updatedProject) => {
    try {
      dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
      const project = await apiService.updateProject(id, updatedProject)
      
      // Sadece güncellenen projeyi değiştir, tüm listeyi değiştirme
      dispatch({ type: PROJECT_ACTIONS.UPDATE_PROJECT, payload: project })
      
      return project
    } catch (error) {
      console.error('Error updating project:', error)
      dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to update project' })
      throw error
    }
  }

  const deleteProject = async (id) => {
    try {
      if (!id || id === 'undefined' || id === 'null' || id === '') {
        throw new Error(`Project ID is required. Received: ${id} (type: ${typeof id})`)
      }
      
      dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
      await apiService.deleteProject(id)
      
      // Projeyi local state'ten kaldır
      dispatch({ type: PROJECT_ACTIONS.DELETE_PROJECT, payload: id })
      
    } catch (error) {
      console.error('Error deleting project:', error)
      dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to delete project' })
      throw error
    }
  }

  const getProjectById = (id) => {
    return state.projects.find(project => project.id === id)
  }

  const getFeaturedProjects = () => {
    return state.projects.filter(project => project.featured)
  }

  const getProjectsByTechnology = (technology) => {
    return state.projects.filter(project =>
      project.technologies.some(tech =>
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  const refreshProjects = async () => {
    try {
      dispatch({ type: PROJECT_ACTIONS.SET_LOADING, payload: true })
      const projects = await apiService.getProjects()
      dispatch({ type: PROJECT_ACTIONS.SET_PROJECTS, payload: projects })
    } catch (error) {
      console.error('Error refreshing projects:', error)
      dispatch({ type: PROJECT_ACTIONS.SET_ERROR, payload: 'Failed to refresh projects' })
    }
  }

  const value = {
    ...state,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
    getFeaturedProjects,
    getProjectsByTechnology,
    refreshProjects
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}

// Custom hook
export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}

export default ProjectContext
