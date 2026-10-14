import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import './App.css'
import TaskApi from './components/TaskApi.jsx'
import { useTheme } from './contexts/useTheme.js'

import {
  Sun,
  Moon,
  CheckCircle2,
  Circle,
  CalendarDays,
  LayoutDashboard,
  Search,
  X,
} from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Revisar tareas pendientes', completed: true },
  { id: 2, title: 'Organizar actividades del día', completed: false },
  { id: 3, title: 'Avanzar el proyecto web', completed: false },
  { id: 4, title: 'Repasar React Hooks', completed: false },
]

const TaskItem = memo(function TaskItem({ task, onToggle }) {
  return (
    <div className="task-item">
      <button
        className="task-check"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? `Marcar ${task.title} como pendiente`
            : `Completar ${task.title}`
        }
      >
        {task.completed ? (
          <CheckCircle2 className="completed-icon" size={21} />
        ) : (
          <Circle className="pending-icon" size={21} />
        )}
      </button>

      <span className={task.completed ? 'task-done' : ''}>
        {task.title}
      </span>

      <span
        className={`task-status ${
          task.completed ? 'status-done' : 'status-pending'
        }`}
      >
        {task.completed ? 'Completada' : 'Pendiente'}
      </span>
    </div>
  )
})

function App() {
  const { theme, toggleTheme } = useTheme()

  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todas')

  const searchRef = useRef(null)

  const toggleTask = useCallback((id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }, [])

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(normalizedSearch)

      const matchesFilter =
        filter === 'todas' ||
        (filter === 'completadas' && task.completed) ||
        (filter === 'pendientes' && !task.completed)

      return matchesSearch && matchesFilter
    })
  }, [tasks, search, filter])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  const focusSearch = () => {
    searchRef.current?.focus()
  }

  const clearSearch = () => {
    setSearch('')
    searchRef.current?.focus()
  }

  return (
    <div className={`app ${theme}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <CheckCircle2 size={25} />
          </div>
          <span>TaskFlow</span>
        </div>

        <p className="nav-label">MENÚ PRINCIPAL</p>

        <div className="nav-item active">
          <LayoutDashboard size={19} />
          <span>Panel principal</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="welcome-label">
              TU ESPACIO DE ORGANIZACIÓN
            </p>
            <h1>¡Hola! Bienvenida a TaskFlow</h1>
            <p className="subtitle">
              Un pequeño paso cada día hace la diferencia.
            </p>
          </div>

          <button className="theme-button" onClick={toggleTheme}>
            {theme === 'claro' ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
            <span>
              {theme === 'claro' ? 'Modo oscuro' : 'Modo claro'}
            </span>
          </button>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <div className="stat-icon salmon">
              <LayoutDashboard size={22} />
            </div>
            <p>Total de tareas</p>
            <strong>{tasks.length}</strong>
          </article>

          <article className="stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={22} />
            </div>
            <p>Completadas</p>
            <strong>{completedCount}</strong>
          </article>

          <article className="stat-card">
            <div className="stat-icon purple">
              <Circle size={22} />
            </div>
            <p>Pendientes</p>
            <strong>{tasks.length - completedCount}</strong>
          </article>
        </div>

        <section className="task-card">
          <div className="section-heading">
            <div className="heading-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2>Mis tareas</h2>
              <p>Busca y organiza tus actividades</p>
            </div>
          </div>

          <div className="search-row">
            <div className="search-box">
              <Search size={19} />

              <input
                ref={searchRef}
                type="text"
                placeholder="Buscar una tarea..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Buscar tareas"
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={clearSearch}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <button className="focus-button" onClick={focusSearch}>
              Buscar
            </button>
          </div>

          <div className="filter-row">
            {[
              { value: 'todas', label: 'Todas' },
              { value: 'pendientes', label: 'Pendientes' },
              { value: 'completadas', label: 'Completadas' },
            ].map((option) => (
              <button
                key={option.value}
                className={`filter-button ${
                  filter === option.value ? 'selected' : ''
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="task-list">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                />
              ))
            ) : (
              <p className="empty-state">
                No se encontraron tareas.
              </p>
            )}
          </div>
        </section>
        
        <TaskApi />

        <footer className="footer">
          TaskFlow · Organiza tus tareas a tu ritmo.
        </footer>
      </main>
    </div>
  )
}

export default App