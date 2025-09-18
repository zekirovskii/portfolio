import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi'
import { FadeIn } from '../components/animations'
import { TextReveal } from '../components/magicui/TextReveal'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Frontend Engineering Intern",
      company: "Insider",
      location: "Istanbul, Turkey",
      period: "July - August 2025",
      description: "I worked on developing modern web applications. I focused on improving both performance and user experience by creating scalable solutions using React and Next.js technologies. During this time, I gained practical experience in SEO, SSR, and responsive design.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Docker"],
      achievements: [
        "Improved application speed and visibility through SSR and SEO optimizations.",
        "Provided real-time content through TMDB API integration.",
        "Successfully deployed the project to production using Docker and Vercel."
      ]
    },
    {
      id: 2,
      title: "IT Intern",
      company: "Mytechnic MRO Technic Services",
      location: "Istanbul, Turkey",
      period: "August - September 2024",
      description: "As part of my internship at MyTechnic, I developed a shift management system using C# .NET. This allowed me to gain practical experience in backend development, database management, and interface design.",
      technologies: ["C#", ".NET", "SQL", "Docker", "Figma"],
      achievements: [
        "Integrated an MSSQL database to securely and systematically store shift data.",
        "Designed a user-friendly interface that simplified shift creation and visualization processes.",
        "Implemented a scalable code structure, allowing the system to be adapted for different departments in the future."
      ]
    }
  ]

  const education = [
    {
      id: 1,
      degree: "Software Engineering",
      school: "Istanbul Gelisim University",
      period: "2022 - 2026",
      description: "Comprehensive education in software development, algorithm design, and data structures."
    },
    {
      id: 2,
      degree: "Web Development Course",
      school: "GoIT",
      period: "2024-2025",
      description: "Intensive training focused on modern web development technologies and best practices."
    }
  ]

  const skills = [
    { category: "Frontend", items: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "Bootstrap"] },
    { category: "Backend", items: ["Node.js", "Python", "MSSQL", "MongoDB"] },
    { category: "Tools", items: ["Git", "Docker", "Postman", "Figma", "Webpack"] },
    { category: "Languages", items: ["JavaScript", "TypeScript", "Python", "C#", "SQL", "HTML/CSS", "Java"] }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-16 bg-black"
    >
      {/* Hero Section - About Me ile aynı gradient ve yükseklik */}
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
            <TextReveal
              text="Experience & Education"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            />
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              My professional journey and continuous development process
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section - Siyah arka plan */}
      <div className="bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Work Experience */}
            <div className="lg:col-span-2">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-bold text-white mb-8 flex items-center"
              >
                <FiBriefcase className="mr-3 text-purple-400" />
                Work Experience
              </motion.h2>

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex items-center text-purple-400 font-semibold text-lg mt-1">
                          <FiMapPin className="mr-2" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                        <FiCalendar className="mr-2" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-gray-300">
                            <span className="text-purple-400 mr-2 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Skills Sidebar */}
            <div className="space-y-8">
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center group-hover:text-green-400 transition-colors duration-300">
                  <FiCalendar className="mr-3 text-green-400" />
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-green-400 pl-4">
                      <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                      <p className="text-green-400 font-medium">{edu.school}</p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                      <p className="text-gray-300 text-sm mt-2">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-cyan-500 transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300">Skills</h3>
                <div className="space-y-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-3">{skillGroup.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full border border-cyan-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Experience
