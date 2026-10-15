
import useFetch from '../hooks/useFetch.js'

const translations = {
  'delectus aut autem': 'Revisar las tareas pendientes',
  'quis ut nam facilis et officia qui': 'Organizar las actividades del día',
  'fugiat veniam minus': 'Completar las actividades programadas',
  'et porro tempora': 'Revisar las actividades completadas',
  'laboriosam mollitia et enim quasi adipisci quia provident illum':
    'Avanzar con el proyecto de desarrollo web',
}

export default function TaskApi() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=5'
  )

  return (
    <section className="card api-card">
      <div className="section-heading">
        <div>
          <h2>Tareas de ejemplo de la API</h2>
          <p>Datos externos obtenidos con useFetch</p>
        </div>
      </div>

      {loading && <p role="status">Cargando tareas...</p>}

      {error && <p role="alert">No se pudieron cargar las tareas.</p>}

      {!loading && !error && (
        <div className="api-list">
          {data.map((task) => (
            <div className="api-task" key={task.id}>
              <span>
                {translations[task.title] ?? task.title}
              </span>

              <span
                className={`status ${
                  task.completed ? 'done' : 'pending'
                }`}
              >
                {task.completed ? 'Completada' : 'Pendiente'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
