// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';  // Asegúrate de importar la instancia de axios configurada en api.js

// Crear el contexto
const TaskContext = createContext();

// Componente proveedor del contexto
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Estado para tareas filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks'); // Realiza la solicitud GET a /tasks
      setTasks(response.data);  // Guarda las tareas en el estado
      setFilteredTasks(response.data); // Inicializa las tareas filtradas con todas las tareas
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Error fetching tasks'); // Guarda el error en el estado si hay un fallo
    } finally {
      setLoading(false);  // Cambia el estado de carga
    }
  };

  // Función para agregar una tarea
  const addTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);  // Solicitud POST
      //console.log('Tarea creada:', response.data);  // Ver la respuesta de la API
      
      // Verifica si la respuesta tiene éxito (código 201 es común para creación)
      if (response.status === 201) {
        // Actualiza el estado agregando la nueva tarea
        const newTasks = [...tasks, response.data];
        setTasks(prevTasks => [...prevTasks, response.data]); 
        setFilteredTasks(newTasks);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Error adding task');  // Mostrar mensaje de error
    }
  };
  
  // Función para actualizar una tarea
  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData); // Realiza la solicitud PUT
      const updatedTasks = tasks.map((task) =>
        task._id === id ? response.data : task
      );
      setTasks(updatedTasks); // Actualiza la lista de tareas
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Error updating task');
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`); // Realiza la solicitud DELETE
      //console.log(`Tarea ${id} eliminada correctamente`);
      const updatedTasks = tasks.filter((task) => task._id !== id);
      setTasks(tasks.filter((task) => task._id !== id)); // Elimina la tarea del estado
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Error deleting task');
    }
  };

  // Llamada a la API para obtener las tareas al cargar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks, // Exporta también las tareas filtradas
        setFilteredTasks, // Exporta la función para actualizar las tareas filtradas
        loading,
        error,
        addTask,  // Asegúrate de incluir addTask aquí
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook para acceder al contexto
export const useTasks = () => useContext(TaskContext);
