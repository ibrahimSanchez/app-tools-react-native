import { useState, useEffect } from 'react';
import taskService from '../database/services/TaskService';

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await taskService.init();
      await loadTasks();
    } catch (error) {
      console.error('Error al inicializar:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    const allTasks = await taskService.getAllTasks();
    setTasks(allTasks);
  };

  const addTask = async (title) => {
    try {
      const newTask = await taskService.addTask(title);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await taskService.toggleTask(id);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const updateTask = async (id, newTitle) => {
    try {
      await taskService.updateTaskTitle(id, newTitle);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const clearCompleted = async () => {
    try {
      await taskService.clearCompleted();
      setTasks(prev => prev.filter(task => !task.completed));
    } catch (error) {
      console.error('Error al limpiar completadas:', error);
    }
  };

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    removeTask,
    updateTask,
    clearCompleted,
    refreshTasks: loadTasks
  };
}