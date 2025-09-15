import homeImage from '../assets/images/projects/home.png'
import tmdbImage from '../assets/images/projects/tmdb-home.png'
import cinemaImage from '../assets/images/projects/cinemania-home.png'
import generator from '../assets/images/projects/image-generator.png'
import portfolio from '../assets/images/projects/portfolio.png'
import imageSearch from '../assets/images/projects/jsSearch.png'
import asyncTimer from '../assets/images/projects/timer.png'
import phonebook from '../assets/images/projects/phonebook.png'
import movieSearch from '../assets/images/projects/moviesearch.png'
import reactImageSearch from '../assets/images/projects/imagesearch.png'
import focus from '../assets/images/projects/focusframe.png'

export const projects = [
  {
    id: 11,
    title: "Money Guard",
    description: "Money Guard is a personal finance tracker built with React and Swagger (OpenAPI). Features include expense tracking, budget management, and financial analytics dashboard.",
    image: homeImage,
    technologies: ["React", "Swagger", "Module CSS", "Figma"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://money-guard-z41y.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/money-guard",
    featured: true,
    year: "2025"
  },
  {
    id: 10,
    title: "TMDB Clone",
    description: "A Next.js-based TMDB clone for discovering movies and TV shows with dynamic routes and API integration. Features include search, filtering, and detailed movie information.",
    image: tmdbImage,
    technologies: ["React", "Next.js", "Tailwind CSS", "Docker"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://tmdb-ssr.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/tmdb-ssr",
    featured: true,
    year: "2025"
  },
  {
    id: 9,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS. Features include smooth animations, dark mode, and a clean, professional design.",
    image: portfolio,
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://yusufsengoz.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/portfolio",
    featured: true,
    year: "2024"
  },
  {
    id: 8,
    title: "Cinemania",
    description: "A movie discovery and rating platform built with React. Users can search for movies, view details, and rate their favorites with a beautiful, responsive interface.",
    image: cinemaImage,
    technologies: ["React", "CSS3", "JavaScript", "API Integration"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://cinemania-react.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/cinemania-react",
    featured: false,
    year: "2024"
  },
  {
    id: 7,
    title: "AI Image Generator",
    description: "An AI-powered image generation tool that creates unique images based on text prompts. Built with modern web technologies and integrated with AI APIs.",
    image: generator,
    technologies: ["React", "Node.js", "AI API", "Tailwind CSS"],
    category: "AI/ML",
    status: "Completed",
    liveUrl: "https://ai-image-generator-demo.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/ai-image-generator",
    featured: false,
    year: "2024"
  },
  {
    id: 6,
    title: "JavaScript Search Engine",
    description: "A custom search engine built with vanilla JavaScript. Features include real-time search, filtering, and a clean, intuitive user interface.",
    image: imageSearch,
    technologies: ["JavaScript", "HTML5", "CSS3", "Search API"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://js-search-engine.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/js-search-engine",
    featured: false,
    year: "2024"
  },
  {
    id: 5,
    title: "Async Timer",
    description: "A modern timer application with async functionality. Features include multiple timers, notifications, and a sleek, responsive design.",
    image: asyncTimer,
    technologies: ["JavaScript", "Async/Await", "CSS3", "Web APIs"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://async-timer.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/async-timer",
    featured: false,
    year: "2024"
  },
  {
    id: 4,
    title: "Phonebook App",
    description: "A contact management application with full CRUD functionality. Built with React and features a clean, intuitive interface for managing contacts.",
    image: phonebook,
    technologies: ["React", "JavaScript", "CSS3", "Local Storage"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://phonebook-app-react.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/phonebook-app-react",
    featured: false,
    year: "2024"
  },
  {
    id: 3,
    title: "Movie Search App",
    description: "A movie search and discovery application with real-time search functionality. Features include movie details, ratings, and a responsive design.",
    image: movieSearch,
    technologies: ["React", "API Integration", "CSS3", "JavaScript"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://movie-search-react.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/movie-search-react",
    featured: false,
    year: "2024"
  },
  {
    id: 2,
    title: "React Image Search",
    description: "An image search application built with React and external APIs. Features include search functionality, image galleries, and responsive design.",
    image: reactImageSearch,
    technologies: ["React", "API Integration", "CSS3", "JavaScript"],
    category: "Web Development",
    status: "Completed",
    liveUrl: "https://react-image-search.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/react-image-search",
    featured: false,
    year: "2024"
  },
  {
    id: 1,
    title: "Focus Frame",
    description: "A productivity application designed to help users focus and manage their time effectively. Features include timers, task management, and progress tracking.",
    image: focus,
    technologies: ["React", "JavaScript", "CSS3", "Local Storage"],
    category: "Productivity",
    status: "Completed",
    liveUrl: "https://focus-frame.vercel.app/",
    githubUrl: "https://github.com/zekirovskii/focus-frame",
    featured: false,
    year: "2024"
  }
]
