import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ConfigHeader from './ConfigHeader';
import ConfigList from "./ConfigList";
import { View } from "react-native";
import colors from "../../styles/colors";
import useFinance from "../../hooks/useFinance";


export default function MainConfigFinance() {

    const {  } = useFinance();

    const navigation = useNavigation();
    const [monthlyAmount, setMonthlyAmount] = useState("");
    const [savingGoal, setSavingGoal] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ConfigHeader 
                title="Configurar Finanzas" 
                onBack={() => navigation.goBack()} 
            />
            <ConfigList 
                monthlyAmount={monthlyAmount} 
                setMonthlyAmount={setMonthlyAmount}
                savingGoal={savingGoal}
                setSavingGoal={setSavingGoal}
            />
        </View>
    );
}