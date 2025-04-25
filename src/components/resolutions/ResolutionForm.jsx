import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useResolutions } from '../../context/ResolutionsContext'

const ResolutionForm = ({ onComplete }) => {
  const { categories, addResolution } = useResolutions()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    deadline: '',
    priority: 'medium',
    milestones: [],
  })

  const [milestoneText, setMilestoneText] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const addMilestone = () => {
    if (!milestoneText.trim()) return
    
    const newMilestone = {
      id: Date.now(),
      title: milestoneText.trim(),
      completed: false,
    }
    
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }))
    
    setMilestoneText('')
  }

  const removeMilestone = (id) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(milestone => milestone.id !== id)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      addResolution({
        ...formData,
        categoryId: parseInt(formData.categoryId),
      })
      
      onComplete()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card"
    >
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Create New Resolution</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Title <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input w-full ${errors.title ? 'border-error-500 dark:border-error-500' : ''}`}
            placeholder="What do you want to achieve?"
          />
          {errors.title && <p className="mt-1 text-sm text-error-500">{errors.title}</p>}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="input w-full"
            placeholder="Describe your resolution..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Category <span className="text-error-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`select w-full ${errors.categoryId ? 'border-error-500 dark:border-error-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-error-500">{errors.categoryId}</p>}
          </div>
          
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Priority
          </label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map(priority => (
              <label key={priority} className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={handleChange}
                  className="checkbox"
                />
                <span className="ml-2 text-slate-700 dark:text-slate-300 capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Milestones
          </label>
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={milestoneText}
              onChange={(e) => setMilestoneText(e.target.value)}
              className="input flex-1"
              placeholder="Add a milestone..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
            />
            <button
              type="button"
              onClick={addMilestone}
              className="btn-secondary"
            >
              Add
            </button>
          </div>
          
          {formData.milestones.length > 0 && (
            <ul className="mt-3 space-y-2">
              {formData.milestones.map(milestone => (
                <li key={milestone.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-700 dark:text-slate-300">{milestone.title}</span>
                  <button
                    type="button"
                    onClick={() => removeMilestone(milestone.id)}
                    className="text-error-500 hover:text-error-600 dark:text-error-400 dark:hover:text-error-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 pt-2">
          <button
            type="button"
            onClick={onComplete}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Create Resolution
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default ResolutionForm