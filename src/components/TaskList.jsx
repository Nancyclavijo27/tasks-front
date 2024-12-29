import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem'; // Importa TaskItem

const TaskList = () => {
  const { filteredTasks, loading, error } = useTasks(); // Obtén filteredTasks desde el contexto

  // Muestra el estado de carga
  if (loading) {
    return <p className="text-center text-xl text-gray-500">Loading tasks...</p>;
  }

  // Muestra un error si ocurre
  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  // Verifica si filteredTasks es un array antes de intentar mostrar las tareas
  if (!Array.isArray(filteredTasks)) {
    return <p className="text-center text-xl text-red-500">Error: filteredTasks is not an array</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-xl text-gray-600">No tasks available</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} /> // Usa TaskItem para cada tarea
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
