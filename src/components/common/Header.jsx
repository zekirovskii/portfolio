import { React,useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleNavClick = (path) => {
    setIsMenuOpen(false)
    // Eğer aynı sayfadaysak, en üste scroll yap
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
          : 'bg-black/20 backdrop-blur-sm' // Hero kısmında da hafif arka plan
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="group relative focus:outline-none">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                Yusuf Şengöz
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => handleNavClick(path)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                  isActive(path)
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <span className="relative z-10 font-medium">{label}</span>
                {/* CSS hover animation */}
                {!isActive(path) && (
                  <div className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-0 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors bg-gray-800/50 rounded-lg"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 bg-black/90 backdrop-blur-md rounded-lg mt-2 border border-gray-800">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => handleNavClick(path)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                  isActive(path)
                    ? 'text-blue-400 bg-blue-500/20'
                    : 'text-white hover:text-blue-400 hover:bg-gray-800/50'
                }`}
              >
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}

export default Header
