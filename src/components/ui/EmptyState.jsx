import React from 'react'
import { motion } from 'framer-motion'
import { FiClipboard } from 'react-icons/fi'

const EmptyState = ({ title, description, action, actionLabel }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center p-10 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
        <FiClipboard className="w-8 h-8 text-primary-600 dark:text-primary-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
        {description}
      </p>
      
      {action && (
        <motion.button
          onClick={action}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {actionLabel || 'Get Started'}
        </motion.button>
      )}
    </motion.div>
  )
}

export default EmptyState