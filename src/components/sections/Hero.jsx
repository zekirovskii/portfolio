import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowDown, FiCode, FiLayers, FiZap, FiGithub, FiLinkedin, FiMail, FiDownload, FiStar } from 'react-icons/fi'
import { ShineBorder } from '../magicui/ShineBorder'
import { MagicCard } from '../magicui/MagicCard'
import { TextReveal } from '../magicui/TextReveal'
import { Particles } from '../magicui/Particles'
import { Meteors } from '../magicui/Meteors'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/zekirovskii', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yusuf-sengoz', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:sengozyusuf91@gmail.com', label: 'Email' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black dark:bg-black light:bg-white">
      {/* Background Effects */}
      <Particles 
        quantity={20}
        color="#007aff"
        size={0.3}
        speed={0.1}
        className="opacity-10"
      />
      <Meteors number={20} />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/5 light:bg-blue-500/3 rounded-full mix-blend-screen dark:mix-blend-screen light:mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[
          { text: "const handleClick = () => {}", x: "55%", y: "35%", delay: 0 },
          { text: "return <div>Hello</div>", x: "80%", y: "85%", delay: 4 },
          { text: "useEffect(() => {}, [])", x: "35%", y: "10%", delay: 2 },
          { text: "className='bg-black'", x: "1%", y: "65%", delay: 6 }
        ].map((snippet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: [20, -20, 20],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 6,
              delay: snippet.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute text-sm font-mono text-blue-400 dark:text-blue-400 select-none whitespace-nowrap"
            style={{ left: snippet.x, top: snippet.y }}
          >
            {snippet.text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left lg:text-left"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 dark:from-gray-800/40 dark:to-gray-700/40 text-gray-200 dark:text-gray-200 rounded-2xl text-lg font-semibold backdrop-blur-md border border-gray-600/40 dark:border-gray-600/40 shadow-xl">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 animate-pulse"></div>
                <span>Hello, I'm Yusuf</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white dark:text-white light:text-black mb-8 tracking-tight leading-tight"
            >
              <span className="block">Full Stack</span>
              <span className="block">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Developer</span>
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl sm:text-3xl text-gray-300 dark:text-gray-300 light:text-gray-600 font-light leading-relaxed max-w-2xl">
                I develop creative and user-friendly applications 
                with modern web technologies.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-400 dark:text-gray-400 light:text-gray-500 mb-12 leading-relaxed max-w-2xl"
            >
              I bring projects to life with React, Node.js and other modern technologies. 
              I prioritize user experience while creating performant and scalable solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center text-lg"
                >
                  <span>View My Projects</span>
                  <FiArrowDown className="ml-3 group-hover:translate-y-1 transition-transform duration-300" size={18} />
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-5 border-2 border-gray-600 dark:border-gray-600 text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800 hover:text-white dark:hover:text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center text-lg hover:border-blue-500 dark:hover:border-blue-500"
                >
                  <FiMail className="mr-3" />
                  <span>Get In Touch</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-8"
            >
              <span className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-400 font-medium tracking-wide">Follow:</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 8, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-2xl bg-gray-800/20 dark:bg-gray-800/20 light:bg-gray-100/50 text-gray-400 dark:text-gray-400 light:text-gray-500 hover:text-blue-500 dark:hover:text-blue-500 light:hover:text-blue-600 transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/40 dark:hover:bg-gray-800/40 light:hover:bg-gray-100/70 hover:shadow-lg"
                  aria-label={label}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Main Container */}
            <div className="relative">
              {/* Circular Frame Design */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Outer Ring - Gradient Border */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                    {/* Gradient Border Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-1">
                      <div className="w-full h-full bg-black dark:bg-black light:bg-white rounded-full"></div>
                    </div>
                    
                    {/* Inner Ring */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-400/30"></div>
                    
                    {/* Image Container */}
                    <div className="absolute inset-8 bg-black dark:bg-black light:bg-white rounded-full overflow-hidden">
                      <img 
                        src="/src/assets/images/profile.png" 
                        alt="Yusuf Şengöz" 
                        className="w-full h-full object-cover scale-125 hover:scale-130 transition-transform duration-700 filter contrast-110 brightness-105 saturate-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Tech Icons */}
                <motion.div
                  animate={{ 
                    y: [0, -25, 0],
                    rotate: [0, 20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500/50 to-cyan-500/50 rounded-2xl flex items-center justify-center backdrop-blur-md border border-blue-500/40 shadow-2xl"
                >
                  <FiCode className="text-blue-200" size={24} />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 25, 0],
                    rotate: [0, -20, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-2xl flex items-center justify-center backdrop-blur-md border border-purple-500/40 shadow-2xl"
                >
                  <FiZap className="text-purple-200" size={24} />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/3 -left-8 w-14 h-14 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 rounded-xl flex items-center justify-center backdrop-blur-md border border-cyan-500/40 shadow-xl"
                >
                  <FiLayers className="text-cyan-200" size={18} />
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                  className="absolute top-2/3 -right-8 w-14 h-14 bg-gradient-to-br from-pink-500/40 to-purple-500/40 rounded-xl flex items-center justify-center backdrop-blur-md border border-pink-500/40 shadow-xl"
                >
                  <FiStar className="text-pink-200" size={18} />
                </motion.div>
              </div>

              {/* Background - Geometric Shapes */}
              <div className="absolute inset-0 pointer-events-none -z-10">
                {/* Large Circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-40 h-40 border border-blue-500/20 rounded-full"
                />
                
                {/* Small Circles */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-16 -left-16 w-24 h-24 border border-purple-500/20 rounded-full"
                />
                
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 -left-12 w-16 h-16 border border-pink-500/20 rounded-full"
                />

                {/* Triangles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 right-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-cyan-500/20"
                />

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 left-1/4 w-0 h-0 border-l-6 border-r-6 border-t-12 border-l-transparent border-r-transparent border-t-yellow-500/20"
                />

                {/* Squares */}
                <motion.div
                  animate={{ rotate: 45 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/4 -right-6 w-8 h-8 border border-green-500/20"
                />

                <motion.div
                  animate={{ rotate: -45 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-1/4 -left-6 w-6 h-6 border border-indigo-500/20"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-400 mb-4 font-light tracking-wider uppercase">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-gray-500 dark:border-gray-500 light:border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
