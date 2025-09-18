import { motion } from 'framer-motion'
import { FiCode, FiDatabase, FiLayers, FiMonitor, FiCloud, FiGitBranch, FiTerminal, FiChevronLeft, FiChevronRight, FiUsers, FiTarget, FiHeart, FiClock, FiBookOpen } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'
import { useState, useEffect } from 'react'

const Skills = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FiMonitor,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React", level: 85, description: "Building interactive UIs" },
        { name: "Next.js", level: 80, description: "Full-stack React framework" },
        { name: "TypeScript", level: 75, description: "Type-safe JavaScript" },
        { name: "Tailwind CSS", level: 90, description: "Utility-first CSS" },
        { name: "JavaScript", level: 85, description: "Core programming language" }
      ]
    },
    {
      title: "Backend Development",
      icon: FiDatabase,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 80, description: "JavaScript runtime" },
        { name: "Python", level: 75, description: "Versatile programming" },
        { name: "MongoDB", level: 70, description: "NoSQL database" },
        { name: "SQL", level: 80, description: "Database queries" },
        { name: "REST APIs", level: 85, description: "API development" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: FiTerminal,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Git", level: 90, description: "Version control" },
        { name: "Docker", level: 70, description: "Containerization" },
        { name: "Figma", level: 80, description: "UI/UX design" },
        { name: "VS Code", level: 95, description: "Code editor" },
        { name: "Postman", level: 85, description: "API testing" }
      ]
    }
  ]

  const softSkills = [
    { 
      name: "Problem Solving", 
      level: 90, 
      icon: FiTarget,
      description: "Analytical thinking and creative solutions"
    },
    { 
      name: "Team Collaboration", 
      level: 85, 
      icon: FiUsers,
      description: "Working effectively in diverse teams"
    },
    { 
      name: "Communication", 
      level: 80, 
      icon: FiCode,
      description: "Technical & interpersonal communication"
    },
    { 
      name: "Adaptability", 
      level: 88, 
      icon: FiHeart,
      description: "Quickly adapting to new technologies"
    },
    { 
      name: "Time Management", 
      level: 82, 
      icon: FiClock,
      description: "Efficient project planning and execution"
    },
    { 
      name: "Continuous Learning", 
      level: 95, 
      icon: FiBookOpen,
      description: "Passion for staying updated with tech trends"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skillCategories.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [skillCategories.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillCategories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)
  }

  return (
    <section className="py-16 bg-black dark:bg-black light:bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white dark:text-white light:text-black mb-6">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Technologies and tools I use to bring ideas to life. Always learning and improving.
          </p>
        </motion.div>

        {/* Technical Skills Slider */}
        <div className="relative mb-16">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="w-full flex-shrink-0 px-4">
                  <MagicCard className="p-8 h-full rounded-xl">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                        <category.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white dark:text-white light:text-black">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                          viewport={{ once: true, margin: "-30px" }}
                          className="group"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="text-white dark:text-white light:text-black font-semibold">
                                {skill.name}
                              </span>
                              <p className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm">
                                {skill.description}
                              </p>
                            </div>
                            <span className="text-blue-400 dark:text-blue-400 font-bold">
                              {skill.level}%
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700 dark:bg-gray-700 light:bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                              viewport={{ once: true, margin: "-30px" }}
                              className={`h-full bg-gradient-to-r ${category.color} rounded-full group-hover:shadow-lg transition-all duration-300`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </MagicCard>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Soft Skills - Circular Design with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white dark:text-white light:text-black mb-4">
              Soft Skills
            </h3>
            <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
              Personal attributes that enhance my professional effectiveness
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center"
              >
                <MagicCard className="p-6 rounded-xl h-full flex flex-col">
                  <div className="relative mb-4 flex-shrink-0">
                    {/* Circular Progress with Icon */}
                    <div className="relative w-16 h-16 mx-auto">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-700 dark:text-gray-700 light:text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          className="text-blue-500"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{ strokeDasharray: `${skill.level}, 100` }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                          viewport={{ once: true, margin: "-50px" }}
                        />
                      </svg>
                      
                      {/* Icon in Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <skill.icon className="text-white" size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h4 className="text-sm font-semibold text-white dark:text-white light:text-black mb-2 line-clamp-2">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 line-clamp-3 flex-grow">
                      {skill.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
