import dbConnection from '../db';

class TaskService {
  constructor() {
    this.tableName = 'tasks';
  }

  // Obtener todas las tareas
  async getAllTasks() {
    try {
      const result = await dbConnection.db.getAllAsync('SELECT * FROM tasks ORDER BY created_at DESC');
      return result.map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed === 1,
        createdAt: task.created_at,
        updatedAt: task.updated_at
      }));
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      return [];
    }
  }

  // Agregar nueva tarea
  async addTask(title) {
    try {
      const result = await dbConnection.db.runAsync(
        'INSERT INTO tasks (title, completed) VALUES (?, ?)',
        [title, 0]
      );
      
      return {
        id: result.lastInsertRowId,
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      throw error;
    }
  }

  // Actualizar estado de tarea
  async toggleTask(id) {
    try {
      await dbConnection.db.runAsync(
        'UPDATE tasks SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      return false;
    }
  }

  // Eliminar tarea
  async deleteTask(id) {
    try {
      await dbConnection.db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      return false;
    }
  }

  // Limpiar tareas completadas
  async clearCompleted() {
    try {
      await dbConnection.db.runAsync('DELETE FROM tasks WHERE completed = 1');
      return true;
    } catch (error) {
      console.error('Error al limpiar completadas:', error);
      return false;
    }
  }

  // Actualizar título de tarea
  async updateTaskTitle(id, newTitle) {
    try {
      await dbConnection.db.runAsync(
        'UPDATE tasks SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [newTitle, id]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar título:', error);
      return false;
    }
  }
}

const taskService = new TaskService();
export default taskService;