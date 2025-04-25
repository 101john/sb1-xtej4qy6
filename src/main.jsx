import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ResolutionsProvider } from './context/ResolutionsContext'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ResolutionsProvider>
        <App />
      </ResolutionsProvider>
    </ThemeProvider>
  </React.StrictMode>
)