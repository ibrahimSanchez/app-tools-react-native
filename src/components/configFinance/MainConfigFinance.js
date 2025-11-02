import { useNavigation } from "@react-navigation/native";
import ConfigHeader from './ConfigHeader';
import { View } from "react-native";
import colors from "../../styles/colors";
import useFinance from "../../hooks/useFinance";
import ConfigurationSection from "./ConfigurationSection";


export default function MainConfigFinance() {

    const { balance, defineBalance, enterBalance, withdrawBalance } = useFinance();

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ConfigHeader 
                title="Configurar Finanzas" 
                onBack={() => navigation.goBack()} 
                balance={balance}
            />
            <ConfigurationSection 
                currentAmount={balance} 
                defineBalance={defineBalance}
                enterBalance={enterBalance}
                withdrawBalance={withdrawBalance}
            />
        </View>
    );
}