import { useState } from "react";
import { View, StyleSheet } from "react-native"; 
import useFinance from "../../hooks/useFinance";

import Spinner from "../ui/Spinner";
import AccountBalance from "./AccountBalance";
import Actions from "./Actions";
import TransactionList from "./TransactionList";
import HiddenHistoryList from "./HiddenHistoryList";

export default function MainFinance(){

    const [showHistory, setShowHistory] = useState(false);

    const { 
      loading, 
      balance, 
      transactions,
      addTransaction,  
      deleteTransaction, 
      deleteAllTransactions,
    } = useFinance();

    if( loading ) return <Spinner />

    return (
        <View style={styles.container}> 
            <View style={styles.content}>
                <AccountBalance balance={balance} />
                <Actions 
                  addTransaction={addTransaction}
                  showHistory={showHistory}
                  setShowHistory={setShowHistory}
                />

                {showHistory ? (
                    <TransactionList 
                      deleteTransaction={deleteTransaction} 
                      transactions={transactions} 
                      deleteAllTransactions={deleteAllTransactions}
                    />
                  ) : (
                    <HiddenHistoryList />
                  )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, 
  },
});