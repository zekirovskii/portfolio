import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiEdit, FiTrash2, FiEye, FiExternalLink, FiGithub, FiPlus } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'
import { getImageUrl } from "../../utils/helpers"

// Props'tan onDelete'yi al
const ProjectList = ({ projects, onAdd, onEdit, onDelete }) => {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleDelete = async (project) => {
    const projectId = project._id || project.id
    
    if (!projectId) {
      alert('Project ID not found')
      return
    }
    
    if (window.confirm('Are you sure you want to delete this project?')) {
      onDelete(projectId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Project Management</h2>
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold flex items-center"
        >
          <FiPlus className="mr-2" />
          New Project
        </motion.button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={`admin-project-${index}-${project._id || project.id || Date.now()}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <MagicCard className="p-6 rounded-xl h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white line-clamp-2">{project.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(project)}
                    className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                  >
                    <FiEdit className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="text-red-400" />
                  </button>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span
                    key={`${project.id}-tech-${idx}`}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {project.status}
                </span>
                
                <div className="flex space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-green-500/20 rounded-lg transition-colors"
                    >
                      <FiExternalLink className="text-green-400" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-500/20 rounded-lg transition-colors"
                    >
                      <FiGithub className="text-gray-400" />
                    </a>
                  )}
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects added yet</p>
        </div>
      )}
    </div>
  )
}

export default ProjectList