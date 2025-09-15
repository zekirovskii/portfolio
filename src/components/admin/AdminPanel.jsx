import { motion } from 'framer-motion'
import { FiLogOut, FiSettings, FiUsers, FiTrendingUp, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi'
import { MagicCard } from '../magicui/MagicCard'
import { ShineBorder } from '../magicui/ShineBorder'
import { useAdminContext } from '../../context/AdminContext'
import Dashboard from './Dashboard'

const AdminPanel = () => {
  const { logout } = useAdminContext()

  return <Dashboard onLogout={logout} />
}

export default AdminPanel
