import * as SQLite from 'expo-sqlite';
import { TABLES } from './schema/dbSchema';

class DatabaseService {
  constructor() {
    this.db = null;
  }

  async init() {
    try {
      this.db = await SQLite.openDatabaseAsync('tasks.db');
      await this.createTables();
      console.log('✅ Base de datos inicializada');
    } catch (error) {
      console.error('❌ Error al inicializar BD:', error);
      throw error;
    }
  }

  async createTables() {
    await this.db.execAsync(TABLES.TASKS);
    await this.db.execAsync(TABLES.BALANCE);
    await this.db.execAsync(TABLES.TRANSACTIONS);
  }

  async getAllAsync(query, params = []) {
    if (!this.db) throw new Error('DB no inicializada');
    return await this.db.getAllAsync(query, params);
  }

  async runAsync(query, params = []) {
    if (!this.db) throw new Error('DB no inicializada');
    return await this.db.runAsync(query, params);
  }

  async getFirstAsync(query, params = []) {
    if (!this.db) throw new Error('DB no inicializada');
    return await this.db.getFirstAsync(query, params);
  }

  async execAsync(query) {
    if (!this.db) throw new Error('DB no inicializada');
    return await this.db.execAsync(query);
  }
}

const dbConnection = new DatabaseService();
export default dbConnection;