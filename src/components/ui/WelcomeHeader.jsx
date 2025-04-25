import React from 'react'
import { motion } from 'framer-motion'

const WelcomeHeader = ({ date }) => {
  // Get appropriate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }
  
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
          {getGreeting()}, User
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          {date}
        </p>
      </div>
      
      <motion.div 
        className="hidden md:block glass-card px-6 py-3 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-slate-700 dark:text-slate-300 text-sm">
          "Small steps every day lead to massive results over time."
        </p>
      </motion.div>
    </motion.div>
  )
}

export default WelcomeHeader