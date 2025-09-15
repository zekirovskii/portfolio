import { motion } from 'framer-motion'

const BounceIn = ({ children, delay = 0, duration = 0.8 }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.3 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1 
      }}
      transition={{ 
        duration, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default BounceIn
