# TaskFlow - Dashboard de gestión de tareas

## 1. Descripción del proyecto

TaskFlow es una aplicación web desarrollada con React y Vite que permite gestionar actividades mediante un dashboard interactivo. Su objetivo es aplicar los React Hooks para administrar estados, compartir preferencias, controlar efectos secundarios y reutilizar lógica entre componentes.

### Funcionalidades principales

- Registrar nuevas tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Filtrar tareas por estado.
- Buscar actividades.
- Ordenar las tareas alfabéticamente.
- Cambiar entre tema claro y oscuro.
- Guardar información en localStorage.
- Consultar tareas desde una API externa.

## 2. Tecnologías utilizadas

- React: construcción de interfaces mediante componentes.
- Vite: entorno de desarrollo y herramienta de compilación.
- JavaScript: implementación de la lógica de la aplicación.
- CSS: diseño y estilos visuales.
- Lucide React: iconos de la interfaz.
- localStorage: almacenamiento local de información.
- React Developer Tools: inspección de componentes y análisis de renderizado.

## 3. Estructura del proyecto

El proyecto se organiza en componentes, contextos y hooks personalizados para separar responsabilidades y facilitar el mantenimiento.

taskflow/
├── src/
│   ├── components/
│   │   └── TaskApi.jsx
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   ├── theme-context.js
│   │   └── useTheme.js
│   ├── hooks/
│   │   ├── useTasksReducer.js
│   │   ├── useLocalStorage.js
│   │   └── useFetch.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md


## 4. Diagrama de flujo del estado y ciclo de renderizado

El flujo comienza con una interacción del usuario. Las acciones relacionadas con las tareas se procesan mediante useReducer, produciendo un nuevo estado. React actualiza la interfaz y ejecuta los efectos correspondientes. Los cálculos derivados pueden utilizar useMemo, mientras que useContext permite compartir las preferencias del tema.


flowchart TD
    A[Interacción del usuario] --> B[App.jsx]
    B --> C[useReducer]
    C --> D[Procesamiento de acciones]
    D --> E[Actualización del estado]
    E --> F[Filtrado y ordenamiento con useMemo]
    F --> G[Renderizado de la interfaz]
    E --> H[useEffect]
    H --> I[Sincronización con localStorage]
    B --> J[useContext]
    J --> K[Preferencias del tema]
    B --> L[Hooks personalizados]
    L --> M[Almacenamiento y consulta de datos]

## 5. Justificación técnica de los React Hooks

### 5.1. useState

Se utiliza para manejar estados locales de la interfaz, como el texto de búsqueda y los campos del formulario. Permite actualizar la interfaz cuando cambia el valor almacenado.

### 5.2. useReducer

Centraliza las operaciones relacionadas con las tareas, como agregar, completar, eliminar, filtrar y ordenar. Resulta apropiado cuando existen varias acciones que modifican un mismo estado complejo, ya que reúne las transiciones en una función reducer.

### 5.3. useContext

Permite compartir las preferencias del tema claro y oscuro entre los componentes que necesitan acceder a ellas, evitando pasar propiedades manualmente por varios niveles.

### 5.4. useEffect

Se utiliza para sincronizar datos con localStorage y gestionar efectos secundarios, como las solicitudes a una API. Sus dependencias determinan cuándo debe ejecutarse y su función de limpieza permite liberar o cancelar recursos cuando corresponde.

### 5.5. useMemo

Permite memorizar resultados de cálculos, como el filtrado y ordenamiento de las tareas. Los valores se recalculan cuando cambian sus dependencias, evitando repetir cálculos innecesarios en otros renderizados.

### 5.6. useCallback

Permite conservar la referencia de una función mientras sus dependencias no cambien. Puede ser útil cuando se pasan funciones a componentes hijos optimizados, aunque su beneficio depende del uso que se haga de esas funciones.

### 5.7. useRef

Permite conservar una referencia a un elemento del DOM, por ejemplo, un campo de entrada al que se desea asignar el foco. Cambiar una referencia no provoca por sí mismo un nuevo renderizado.

### 5.8. Hooks personalizados

**useLocalStorage:** encapsula la lectura y escritura de información en el almacenamiento local para reutilizar esta funcionalidad.

**useFetch:** encapsula la consulta a una API y puede administrar estados de carga, resultados, errores y cancelación de solicitudes, según su implementación.

### 5.9. ¿Por qué no utilizar solamente useState?

useState es adecuado para estados locales sencillos. Sin embargo, gestionar todas las acciones de las tareas mediante múltiples estados independientes puede dispersar la lógica de actualización. Por ello, useReducer centraliza las transiciones del estado, useContext comparte información y useEffect administra efectos secundarios. Los demás Hooks cubren necesidades específicas de cálculo, referencias y reutilización.

## 6. Ejecución del proyecto

Para instalar las dependencias, ejecutar la aplicación y comprobar el código, se utilizan los siguientes comandos desde la carpeta del proyecto:

```bash
npm install
npm run dev
npm run lint
npm run build
```

- `npm install`: instala las dependencias del proyecto.
- `npm run dev`: inicia el servidor de desarrollo.
- `npm run lint`: ejecuta la revisión estática configurada con ESLint.
- `npm run build`: genera la versión de producción.

## 7. Validación final

### 7.1. Ejecución y ESLint

Se verificará que la aplicación se ejecute correctamente y que ESLint finalice sin errores ni advertencias. Se incluirán capturas de la aplicación y de la terminal con los resultados obtenidos.

### 7.2. React Developer Tools Profiler

Se registrará una interacción con la aplicación, como agregar o completar una tarea. Se identificarán los componentes que se renderizan y se analizarán los commits registrados. Las conclusiones se basarán en los resultados observados durante la prueba.

### 7.3. Cleanup de useEffect

Se comprobará la función de limpieza de los efectos que administran recursos, especialmente la cancelación de solicitudes HTTP mediante AbortController, si está implementada en el hook de consulta.

### 7.4. Evidencias

Se incorporarán capturas de pantalla que documenten la estructura del proyecto, el funcionamiento del dashboard, la gestión de tareas, el cambio de tema, la persistencia de datos, la revisión de ESLint, el análisis con Profiler y la implementación del cleanup.

## 8. Conclusiones

El desarrollo de TaskFlow permite aplicar React Hooks para administrar estados, compartir preferencias, sincronizar datos y organizar la lógica de una aplicación web. La separación en componentes y hooks personalizados favorece la reutilización y el mantenimiento del código.

Las pruebas de ejecución, ESLint y React Developer Tools permiten revisar el funcionamiento y la calidad de la implementación. Las conclusiones definitivas sobre el rendimiento se establecerán a partir de las mediciones realizadas con Profiler.

## 9. Repositorio

**GitHub:** https://github.com/Cm-byte/PracticaSemana7.git 
