import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiUsers, FiSettings, FiPlus, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'
import { useProjects } from '../../context/ProjectContext'
import { useAdmin } from '../../context/AdminContext'
import { useProjectContext } from '../../context/ProjectContext'
import ProjectList from './ProjectList'
import ProjectForm from './ProjectForm'
import { getImageUrl, getDisplayStatus, getStatusClasses } from '../../utils/helpers'

const Dashboard = ({ onLogout }) => {
  const { projects, addProject, updateProject, deleteProject, loadProjects } = useProjectContext()
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  // ✅ Admin login olduktan sonra projeleri yükle
  useEffect(() => {
    if (projects.length === 0) {
      loadProjects()
    }
  }, [])

  // ✅ addProject fonksiyonunu tanımla
  const handleAddProject = async (projectData) => {
    try {
      const result = await addProject(projectData)
      if (result.success) {
        console.log('✅ Project added successfully')
        setShowProjectForm(false)
      } else {
        console.error('❌ Error adding project:', result.message)
      }
    } catch (error) {
      console.error('❌ Error adding project:', error)
    }
  }

  // ✅ updateProject fonksiyonunu tanımla
  const handleUpdateProject = async (id, projectData) => {
    try {
      const result = await updateProject(id, projectData)
      if (result.success) {
        console.log('✅ Project updated successfully')
        setEditingProject(null)
        setShowProjectForm(false)
      } else {
        console.error('❌ Error updating project:', result.message)
      }
    } catch (error) {
      console.error('❌ Error updating project:', error)
    }
  }

  const handleEditProject = (project) => {
    // Proje objesini olduğu gibi geçir, ID'yi koru
    setEditingProject({
      ...project,
      id: project._id || project.id // ID'yi normalize et
    })
    setShowProjectForm(true)
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId)
        setEditingProject(null)
        setShowProjectForm(false)
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        // Edit existing project - MongoDB'den gelen projeler _id kullanır
        const projectId = editingProject._id || editingProject.id
        await updateProject(projectId, projectData)
      } else {
        // Add new project
        await addProject(projectData)
      }
      
      // Form'u kapat ve state'i temizle
      setShowProjectForm(false)
      setEditingProject(null)
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleCancelForm = () => {
    setShowProjectForm(false)
    setEditingProject(null)
  }

  const adminStats = [
    { 
      icon: FiTrendingUp, 
      label: "Total Projects", 
      value: projects.length.toString(), 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: FiUsers, 
      label: "Featured", 
      value: projects.filter(p => p.featured).length.toString(), 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: FiSettings, 
      label: "Completed", 
      value: projects.filter(p => getDisplayStatus(p.status) === 'Completed').length.toString(), 
      color: "from-purple-500 to-pink-500" 
    }
  ]

  const quickActions = [
    { 
      icon: FiPlus, 
      label: "New Project", 
      color: "from-blue-500 to-purple-500",
      action: handleAddProject
    },
    { 
      icon: FiEdit, 
      label: "Manage Projects", 
      color: "from-green-500 to-teal-500",
      action: () => setActiveTab('projects')
    },
    { 
      icon: FiEye, 
      label: "View Portfolio", 
      color: "from-purple-500 to-pink-500",
      action: () => window.open('/', '_blank')
    }
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-400 mb-8">Welcome to the portfolio management panel!</p>
          
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={() => setActiveTab('overview')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Overview
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Project Management
            </motion.button>
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center"
            >
              <FiSettings className="mr-2" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {adminStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <MagicCard className="p-6 rounded-xl">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className="text-white text-2xl" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group cursor-pointer"
                    onClick={action.action}
                  >
                    <MagicCard className="p-6 rounded-xl text-center hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="text-white text-xl" />
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {action.label}
                      </h3>
                    </MagicCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Projects Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">Recent Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .slice(0, 6) // İlk 6 projeyi al
                  .map((project, index) => (
                  <motion.div
                    key={`dashboard-project-${index}-${project._id || project.id || Date.now()}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <MagicCard className="p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(project.status)}`}>
                          {getDisplayStatus(project.status)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id || project.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </MagicCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'projects' && (
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onAdd={handleAddProject}
          />
        )}

        {/* Project Form Modal */}
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={handleCancelForm}
          isOpen={showProjectForm}
        />
      </div>
    </div>
  )
}

export default Dashboard
