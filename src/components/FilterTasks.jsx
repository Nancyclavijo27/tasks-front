// src/components/FilterTasks.js
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const FilterTasks = () => {
  const { tasks, setFilteredTasks } = useTasks();
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  // Filtrar tareas
  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);

    let filteredTasks;
    switch (filterOption) {
      case 'completed':
        filteredTasks = tasks.filter((task) => task.completed);
        break;
      case 'pending':
        filteredTasks = tasks.filter((task) => !task.completed);
        break;
      default:
        filteredTasks = tasks;
    }

    setFilteredTasks(filteredTasks); // Actualizar las tareas filtradas
  };

  return (
    <div className="filter-container">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => handleFilterChange('all')}
      >
        All Tasks
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
        onClick={() => handleFilterChange('pending')}
      >
        Pending
      </button>
    </div>
  );
};

export default FilterTasks;
