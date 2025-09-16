import React, { createContext, useContext, useReducer, useEffect } from 'react'
import apiService from '../services/apiService'

// Context
const AdminContext = createContext()

// Action types
const ADMIN_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Reducer
const adminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload,
        loading: false,
        error: null
      }
    case ADMIN_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        loading: false,
        error: null
      }
    case ADMIN_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case ADMIN_ACTIONS.SET_ERROR:
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
  isAuthenticated: false,
  admin: null,
  loading: false,
  error: null
}

// Provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        if (token) {
          // Verify token with API
          const response = await apiService.getAdminProfile()
          dispatch({
            type: ADMIN_ACTIONS.LOGIN,
            payload: response.data
          })
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        // Clear invalid token
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminEmail')
      }
    }

    checkAuth()
  }, [])

  // Actions
  const login = async (credentials) => {
    try {
      dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: true })
      const response = await apiService.adminLogin(credentials)
      
      // Store token
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminEmail', response.data.admin.email)
      
      dispatch({
        type: ADMIN_ACTIONS.LOGIN,
        payload: response.data.admin
      })
      
      return response
    } catch (error) {
      console.error('Error during login:', error)
      dispatch({ type: ADMIN_ACTIONS.SET_ERROR, payload: error.message || 'Login failed' })
      throw error
    }
  }

  const register = async (credentials) => {
    try {
      dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: true })
      const response = await apiService.adminRegister(credentials)
      
      // Store token
      localStorage.setItem('adminToken', response.data.token)
      localStorage.setItem('adminEmail', response.data.admin.email)
      
      dispatch({
        type: ADMIN_ACTIONS.LOGIN,
        payload: response.data.admin
      })
      
      return response
    } catch (error) {
      console.error('Error during registration:', error)
      dispatch({ type: ADMIN_ACTIONS.SET_ERROR, payload: error.message || 'Registration failed' })
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call API logout
      await apiService.adminLogout()
    } catch (error) {
      console.error('Error during logout:', error)
    } finally {
      // Clear local storage
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      
      dispatch({ type: ADMIN_ACTIONS.LOGOUT })
    }
  }

  const setLoading = (loading) => {
    dispatch({ type: ADMIN_ACTIONS.SET_LOADING, payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: ADMIN_ACTIONS.SET_ERROR, payload: error })
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    setLoading,
    setError
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

// Custom hook
export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider')
  }
  return context
}

export default AdminContext
