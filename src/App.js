// src/App.js

import React, { useState } from 'react';
import './App.css';
import { TaskProvider } from './context/TaskContext'; // Importa el proveedor de contexto
import FilterTasks from './components/FilterTasks'; // Importa el componente de filtro
import TaskList from './components/TaskList'; // Importa el componente de lista de tareas
import AddTaskForm from './components/AddTaskForm'; // Si tienes un formulario para agregar tareas

function App() {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas

  // Función para agregar una tarea
  const handleAddTask = (task) => {
    setTasks([...tasks, task]); // Agrega la nueva tarea al estado
  };

  return (
    <TaskProvider>
      <div className="App max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Task Manager</h1>
        </header>
        <main>
          {/* Componente para agregar nuevas tareas */}
          <AddTaskForm  onAddTask={handleAddTask}  />

          {/* Componente de filtrado de tareas */}
          <FilterTasks />

          {/* Lista de tareas */}
          <TaskList tasks={tasks} />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
