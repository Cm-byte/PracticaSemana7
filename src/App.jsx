import { memo, useCallback, useMemo, useRef, useState } from 'react'
import {
  Sun, Moon, CheckCircle2, Circle, CalendarDays,
  LayoutDashboard, Search, X, Plus, Trash2, ArrowUpDown,
} from 'lucide-react'
import { useTheme } from './contexts/useTheme.js'
import { useTasksReducer } from './hooks/useTasksReducer.js'
import TaskApi from './components/TaskApi.jsx'
import './App.css'

const TaskItem = memo(function TaskItem({ task, onToggle, onRemove }) {
  return (
    <div className="task-row">
      <button
        className="icon-button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Marcar pendiente' : 'Completar tarea'}
      >
        {task.completed
          ? <CheckCircle2 className="completed-icon" size={21} />
          : <Circle className="pending-icon" size={21} />}
      </button>

      <span className={`task-title ${task.completed ? 'task-done' : ''}`}>
        {task.title}
      </span>

      <span className={`status ${task.completed ? 'done' : 'pending'}`}>
        {task.completed ? 'Completada' : 'Pendiente'}
      </span>

      <button
        className="icon-button delete-button"
        onClick={() => onRemove(task.id)}
        aria-label={`Eliminar ${task.title}`}
      >
        <Trash2 size={17} />
      </button>
    </div>
  )
})

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const {
    tasks, filter, sort, addTask, toggleTask,
    removeTask, setFilter, toggleSort,
  } = useTasksReducer()

  const [search, setSearch] = useState('')
  const [newTask, setNewTask] = useState('')
  const searchRef = useRef(null)
  const newTaskRef = useRef(null)


  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase()

    return tasks
      .filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(query)
        const matchesFilter =
          filter === 'todas' ||
          (filter === 'pendientes' && !task.completed) ||
          (filter === 'completadas' && task.completed)

        return matchesSearch && matchesFilter
      })
      .sort((a, b) =>
        sort === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
  }, [tasks, search, filter, sort])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  )

  const focusSearch = useCallback(() => {
    searchRef.current?.focus()
  }, [])

  const clearSearch = useCallback(() => {
    setSearch('')
    searchRef.current?.focus()
  }, [])

  const handleAddTask = useCallback((event) => {
    event.preventDefault()
    if (!newTask.trim()) return
    addTask(newTask)
    setNewTask('')
    newTaskRef.current?.focus()
  }, [addTask, newTask])

  return (
    <div className={`app ${theme}`}>
      <aside className="sidebar">
        <div className="brand">
          <CheckCircle2 size={27} />
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
            <p className="welcome-label">TU ESPACIO DE ORGANIZACIÓN</p>
            <h1>¡Hola! Bienvenida a TaskFlow</h1>
            <p className="subtitle">Un pequeño paso cada día hace la diferencia.</p>
          </div>

          <button className="theme-button" onClick={toggleTheme}>
            {theme === 'claro' ? <Moon size={19} /> : <Sun size={19} />}
            {theme === 'claro' ? 'Modo oscuro' : 'Modo claro'}
          </button>
        </header>

        <div className="stats-grid">
          <article className="stat-card">
            <LayoutDashboard size={22} />
            <p>Total de tareas</p>
            <strong>{tasks.length}</strong>
          </article>
          <article className="stat-card">
            <CheckCircle2 size={22} />
            <p>Completadas</p>
            <strong>{completedCount}</strong>
          </article>
          <article className="stat-card">
            <Circle size={22} />
            <p>Pendientes</p>
            <strong>{tasks.length - completedCount}</strong>
          </article>
        </div>

        <section className="card">
          <div className="section-heading">
            <CalendarDays size={22} />
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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar una tarea..."
                aria-label="Buscar tareas"
              />
              {search && (
                <button className="icon-button" onClick={clearSearch} aria-label="Limpiar búsqueda">
                  <X size={17} />
                </button>
              )}
            </div>
            <button className="secondary-button" onClick={focusSearch}>Buscar</button>
          </div>

          <form className="add-task-form" onSubmit={handleAddTask}>
            <input
              ref={newTaskRef}
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Escribe una nueva tarea..."
              aria-label="Nueva tarea"
            />
            <button type="submit" className="primary-button">
              <Plus size={18} /> Agregar
            </button>
          </form>

          <div className="filter-row">
            {[
              { value: 'todas', label: 'Todas' },
              { value: 'pendientes', label: 'Pendientes' },
              { value: 'completadas', label: 'Completadas' },
            ].map((option) => (
              <button
                key={option.value}
                className={`filter-button ${filter === option.value ? 'selected' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}

            <button className="secondary-button sort-button" onClick={toggleSort}>
              <ArrowUpDown size={17} /> {sort === 'asc' ? 'A - Z' : 'Z - A'}
            </button>
          </div>

          <div className="task-list">
            {filteredTasks.length ? filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onRemove={removeTask}
              />
            )) : <p className="empty-state">No se encontraron tareas.</p>}
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
