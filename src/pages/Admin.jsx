import { motion } from 'framer-motion'
import AdminLogin from '../components/admin/AdminLogin'
import AdminPanel from '../components/admin/AdminPanel'
import { useAdmin } from '../context/AdminContext'

const Admin = () => {
  const { isAuthenticated, loading } = useAdmin()

  console.log(' Admin state:', { isAuthenticated, loading }) // Debug için

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {isAuthenticated ? (
        <AdminPanel />
      ) : (
        <AdminLogin />
      )}
    </motion.div>
  )
}

export default Admin