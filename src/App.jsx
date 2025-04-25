import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Dashboard from './components/pages/Dashboard'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme to html tag
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        <Header />
        <main className="container mx-auto px-4 py-8 lg:px-8">
          <Dashboard />
        </main>
        <footer className="bg-white dark:bg-slate-800 py-6 mt-12">
          <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Resolution Tracker. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}

export default App