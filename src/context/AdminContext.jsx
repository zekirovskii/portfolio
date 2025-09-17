import React, { createContext, useContext, useReducer, useEffect } from 'react'
import apiService from '../services/apiService'

// Context
const AdminContext = createContext()

// Action types
const ADMIN_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED'
}

// Initial state
const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null
}

// Reducer
const adminReducer = (state, action) => {
  switch (action.type) {
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
    case ADMIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null
      }
    case ADMIN_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      }
    case ADMIN_ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    default:
      return state
  }
}

// Provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState)

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      dispatch({ type: ADMIN_ACTIONS.SET_AUTHENTICATED, payload: true })
    }
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiService.adminLogin(email, password)
      
      // ✅ Backend'den gelen response formatına göre kontrol et
      if (response.status === 'success') {
        localStorage.setItem('adminToken', response.data.token)
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: response.data.admin }
        })
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken')
    dispatch({ type: ADMIN_ACTIONS.LOGOUT })
  }

  const value = {
    ...state,
    login,
    logout
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

// Hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

// Alias for backward compatibility
export const useAdminContext = useAdmin

export default AdminContext
