import { View, StyleSheet } from "react-native"; 
import useFinance from "../../hooks/useFinance";

import Spinner from "../ui/Spinner";
import AccountBalance from "./AccountBalance";
import Actions from "./Actions";
import TransactionList from "./TransactionList";

export default function MainFinance(){

    const { 
      loading, 
      balance, 
      addTransaction,  
      deleteTransaction, 
      transactions,
    } = useFinance();

    if( loading ) return <Spinner />

    return (
        <View style={styles.container}> 
            <View style={styles.content}>
                <AccountBalance balance={balance} />
                <Actions addTransaction={addTransaction} />
                <TransactionList deleteTransaction={deleteTransaction} transactions={transactions} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16, 
    flex: 1, 
  },
});