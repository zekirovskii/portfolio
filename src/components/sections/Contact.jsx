import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'
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
      const response = await fetch('/api/mail/contact', {
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
      console.error('Error sending email:', error)
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
      description: "Feel free to reach out for any inquiries or collaboration opportunities."
    },
    {
      icon: FiMapPin,
      title: "Location",
      value: "Istanbul, Turkey",
      href: "#",
      color: "from-purple-500 to-pink-500",
      description: "Based in Istanbul, Turkey, I'm open to remote or on-site collaborations."
    }
  ]

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/zekirovskii', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yusuf-sengoz', label: 'LinkedIn', color: 'hover:text-blue-500' }
  ]

  return (
    <section className="py-20 bg-black dark:bg-black light:bg-white relative overflow-hidden">
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
            <span className="text-white">Get In </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to work together? Let's discuss your project and bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6 lg:space-y-8"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white dark:text-white light:text-black mb-4 lg:mb-6">
                Let's Connect! 
              </h3>
              <p className="text-base lg:text-lg text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed mb-6 lg:mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question, want to discuss a project, or just want to say hi, 
                feel free to reach out!
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
              {contactInfo.map(({ icon: Icon, title, value, valueShort, href, color, description }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group h-full"
                >
                  <MagicCard className="p-4 lg:p-6 text-center hover:scale-105 transition-all duration-300 rounded-xl h-full flex flex-col min-h-[180px]">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-sm lg:text-lg font-bold text-white dark:text-white light:text-black mb-2 group-hover:text-blue-400 transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2 break-words leading-tight">
                        {value}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400 dark:text-gray-400 light:text-gray-500 leading-tight">
                        {description}
                      </p>
                    </div>
                  </MagicCard>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg lg:text-xl font-semibold text-white dark:text-white light:text-black mb-3 lg:mb-4">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 lg:p-4 rounded-2xl bg-gray-800/50 dark:bg-gray-800/50 light:bg-white/50 text-gray-400 dark:text-gray-400 light:text-gray-500 ${color} transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/70 dark:hover:bg-gray-800/70 light:hover:bg-white/70 hover:shadow-lg`}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full"
          >
            <MagicCard className="p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-white dark:text-white light:text-black mb-8">
                Send Message
              </h3>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-center mb-8"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-center mb-8"
                >
                  ❌ Failed to send message. Please try again or contact me directly.
                </motion.div>
              )}
              
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
      </div>
    </section>
  )
}

export default Contact


