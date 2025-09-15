import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiSettings } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    // Check admin login status
    const checkAdminStatus = () => {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
      setIsAdminLoggedIn(loggedIn)
    }

    checkAdminStatus()
    window.addEventListener('storage', checkAdminStatus)
    
    return () => {
      window.removeEventListener('storage', checkAdminStatus)
    }
  }, [])

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/zekirovskii', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yusuf-sengoz', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:sengozyusuf91@gmail.com', label: 'Email' },
  ]

  const handleLinkClick = () => {
    // Hemen scroll yap
    window.scrollTo(0, 0)
    
    // Smooth scroll için
    setTimeout(() => {
      window.scrollTo({ 
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      })
    }, 100)
  }

  return (
    <footer className="bg-black dark:bg-black light:bg-white relative z-10">
      {/* İlk çizgi - Linklerin üzerinden yukarısı ile footer'ı ayıran */}
      <div className="w-full border-t border-gray-800 dark:border-gray-800 light:border-gray-200"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl font-bold text-white dark:text-white light:text-black">
              Yusuf Şengöz
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-600">
              As a Full Stack Developer, I create creative solutions 
              with modern web technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h4 className="text-lg font-semibold text-white dark:text-white light:text-black">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={handleLinkClick}
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-200/50 px-3 py-2 rounded-lg transition-all duration-200 block relative z-20"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={handleLinkClick}
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-200/50 px-3 py-2 rounded-lg transition-all duration-200 block relative z-20"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/experience" 
                  onClick={handleLinkClick}
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-200/50 px-3 py-2 rounded-lg transition-all duration-200 block relative z-20"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={handleLinkClick}
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-gray-800/50 dark:hover:bg-gray-800/50 light:hover:bg-gray-200/50 px-3 py-2 rounded-lg transition-all duration-200 block relative z-20"
                >
                  Contact
                </Link>
              </li>
              {/* Admin Link - Sadece admin giriş yapmışsa göster */}
              {isAdminLoggedIn && (
                <li>
                  <Link 
                    to="/admin" 
                    onClick={handleLinkClick}
                    className="text-green-400 dark:text-green-400 light:text-green-600 hover:text-green-300 dark:hover:text-green-300 light:hover:text-green-500 hover:bg-green-500/10 dark:hover:bg-green-500/10 light:hover:bg-green-500/10 px-3 py-2 rounded-lg transition-all duration-200 block relative z-20 flex items-center space-x-2"
                  >
                    <FiSettings className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="space-y-4 relative z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h4 className="text-lg font-semibold text-white dark:text-white light:text-black">
              Social Media
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -3,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="p-3 rounded-xl bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200/50 text-gray-300 dark:text-gray-300 light:text-gray-600 hover:bg-gray-700/70 dark:hover:bg-gray-700/70 light:hover:bg-gray-300/70 hover:text-white dark:hover:text-white light:hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 relative z-20 cursor-pointer"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* İkinci çizgi - Made with love kısmının üstünde */}
      <div className="w-full border-t border-gray-800 dark:border-gray-800 light:border-gray-200"></div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm">
            © {currentYear} Yusuf Şengöz. All rights reserved.
          </p>
          <motion.div 
            className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-sm flex items-center mt-2 sm:mt-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <FiHeart className="text-red-500 mr-1" size={16} />
            </motion.div>
            Made with love
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
