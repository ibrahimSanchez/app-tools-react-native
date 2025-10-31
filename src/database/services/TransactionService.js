import dbConnection from '../db';
import balanceService from './BalanceService';

class TransactionService {
  constructor() {
    this.tableName = 'transactions';
  }

  async init() {
    await dbConnection.init();
    await balanceService.init(); // Asegurar que balance existe
  }

  // Registrar una transacción (ingreso o retiro)
  async addTransaction(amount, type, description = '') {
    try {
      if (type !== 'ingreso' && type !== 'retiro') {
        throw new Error('Tipo inválido. Debe ser "ingreso" o "retiro".');
      }

      const signedAmount = type === 'ingreso' ? amount : -amount;

      // Guardar transacción
      const result = await dbConnection.db.runAsync(
        `
        INSERT INTO transactions (amount, type, description)
        VALUES (?, ?, ?)
        `,
        [amount, type, description]
      );

      // Actualizar balance automáticamente
      await balanceService.updateBalance(signedAmount);

      return {
        id: result.lastInsertRowId,
        amount,
        type,
        description,
        date: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error al registrar transacción:', error);
      throw error;
    }
  }

  // Todas las transacciones ordenadas por fecha
  async getAllTransactions() {
    try {
      const result = await dbConnection.db.getAllAsync(
        `SELECT * FROM transactions ORDER BY date DESC`
      );

      return result.map(tx => ({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        description: tx.description,
        date: tx.date
      }));
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      return [];
    }
  }

  // Filtrar por tipo (ingreso/retiro)
  async getTransactionsByType(type) {
    try {
      const result = await dbConnection.db.getAllAsync(
        `SELECT * FROM transactions WHERE type = ? ORDER BY date DESC`,
        [type]
      );

      return result.map(tx => ({
        id: tx.id,
        amount: tx.amount,
        type: tx.type,
        description: tx.description,
        date: tx.date
      }));
    } catch (error) {
      console.error('Error al obtener transacciones por tipo:', error);
      return [];
    }
  }

  // Eliminar una transacción y revertir su impacto en el balance
  async deleteTransaction(id) {
    try {
      // Obtener transacción previa
      const tx = await dbConnection.db.getFirstAsync(
        'SELECT * FROM transactions WHERE id = ?',
        [id]
      );

      if (!tx) return false;

      const delta =
        tx.type === 'ingreso'
          ? -tx.amount
          : tx.amount; // revertir ingreso o retiro

      // Eliminar transacción
      await dbConnection.db.runAsync('DELETE FROM transactions WHERE id = ?', [id]);

      // Revertir balance
      await balanceService.updateBalance(delta);

      return true;
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
      return false;
    }
  }
}

const transactionService = new TransactionService();
export default transactionService;
