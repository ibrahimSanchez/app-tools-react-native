import dbConnection from '../db';

class BalanceService {
  constructor() {
    this.tableName = 'balance';
  }

  async init() {
    // Asegurar que existe un registro inicial
    await dbConnection.db.runAsync(`
      INSERT INTO balance (id, amount)
      SELECT 1, 0
      WHERE NOT EXISTS (SELECT 1 FROM balance WHERE id = 1);
    `);
  }

  // Obtener el balance actual
  async getBalance() {
    try {
      const result = await dbConnection.db.getFirstAsync('SELECT amount FROM balance WHERE id = 1');
      return result?.amount ?? 0;
    } catch (error) {
      console.error('Error al obtener balance:', error);
      return 0;
    }
  }

  // Actualizar balance (valor absoluto)
  async defineBalance(amount) {
    try {
      await dbConnection.db.runAsync(
        'UPDATE balance SET amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1',
        [amount]
      );
      return true;
    } catch (error) {
      console.error('Error al actualizar balance:', error);
      return false;
    }
  }

  // Modificar balance sumando o restando
  async updateBalance(deltaAmount) {
    try {
      await dbConnection.db.runAsync(
        `
        UPDATE balance 
        SET amount = amount + ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
        `,
        [deltaAmount]
      );
      return true;
    } catch (error) {
      console.error('Error al modificar balance:', error);
      return false;
    }
  }
}

const balanceService = new BalanceService();
export default balanceService;
