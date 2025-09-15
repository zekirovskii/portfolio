import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCode, FiHeart, FiTarget, FiUsers, FiAward, FiCoffee, FiBookOpen, FiCalendar, FiMail } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'

const About = () => {
  const stats = [
    { icon: FiCode, value: "2+", label: "Years Experience" },
    { icon: FiBookOpen, value: "4th Year", label: "Software Engineering" },
    { icon: FiCalendar, value: "21", label: "Years Old" },
    { icon: FiCoffee, value: "∞", label: "Cups of Coffee" }
  ]

  const values = [
    {
      icon: FiCode,
      title: "Code Quality",
      description: "I focus on writing clean, readable and maintainable code."
    },
    {
      icon: FiTarget,
      title: "Goal Oriented",
      description: "I adopt a strategic approach to ensure projects reach their goals."
    },
    {
      icon: FiHeart,
      title: "Passionate",
      description: "My passion for technology fuels my continuous learning and development."
    }
  ]

  return (
    <section className="py-20 bg-black dark:bg-black light:bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white dark:text-white light:text-black mb-6">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A software engineering student who creates creative solutions with modern web technologies and continuously learns.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white dark:text-white light:text-black mb-6">
                Hello, I'm Yusuf! 🚀
              </h3>
              <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed mb-6">
                As a 4th year Software Engineering student, I've been working with web technologies for 2+ years. 
                I'm learning to develop user-friendly and performant applications with React, Node.js and modern JavaScript ecosystem.
              </p>
              <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed">
                My passion for technology, desire for continuous learning and attention to detail 
                drive me to improve myself in every project. I value teamwork and prioritize open communication.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <value.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white dark:text-white light:text-black mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center"
              >
                <MagicCard className="p-8 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-white dark:text-white light:text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                    {stat.label}
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section - Improved Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Main Container */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl rounded-3xl">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-sm"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="mb-8"
                  >
                    <h3 className="text-4xl font-bold text-white dark:text-white light:text-black mb-4">
                      Let's Learn Together! 🚀
                    </h3>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                      We can learn together and develop projects in my software development journey. 
                      Let's bring your dream web application to life together.
                    </p>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link to="/projects" className="block">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center text-lg"
                      >
                        <span>View My Projects</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-2"
                        >
                          <FiCode className="w-5 h-5" />
                        </motion.div>
                      </motion.button>
                    </Link>
                    
                    <Link to="/contact" className="block">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group w-full sm:w-auto px-10 py-4 border-2 border-gray-600 dark:border-gray-600 light:border-gray-300 text-gray-300 dark:text-gray-300 light:text-gray-700 rounded-2xl font-semibold hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-100/50 transition-all duration-300 flex items-center justify-center text-lg hover:border-blue-500 dark:hover:border-blue-500"
                      >
                        <FiMail className="mr-2" />
                        <span>Get In Touch</span>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-6 w-4 h-4 bg-cyan-500/20 rounded-full animate-pulse delay-500"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

