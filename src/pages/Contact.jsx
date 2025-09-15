import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiClock, FiGlobe } from 'react-icons/fi'
import { MagicCard } from '../components/magicui/MagicCard'
import { ShineBorder } from '../components/magicui/ShineBorder'
import { TextReveal } from '../components/magicui/TextReveal'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('http://localhost:5050/api/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      value: "sengozyusuf91@gmail.com",
      href: "mailto:sengozyusuf91@gmail.com",
      color: "from-blue-500 to-cyan-500",
      description: "Send me an email anytime"
    },
    {
      icon: FiMapPin,
      title: "Location",
      value: "Istanbul, Turkey",
      href: "#",
      color: "from-green-500 to-emerald-500",
      description: "Based in Istanbul"
    },
    {
      icon: FiClock,
      title: "Response Time",
      value: "Within 24 hours",
      href: "#",
      color: "from-purple-500 to-pink-500",
      description: "I'll get back to you quickly"
    }
  ]

  const socialLinks = [
    { 
      icon: FiGithub, 
      href: 'https://github.com/zekirovskii', 
      label: 'GitHub', 
      color: 'hover:text-gray-400',
      description: 'Check out my code'
    },
    { 
      icon: FiLinkedin, 
      href: 'https://www.linkedin.com/in/yusuf-sengoz', 
      label: 'LinkedIn', 
      color: 'hover:text-blue-500',
      description: 'Professional network'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-16 bg-black dark:bg-black light:bg-white overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="py-14 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
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
            <TextReveal
              text="Get In Touch"
              className="text-6xl md:text-7xl font-bold text-white dark:text-white light:text-black mb-6"
            />
            <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 leading-relaxed">
              I'm always interested in new opportunities and exciting projects.
Let's discuss how we can collaborate!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black dark:bg-black light:bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white dark:text-white light:text-black mb-6">
                Send Message
              </h2>
              <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600">
                Have a project in mind? Let's discuss it!
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-center mb-12"
              >
                ✅ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center mb-12"
              >
                ❌ Failed to send message. Please try again or contact me directly.
              </motion.div>
            )}

            <MagicCard className="p-8 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-3">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-xl text-white dark:text-white light:text-black placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-3">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-xl text-white dark:text-white light:text-black placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-xl text-white dark:text-white light:text-black placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-xl text-white dark:text-white light:text-black placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-600 mb-3">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 border border-gray-600 dark:border-gray-600 light:border-gray-300 rounded-xl text-white dark:text-white light:text-black placeholder-gray-400 dark:placeholder-gray-400 light:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, timeline, and any specific requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FiSend className="mr-2" />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </form>
            </MagicCard>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-black dark:bg-black light:bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white dark:text-white light:text-black mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to reach out
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {contactInfo.map(({ icon: Icon, title, value, href, color, description }, index) => (
              <motion.a
                key={index}
                href={href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <MagicCard className="p-8 text-center hover:scale-105 transition-all duration-300 rounded-xl">
                  <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white dark:text-white light:text-black mb-2 group-hover:text-blue-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2">
                    {value}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-500">
                    {description}
                  </p>
                </MagicCard>
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white dark:text-white light:text-black mb-8">
              Follow Me
            </h3>
            <div className="flex justify-center gap-8">
              {socialLinks.map(({ icon: Icon, href, label, color, description }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="group"
                >
                  <ShineBorder
                    className="p-6 rounded-2xl bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 backdrop-blur-sm hover:bg-gray-700/50 dark:hover:bg-gray-700/50 light:hover:bg-gray-100/50 transition-all duration-300 rounded-2xl"
                    color="linear-gradient(45deg, #3b82f6, #8b5cf6)"
                  >
                    <div className="text-center">
                      <Icon className={`text-3xl text-gray-400 dark:text-gray-400 light:text-gray-500 ${color} transition-colors duration-300 mx-auto mb-3`} />
                      <h4 className="text-lg font-semibold text-white dark:text-white light:text-black group-hover:text-blue-400 transition-colors mb-1">
                        {label}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-400">
                        {description}
                      </p>
                    </div>
                  </ShineBorder>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
