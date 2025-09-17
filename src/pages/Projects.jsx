import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi'
import { useProjects } from '../context/ProjectContext'
import { getImageUrl } from '../utils/helpers'

const Projects = () => {
  const { projects: contextProjects } = useProjects()
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Static projeler + Context'ten eklenen projeleri birleştir
  const allProjects = [...contextProjects]
  
  // Featured projeleri al
  const featuredProjects = allProjects.filter(project => project.featured)

  // Filtered featured projects based on search (only title and description)
  const filteredFeaturedProjects = featuredProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 bg-black"
    >
      {/* Hero Section - About Me ile aynı gradient */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              My Projects
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Discover the projects I've built combining creativity and technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section - Siyah arka plan */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by project name or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <svg className="absolute right-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-center text-gray-400 text-sm mt-2">
              {searchTerm.length < 3 
                ? `Type at least ${3 - searchTerm.length} more character${3 - searchTerm.length === 1 ? '' : 's'} to search`
                : 'Search by project name or technology stack'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects - Siyah arka plan */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Featured Projects
          </h2>
          
          <div className="mb-8">
            <p className="text-gray-300 text-center text-lg">
              {filteredFeaturedProjects.length} project{filteredFeaturedProjects.length !== 1 ? 's' : ''} found
              {searchTerm.length >= 3 && (
                <span className="block text-sm text-gray-400 mt-1">
                  Searching for: "{searchTerm}"
                </span>
              )}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {filteredFeaturedProjects.map((project, index) => (
              <motion.div 
                key={`featured-project-${index}-${project._id || project.id || Date.now()}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 group shadow-xl hover:shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Enhanced Image Container */}
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <div className="relative h-80 lg:h-96 bg-gradient-to-br from-gray-800 to-gray-900">
                      <img 
                        src={getImageUrl(project.image)}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-all duration-700 ease-out"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'
                        }}
                      />
                      {/* Overlay gradient for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {/* Zoom indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${project.status}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed text-lg">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={`${project.id}-tech-${techIndex}`} className="px-4 py-2 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-center transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 text-center transform hover:scale-105 shadow-lg"
                      >
                        🔗 GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {searchTerm.length >= 3 && filteredFeaturedProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default Projects
