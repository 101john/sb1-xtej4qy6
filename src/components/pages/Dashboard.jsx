import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import WelcomeHeader from '../ui/WelcomeHeader'
import ResolutionCard from '../resolutions/ResolutionCard'
import ResolutionForm from '../resolutions/ResolutionForm'
import ProgressSummary from '../stats/ProgressSummary'
import EmptyState from '../ui/EmptyState'
import { useResolutions } from '../../context/ResolutionsContext'

const Dashboard = () => {
  const { resolutions } = useResolutions()
  const [showAddForm, setShowAddForm] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  // Get current date information
  const currentDate = new Date()
  const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy')

  // Calculate summary statistics
  const totalResolutions = resolutions.length
  const completedResolutions = resolutions.filter(resolution => 
    resolution.milestones && 
    resolution.milestones.length > 0 && 
    resolution.milestones.every(milestone => milestone.completed)
  ).length
  
  const inProgressResolutions = resolutions.filter(resolution => 
    resolution.milestones && 
    resolution.milestones.length > 0 && 
    resolution.milestones.some(milestone => milestone.completed) &&
    resolution.milestones.some(milestone => !milestone.completed)
  ).length

  const notStartedResolutions = totalResolutions - completedResolutions - inProgressResolutions

  return (
    <div className="space-y-8">
      <WelcomeHeader date={formattedDate} />
      
      <section id="dashboard" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Your Dashboard</h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn-primary"
          >
            {showAddForm ? 'Cancel' : 'Add New Resolution'}
          </motion.button>
        </div>

        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ResolutionForm onComplete={() => setShowAddForm(false)} />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressSummary 
            total={totalResolutions} 
            completed={completedResolutions} 
            inProgress={inProgressResolutions} 
            notStarted={notStartedResolutions} 
          />
        </div>
      </section>
      
      <section id="resolutions" className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Your Resolutions</h2>
        
        {resolutions.length === 0 ? (
          <EmptyState 
            title="No resolutions yet" 
            description="Start by adding your first resolution to track your progress."
            action={() => setShowAddForm(true)}
            actionLabel="Add Your First Resolution"
          />
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {resolutions.map(resolution => (
              <motion.div key={resolution.id} variants={itemVariants}>
                <ResolutionCard resolution={resolution} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <section id="stats" className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Statistics</h2>
        {/* Additional statistics would go here */}
      </section>
    </div>
  )
}

export default Dashboard