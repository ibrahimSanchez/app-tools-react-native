import { useState, useMemo } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet 
} from "react-native";
import TransactionItem from "./TransactionItem"; 
import colors from "../../styles/colors"; 
import TransactionStats from "./TransactionStats";    
import TransactionFilters from "./TransactionFilters"; 


const TransactionList = ({ transactions = [], deleteTransaction }) => {
  const [filter, setFilter] = useState("todos");

  const stats = useMemo(() => {
    const safeTx = Array.isArray(transactions) ? transactions : [];

    const ingresos = safeTx.filter(tx => tx.type === "ingreso");
    const retiros = safeTx.filter(tx => tx.type === "retiro");

    const totalIngresos = ingresos.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const totalRetiros = retiros.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
    const balance = totalIngresos - totalRetiros;

    return {
      totalIngresos,
      totalRetiros,
      balance,
      countIngresos: ingresos.length,
      countRetiros: retiros.length
    };
  }, [transactions]);


  const filteredTransactions = useMemo(() => {
    if (filter === "todos") return transactions;
    return transactions.filter(tx => tx.type === filter);
  }, [transactions, filter]);


  const ListHeader = () => (
    <View>
        <TransactionStats stats={stats} colors={colors} />
        
        <TransactionFilters 
          filter={filter} 
          setFilter={setFilter} 
          colors={colors} 
        />

        <View style={styles.countContainer}>
            <Text style={styles.countText}>
            Mostrando {filteredTransactions.length} de {transactions.length} transacciones
            </Text>
        </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={deleteTransaction} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContentContainer}
        
        ListHeaderComponent={ListHeader} 

        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyTextMain}>
              No hay transacciones {filter !== "todos" ? `de ${filter}` : ""}
            </Text>
            <Text style={styles.listEmptyTextSub}>
              {filter === "todos" 
                ? "Agrega tu primera transacción" 
                : `No hay transacciones de ${filter === "ingreso" ? "ingresos" : "retiros"}`
              }
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default TransactionList;


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  listContentContainer: {
    paddingHorizontal: 16, 
    paddingBottom: 20
  },
  countContainer: { 
    paddingHorizontal: 20, 
    marginBottom: 8 
  },
  countText: { 
    fontSize: 12, 
    color: colors.textLight 
  },
  listEmptyContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 60,
    padding: 20 
  },
  listEmptyTextMain: { 
    fontSize: 16, 
    color: colors.textLight, 
    textAlign: "center",
    marginBottom: 8 
  },
  listEmptyTextSub: { 
    fontSize: 14, 
    color: colors.textLight,
    textAlign: "center" 
  },
});