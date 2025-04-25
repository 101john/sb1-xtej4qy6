import React from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiClock, FiAlertCircle, FiTarget } from 'react-icons/fi'

const ProgressSummary = ({ total, completed, inProgress, notStarted }) => {
  const stats = [
    {
      title: 'Total',
      value: total,
      icon: <FiTarget className="text-primary-500" size={24} />,
      color: 'bg-primary-50 dark:bg-primary-900/20',
      textColor: 'text-primary-700 dark:text-primary-300',
      borderColor: 'border-primary-200 dark:border-primary-800',
    },
    {
      title: 'Completed',
      value: completed,
      icon: <FiCheckCircle className="text-success-500" size={24} />,
      color: 'bg-success-50 dark:bg-success-900/20',
      textColor: 'text-success-700 dark:text-success-300',
      borderColor: 'border-success-200 dark:border-success-800',
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: <FiClock className="text-accent-500" size={24} />,
      color: 'bg-accent-50 dark:bg-accent-900/20',
      textColor: 'text-amber-700 dark:text-amber-300',
      borderColor: 'border-accent-200 dark:border-accent-800',
    },
    {
      title: 'Not Started',
      value: notStarted,
      icon: <FiAlertCircle className="text-slate-500" size={24} />,
      color: 'bg-slate-50 dark:bg-slate-800/50',
      textColor: 'text-slate-700 dark:text-slate-300',
      borderColor: 'border-slate-200 dark:border-slate-700',
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-xl border ${stat.borderColor} ${stat.color}`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm">
              {stat.icon}
            </div>
            <div>
              <h3 className={`font-medium ${stat.textColor}`}>{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default ProgressSummary