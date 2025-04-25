import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Initial state
const initialState = {
  resolutions: [],
  categories: [
    { id: 1, name: 'Health', color: 'bg-success-500' },
    { id: 2, name: 'Career', color: 'bg-primary-500' },
    { id: 3, name: 'Personal', color: 'bg-accent-500' },
    { id: 4, name: 'Finance', color: 'bg-emerald-500' },
    { id: 5, name: 'Relationships', color: 'bg-pink-500' },
  ],
  isLoading: false,
  error: null,
}

// Local storage key
const STORAGE_KEY = 'resolution-tracker-data'

// Actions
const ADD_RESOLUTION = 'ADD_RESOLUTION'
const UPDATE_RESOLUTION = 'UPDATE_RESOLUTION'
const DELETE_RESOLUTION = 'DELETE_RESOLUTION'
const TOGGLE_MILESTONE = 'TOGGLE_MILESTONE'
const ADD_MILESTONE = 'ADD_MILESTONE'
const LOAD_DATA = 'LOAD_DATA'

// Reducer
function resolutionsReducer(state, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload,
      }
    case ADD_RESOLUTION:
      return {
        ...state,
        resolutions: [...state.resolutions, action.payload],
      }
    case UPDATE_RESOLUTION:
      return {
        ...state,
        resolutions: state.resolutions.map(resolution =>
          resolution.id === action.payload.id ? action.payload : resolution
        ),
      }
    case DELETE_RESOLUTION:
      return {
        ...state,
        resolutions: state.resolutions.filter(
          resolution => resolution.id !== action.payload
        ),
      }
    case TOGGLE_MILESTONE:
      return {
        ...state,
        resolutions: state.resolutions.map(resolution => {
          if (resolution.id === action.payload.resolutionId) {
            return {
              ...resolution,
              milestones: resolution.milestones.map(milestone => {
                if (milestone.id === action.payload.milestoneId) {
                  return {
                    ...milestone,
                    completed: !milestone.completed,
                    completedDate: !milestone.completed ? new Date().toISOString() : null,
                  }
                }
                return milestone
              }),
            }
          }
          return resolution
        }),
      }
    case ADD_MILESTONE:
      return {
        ...state,
        resolutions: state.resolutions.map(resolution => {
          if (resolution.id === action.payload.resolutionId) {
            return {
              ...resolution,
              milestones: [...resolution.milestones, action.payload.milestone],
            }
          }
          return resolution
        }),
      }
    default:
      return state
  }
}

// Context
const ResolutionsContext = createContext()

// Provider
export function ResolutionsProvider({ children }) {
  const [state, dispatch] = useReducer(resolutionsReducer, initialState)

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: LOAD_DATA, payload: parsedData })
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      resolutions: state.resolutions,
      categories: state.categories,
    }))
  }, [state.resolutions, state.categories])

  // Action creators
  const addResolution = (resolution) => {
    dispatch({
      type: ADD_RESOLUTION,
      payload: {
        ...resolution,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        progress: 0,
      },
    })
  }

  const updateResolution = (resolution) => {
    dispatch({
      type: UPDATE_RESOLUTION,
      payload: resolution,
    })
  }

  const deleteResolution = (id) => {
    dispatch({
      type: DELETE_RESOLUTION,
      payload: id,
    })
  }

  const toggleMilestone = (resolutionId, milestoneId) => {
    dispatch({
      type: TOGGLE_MILESTONE,
      payload: { resolutionId, milestoneId },
    })
  }

  const addMilestone = (resolutionId, milestone) => {
    dispatch({
      type: ADD_MILESTONE,
      payload: {
        resolutionId,
        milestone: {
          ...milestone,
          id: Date.now(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      },
    })
  }

  const value = {
    resolutions: state.resolutions,
    categories: state.categories,
    isLoading: state.isLoading,
    error: state.error,
    addResolution,
    updateResolution,
    deleteResolution,
    toggleMilestone,
    addMilestone,
  }

  return (
    <ResolutionsContext.Provider value={value}>
      {children}
    </ResolutionsContext.Provider>
  )
}

export const useResolutions = () => {
  const context = useContext(ResolutionsContext)
  if (context === undefined) {
    throw new Error('useResolutions must be used within a ResolutionsProvider')
  }
  return context
}