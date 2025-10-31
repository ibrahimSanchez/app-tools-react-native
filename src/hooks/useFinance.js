import { useEffect, useState } from "react";
import balanceService from "../database/services/BalanceService";
import transactionService from "../database/services/TransactionService";
import { useNotification } from "../context/NotificationContext";

const useFinance = () => {

  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showNotification } = useNotification();
  
  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = async () => {
    try {
      await balanceService.init();
      await transactionService.init();
      await loadFinanceData();
    } catch (error) {
      showNotification("Error al inicializar finanzas", "error");
      console.error("Error al inicializar finanzas:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFinanceData = async () => {
    const currentBalance = await balanceService.getBalance();
    const allTransactions = await transactionService.getAllTransactions();

    setBalance(currentBalance);
    setTransactions(allTransactions);
  };

  // ✅ Agregar transacción (ingreso o retiro)
  const addTransaction = async (amount, type, description = "") => {
    try {
      const newTx = await transactionService.addTransaction(amount, type, description);

      // Actualizar UI
      setTransactions(prev => [newTx, ...prev]);

      // Actualizar balance en la UI
      const updatedBalance = await balanceService.getBalance();
      setBalance(updatedBalance);
      showNotification("Transacción exitosa", "success");
      
      return newTx;
    } catch (error) {
      showNotification("Error al agregar transacción", "error");
      console.error("Error al agregar transacción:", error);
      throw error;
    }
  };

  // ✅ Eliminar transacción
  const deleteTransaction = async (id) => {
    try {
      await transactionService.deleteTransaction(id);

      // Actualizar UI
      setTransactions(prev => prev.filter(tx => tx.id !== id));

      // Actualizar balance
      const updatedBalance = await balanceService.getBalance();
      setBalance(updatedBalance);
      
      showNotification("Transacción eliminada", "success");
      return true;
    } catch (error) {
      showNotification("Error al eliminar transacción", "error");
      console.error("Error al eliminar transacción:", error);
      return false;
    }
  };

  return {
    balance,
    transactions,
    loading,

    addTransaction,
    deleteTransaction,

    refreshFinance: loadFinanceData
  };
};

export default useFinance;
