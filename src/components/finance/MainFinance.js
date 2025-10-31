import { ScrollView, StyleSheet, View } from "react-native";
import useFinance from "../../hooks/useFinance";

import Spinner from "../ui/Spinner";
import AccountBalance from "./AccountBalance";
import Actions from "./Actions";

export default function MainFinance(){

    const { loading, balance } = useFinance();

    if( loading ) return <Spinner />

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <AccountBalance balance={balance} />
                <Actions />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
});