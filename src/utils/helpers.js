import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/images/placeholder-project.jpg'
  }
  
  // Eğer zaten tam URL ise (http/https ile başlıyorsa)
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Base64 veri URL'lerini kontrol et
  if (imagePath.startsWith('data:image/')) {
    return imagePath
  }
  
  // Eğer zaten /uploads/ ile başlıyorsa (backend'den gelen)
  if (imagePath.startsWith('/uploads/')) {
    // Vite proxy kullanarak CORS sorununu çöz
    return imagePath // Proxy sayesinde localhost:3000/uploads/ olacak
  }
  
  // Eğer zaten /images/ ile başlıyorsa
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  
  // Eğer sadece dosya adı ise
  if (imagePath.includes('.')) {
    return `/uploads/${imagePath}`
  }
  
  // Varsayılan olarak images klasöründen al
  return `/images/${imagePath}`
}

// Status mapping - Backend'den gelen status'u frontend'de gösterilecek hale çevir
export const getDisplayStatus = (backendStatus) => {
  const statusMapping = {
    'published': 'Completed',
    'draft': 'In Progress', 
    'archived': 'Archived'
  }
  
  return statusMapping[backendStatus] || backendStatus || 'Unknown'
}

// Status'a göre CSS class'ları döndür
export const getStatusClasses = (status) => {
  const displayStatus = getDisplayStatus(status)
  
  switch (displayStatus) {
    case 'Completed':
      return 'bg-green-500/20 text-green-400 border border-green-500/30'
    case 'In Progress':
      return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
    case 'Archived':
      return 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
    default:
      return 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  }
}

