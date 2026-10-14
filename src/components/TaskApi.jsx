
import useFetch from '../hooks/useFetch.js'

function TaskApi() {
  const {
    data: tasks,
    loading,
    error,
  } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5'
  )

  const taskNames = {
    'delectus aut autem': 'Completar tareas pendientes',
    'quis ut nam facilis et officia qui': 'Organizar actividades',
    'fugiat veniam minus': 'Revisar tareas del día',
    'et porro tempora': 'Actualizar lista de tareas',
    'laboriosam mollitia et enim quasi adipisci quia provident illum':
      'Preparar actividades nuevas',
  }

  if (loading) {
    return (
      <section className="task-card api-card">
        <h2>Tareas de ejemplo de la API</h2>
        <p>Cargando tareas...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="task-card api-card">
        <h2>Tareas de ejemplo de la API</h2>
        <p>No se pudieron cargar las tareas: {error}</p>
      </section>
    )
  }

  return (
    <section className="task-card api-card">
      <div className="api-header">
        <div>
          <h2>Tareas de ejemplo de la API</h2>
          <p>Datos obtenidos desde JSONPlaceholder</p>
        </div>

        <span className="api-count">
          {tasks.length} tareas
        </span>
      </div>

      <div className="api-task-list">
        {tasks.map((task) => (
          <div className="api-task-item" key={task.id}>
            <span className="api-task-title">
              {taskNames[task.title] || task.title}
            </span>

            <span
              className={`task-status ${
                task.completed
                  ? 'status-done'
                  : 'status-pending'
              }`}
            >
              {task.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TaskApi
