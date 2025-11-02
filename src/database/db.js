import * as SQLite from 'expo-sqlite';
import { TABLES } from './schema/dbSchema';

class DatabaseService {
  constructor() {
    this.db = null;
    this.initializing = false;  // evita doble inicialización si dos llamadas ocurren al mismo tiempo
  }

  async ensureInitialized() {
    if (this.db) return; // ya inicializada

    if (this.initializing) {
      console.log("⏳ Esperando a que la BD termine de inicializarse...");
      // Esperar hasta que this.db deje de ser null
      await new Promise(resolve => {
        const check = () => {
          if (this.db) resolve();
          else setTimeout(check, 50);
        };
        check();
      });
      return;
    }

    // Si llegamos aquí, iniciamos el proceso
    console.log("⚠️ La BD no estaba inicializada, inicializando ahora...");
    this.initializing = true;
    await this.init();
    this.initializing = false;
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
    await this.ensureInitialized();
    return await this.db.getAllAsync(query, params);
  }

  async runAsync(query, params = []) {
    await this.ensureInitialized();
    return await this.db.runAsync(query, params);
  }

  async getFirstAsync(query, params = []) {
    await this.ensureInitialized();
    return await this.db.getFirstAsync(query, params);
  }

  async execAsync(query) {
    await this.ensureInitialized();
    return await this.db.execAsync(query);
  }
}

const dbConnection = new DatabaseService();
export default dbConnection;
