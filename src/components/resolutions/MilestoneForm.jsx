import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useResolutions } from '../../context/ResolutionsContext'

const MilestoneForm = ({ resolutionId, onComplete }) => {
  const { addMilestone } = useResolutions()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      setError('Please enter a milestone title')
      return
    }
    
    addMilestone(resolutionId, { title: title.trim() })
    onComplete()
  }
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mt-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-3"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Add New Milestone</h4>
        <button 
          type="button" 
          onClick={onComplete}
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
        >
          <FiX size={18} />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError('')
            }}
            className={`input w-full text-sm ${error ? 'border-error-500' : ''}`}
            placeholder="What's your milestone?"
          />
          {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onComplete}
            className="px-3 py-1.5 text-xs rounded-md bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-xs rounded-md bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            Add Milestone
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default MilestoneForm