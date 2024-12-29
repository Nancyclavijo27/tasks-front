// src/components/TaskItem.js
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Importamos Framer Motion

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useTasks();
  const [showDescription, setShowDescription] = useState(false); // Estado para controlar la visibilidad de la descripción

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    console.log('Borrando tarea con id:', task._id);
    deleteTask(task._id);
  };

  const handleToggleDescription = () => {
    setShowDescription(!showDescription); // Muestra u oculta la descripción de la tarea
  };

  return (
    <motion.li
      className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg shadow-md bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className={`text-sm ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </p>
        {/* Botón para desplegar la descripción */}
        <button
          onClick={handleToggleDescription}
          className="text-sm text-blue-500 hover:underline mt-2"
        >
          {showDescription ? 'Hide Details' : 'Show Details'}
        </button>

        {/* Descripción de la tarea, con animación de Framer Motion */}
        {showDescription && (
          <motion.p
            className="text-sm text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {task.description || 'No description available.'}
          </motion.p>
        )}
      </div>
      <div className="flex space-x-3 items-center">
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors duration-300 
          ${task.completed ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {task.completed ? (
            <FaTimes className="mr-2" />
          ) : (
            <FaCheck className="mr-2" />
          )}
          {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium transition-colors duration-300"
        >
          <FaTimes className="mr-2" />
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;