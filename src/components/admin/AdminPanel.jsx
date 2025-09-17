import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLogOut, FiSettings, FiUsers, FiPlus } from 'react-icons/fi'
import Dashboard from './Dashboard'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import { useAdmin } from '../../context/AdminContext'

const AdminPanel = () => {
  const { logout } = useAdmin()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogout = () => {
    logout()
  }

  return <Dashboard onLogout={logout} />
}

export default AdminPanel
