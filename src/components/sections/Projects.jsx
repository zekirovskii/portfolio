import React from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { useProjects } from '../../context/ProjectContext'
import { getImageUrl } from '../../utils/helpers'
import { MagicCard } from '../magicui/MagicCard'

// Status gösterimi için helper fonksiyon
const getDisplayStatus = (status) => {
  const statusMap = {
    'published': 'Completed',
    'draft': 'In Progress',
    'archived': 'Archived'
  }
  return statusMap[status] || status
}

const Projects = () => {
  const { projects, loading, error, getFeaturedProjects } = useProjects()

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Error loading projects: {error}</p>
      </div>
    )
  }

  const featuredProjects = getFeaturedProjects()

  return (
    <section id="projects" className="py-10 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MagicCard className="h-full rounded-2xl">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'published' || project.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : project.status === 'draft' || project.status === 'In Progress'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {getDisplayStatus(project.status)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-600/20 text-gray-300 text-sm rounded-full border border-gray-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Ortalanmış Butonlar */}
                  <div className="flex gap-4 justify-center">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 font-semibold"
                      >
                        <FiGithub className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>

        {featuredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No featured projects available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects