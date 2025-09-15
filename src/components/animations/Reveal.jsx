import { motion } from 'framer-motion'

const Reveal = ({ children, delay = 0, duration = 0.6 }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        clipPath: "inset(0 100% 0 0)" 
      }}
      whileInView={{ 
        opacity: 1, 
        clipPath: "inset(0 0% 0 0)" 
      }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
