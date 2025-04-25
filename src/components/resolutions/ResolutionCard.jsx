import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { format } from 'date-fns'
import { FiCheckCircle, FiClock, FiEdit2, FiTrash, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useResolutions } from '../../context/ResolutionsContext'
import MilestoneItem from './MilestoneItem'
import MilestoneForm from './MilestoneForm'

const ResolutionCard = ({ resolution }) => {
  const { categories, deleteResolution } = useResolutions()
  const [expanded, setExpanded] = useState(false)
  const [showAddMilestone, setShowAddMilestone] = useState(false)

  // Calculate progress
  const calculateProgress = () => {
    if (!resolution.milestones || resolution.milestones.length === 0) {
      return 0
    }
    
    const completedCount = resolution.milestones.filter(milestone => milestone.completed).length
    return Math.round((completedCount / resolution.milestones.length) * 100)
  }

  const progress = calculateProgress()
  
  // Find category
  const category = categories.find(cat => cat.id === resolution.categoryId)

  // Format dates
  const formattedDeadline = resolution.deadline ? format(new Date(resolution.deadline), 'MMM d, yyyy') : 'No deadline'
  const formattedCreatedAt = format(new Date(resolution.createdAt), 'MMM d, yyyy')

  // Determine status and color
  let statusBadge
  let progressColor

  if (progress === 100) {
    statusBadge = <span className="badge-green">Completed</span>
    progressColor = '#10b981' // success-500
  } else if (progress > 0) {
    statusBadge = <span className="badge-blue">In Progress</span>
    progressColor = '#3b82f6' // primary-500
  } else {
    statusBadge = <span className="badge-yellow">Not Started</span>
    progressColor = '#f59e0b' // amber-500
  }

  return (
    <motion.div 
      className="card hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className={`w-2 h-2 rounded-full ${category ? category.color : 'bg-slate-500'}`}></div>
        <div className="flex space-x-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400"
          >
            <FiEdit2 size={18} />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="text-slate-500 hover:text-error-500 dark:text-slate-400 dark:hover:text-error-400"
            onClick={() => deleteResolution(resolution.id)}
          >
            <FiTrash size={18} />
          </motion.button>
        </div>
      </div>

      <div className="flex mt-4 space-x-4">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textSize: '24px',
              pathColor: progressColor,
              textColor: progressColor,
              trailColor: '#e2e8f0',
            })}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{resolution.title}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {statusBadge}
            <span className="badge bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              {category ? category.name : 'Uncategorized'}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-slate-600 dark:text-slate-400 line-clamp-2">{resolution.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center">
          <FiClock className="mr-1" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center">
          <FiClock className="mr-1" />
          <span>Deadline: {formattedDeadline}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button 
          className="flex items-center justify-between w-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Milestones ({resolution.milestones?.length || 0})</span>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {expanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-3"
          >
            {resolution.milestones && resolution.milestones.length > 0 ? (
              <div className="space-y-2">
                {resolution.milestones.map(milestone => (
                  <MilestoneItem 
                    key={milestone.id} 
                    milestone={milestone} 
                    resolutionId={resolution.id} 
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">No milestones yet.</p>
            )}

            {showAddMilestone ? (
              <MilestoneForm 
                resolutionId={resolution.id} 
                onComplete={() => setShowAddMilestone(false)} 
              />
            ) : (
              <button 
                onClick={() => setShowAddMilestone(true)}
                className="flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mt-2"
              >
                <FiPlus className="mr-1" /> Add Milestone
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ResolutionCard