import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { useProjects } from '../context/ProjectContext'
import { getImageUrl } from '../utils/helpers'
import { TextReveal } from '../components/magicui/TextReveal'

const Projects = () => {
  const { projects, loading, error } = useProjects()
  const [searchTerm, setSearchTerm] = useState('')

  // Status gösterimi için helper fonksiyon
  const getDisplayStatus = (status) => {
    const statusMap = {
      'published': 'Completed',
      'draft': 'In Progress',
      'archived': 'Archived'
    }
    return statusMap[status] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-400">Error loading projects: {error}</p>
      </div>
    )
  }

  // Sadece featured projeleri al
  const featuredProjects = projects.filter(project => project.featured)

  // Filtered featured projects based on search
  const filteredFeaturedProjects = searchTerm.length >= 3 
    ? featuredProjects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : featuredProjects

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 bg-black"
    >
      {/* Hero Section - Animasyonlu */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
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
            <TextReveal
              text="My Projects"
              className="text-6xl font-bold text-white mb-6"
            />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Discover the projects I've built combining creativity and technology
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
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

      {/* Featured Projects - Küçültülmüş Kartlar */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
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

          <div className="space-y-6">
            {filteredFeaturedProjects.map((project, index) => (
              <motion.div
                key={project._id || project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group max-w-6xl mx-auto"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Resim - Sol taraf - Web projeleri için daha geniş */}
                  <div className="relative overflow-hidden lg:w-2/5">
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
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

                  {/* İçerik - Sağ taraf - Gri arka plan */}
                  <div className="p-6 lg:w-3/5 flex flex-col justify-between bg-gray-900/50">
                    <div>
                      <h3 className="text-xl font-bold text-white transition-colors mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm"
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
                          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold text-sm"
                        >
                          <FiGithub className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {searchTerm.length >= 3 && filteredFeaturedProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-gray-400 text-lg mb-4">No projects found</p>
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

          {filteredFeaturedProjects.length === 0 && searchTerm.length < 3 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No featured projects available</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}

export default Projects
