
import { useReducer, useCallback, useEffect } from 'react'

const initialTasks = [
  { id: 1, title: 'Revisar tareas pendientes', completed: true },
  { id: 2, title: 'Organizar actividades del día', completed: false },
  { id: 3, title: 'Avanzar el proyecto web', completed: false },
  { id: 4, title: 'Repasar React Hooks', completed: false },
]

function createInitialState() {
  let tasks = initialTasks

  try {
    const saved = localStorage.getItem('taskflow-tasks')

    if (saved !== null) {
      const parsed = JSON.parse(saved)

      if (
        Array.isArray(parsed) &&
        parsed.every(
          (task) =>
            task !== null &&
            typeof task.id === 'number' &&
            typeof task.title === 'string' &&
            typeof task.completed === 'boolean'
        )
      ) {
        tasks = parsed
      }
    }
  } catch (error) {
    console.error('No se pudieron recuperar las tareas:', error)
  }

  return {
    tasks,
    filter: 'todas',
    sort: 'asc',
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      }

    case 'TOGGLE':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      }

    case 'REMOVE':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      }

    case 'SET_FILTER':
      return { ...state, filter: action.filter }

    case 'SET_SORT':
      return { ...state, sort: action.sort }

    default:
      return state
  }
}

export function useTasksReducer() {
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    createInitialState
  )

  // Sincroniza la lista cuando cambia el estado de las tareas.
  useEffect(() => {
    try {
      localStorage.setItem(
        'taskflow-tasks',
        JSON.stringify(state.tasks)
      )
    } catch (error) {
      console.error('No se pudieron guardar las tareas:', error)
    }
  }, [state.tasks])

  const addTask = useCallback((title) => {
    const cleanTitle = title.trim()
    if (!cleanTitle) return

    dispatch({
      type: 'ADD',
      task: {
        id: Date.now(),
        title: cleanTitle,
        completed: false,
      },
    })
  }, [])

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id })
  }, [])

  const removeTask = useCallback((id) => {
    dispatch({ type: 'REMOVE', id })
  }, [])

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', filter })
  }, [])

  const toggleSort = useCallback(() => {
    dispatch({
      type: 'SET_SORT',
      sort: state.sort === 'asc' ? 'desc' : 'asc',
    })
  }, [state.sort])

  return {
    ...state,
    addTask,
    toggleTask,
    removeTask,
    setFilter,
    toggleSort,
  }
}
