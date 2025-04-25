import React from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { format } from 'date-fns'
import { useResolutions } from '../../context/ResolutionsContext'

const MilestoneItem = ({ milestone, resolutionId }) => {
  const { toggleMilestone } = useResolutions()
  
  const handleToggle = () => {
    toggleMilestone(resolutionId, milestone.id)
  }
  
  return (
    <motion.div 
      className={`flex items-start p-3 rounded-lg ${
        milestone.completed 
          ? 'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800' 
          : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      layout
    >
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 mt-0.5 ${
          milestone.completed 
            ? 'bg-success-500 border-success-500 text-white' 
            : 'border-slate-400 dark:border-slate-500'
        }`}
      >
        {milestone.completed && <FiCheck size={12} />}
      </button>
      
      <div className="flex-1">
        <p className={`text-sm ${
          milestone.completed 
            ? 'text-success-700 dark:text-success-300 line-through' 
            : 'text-slate-800 dark:text-slate-200'
        }`}>
          {milestone.title}
        </p>
        
        {milestone.completed && milestone.completedDate && (
          <p className="text-xs text-success-600 dark:text-success-400 mt-1">
            Completed on {format(new Date(milestone.completedDate), 'MMM d, yyyy')}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default MilestoneItem