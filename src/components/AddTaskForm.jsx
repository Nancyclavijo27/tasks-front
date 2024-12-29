// src/components/AddTaskForm.js
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';  // Importar el contexto


const AddTaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ title: '', description: '' });
  const { addTask } = useTasks();  // Acceder a la función addTask desde el contexto

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) {
      alert('El título de la tarea es obligatorio');
      return;
    }
    addTask(task);
    setTask({ title: '', description: '' }); // Limpiar formulario
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Título de la tarea"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Descripción (opcional)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
