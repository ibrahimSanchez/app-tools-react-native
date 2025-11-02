import { useCallback, useState } from "react";
import balanceService from "../database/services/BalanceService";
import transactionService from "../database/services/TransactionService";
import { useNotification } from "../context/NotificationContext";
import { useFocusEffect } from "@react-navigation/native";

const useFinance = () => {

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showNotification } = useNotification();
  
  useFocusEffect(
    useCallback(() => {
      initializeData();
    }, [])
  );

  const initializeData = async () => { 
    try { 
      await balanceService.init(); 
      await loadFinanceData(); 
    } catch (error) { 
      showNotification("Error al inicializar finanzas", "error"); 
      console.error("Error al inicializar finanzas:", error); 
    } finally {
      setLoading(false); 
    } 
  };

  const loadFinanceData = async () => {
    try {
      setLoading(true);
      const currentBalance = await balanceService.getBalance();
      const allTransactions = await transactionService.getAllTransactions();
      
      setBalance(currentBalance);
      setTransactions(allTransactions);
    } catch (error) {
      showNotification("Error al cargr datos", "error");
      console.log('Error al cargr datos')
    } 
    finally {
      setLoading(false);
    }
  };

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

  const defineBalance = async(amount) => {
    if(amount < 0) {
      showNotification("El monto no es válido", "error");
      return false;
    }

    try {
      await balanceService.defineBalance(amount);

      const updatedBalance = await balanceService.getBalance();
      setBalance(updatedBalance);
      
      showNotification("Monto actualizado", "success");
      return true;
    } catch (error) {
      showNotification("Error al actualizar monto", "error");
      console.error("Error al actualizar monto:", error);
      return false;
    }
  }

  const enterBalance = async(amount) => {

    if(amount < 0) {
      showNotification("El monto no es válido", "error");
      return false;
    }

    try {
      await balanceService.updateBalance(amount);

      const updatedBalance = await balanceService.getBalance();
      setBalance(updatedBalance);
      
      showNotification("Monto actualizado", "success");
      return true;
    } catch (error) {
      showNotification("Error al actualizar monto", "error");
      console.error("Error al actualizar monto:", error);
      return false;
    }
  }

  const withdrawBalance = async(amount) => {

    if(amount < 0) {
      showNotification("El monto no es válido", "error");
      return false;
    }
    if(amount > balance) {
      showNotification("Monto insuficiente para retiro", "error");
      return false;
    }

    try {
      await balanceService.updateBalance(-amount);

      const updatedBalance = await balanceService.getBalance();
      setBalance(updatedBalance);
      
      showNotification("Monto actualizado", "success");
      return true;
    } catch (error) {
      showNotification("Error al actualizar monto", "error");
      console.error("Error al actualizar monto:", error);
      return false;
    }
  }

  const deleteAllTransactions = async () => {
    try {
      await transactionService.deleteAllTransactions();
      await loadFinanceData();
    } catch (error) {
      showNotification("Error al eliminar el historial", "error");
      console.error("Error al eliminar el historial:", error);
    }
  }


  return {
    balance,
    transactions,
    loading,

    addTransaction,
    deleteTransaction,
    defineBalance,
    enterBalance,
    withdrawBalance,
    deleteAllTransactions,

    refreshFinance: loadFinanceData
  };
};

export default useFinance;
