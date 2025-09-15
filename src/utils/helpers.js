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
  
  // Eğer zaten /images/ ile başlıyorsa
  if (imagePath.startsWith('/images/')) {
    return imagePath
  }
  
  // Eğer sadece dosya adı ise
  if (imagePath.includes('.')) {
    return `/images/${imagePath}`
  }
  
  // Varsayılan olarak images klasöründen al
  return `/images/${imagePath}`
}

