import { useState } from "react";
import { Text, View } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/ConfigFinanceScreenCss";
import AmountInput from "./AmountInput";
import ActionButton from "./ActionButton";

export default function IncreaseAmount({ onSubmit }) {
  const [increaseAmount, setIncreaseAmount] = useState('');

  const handleSubmit = () => {
    onSubmit(parseFloat(increaseAmount) || 0);
    setIncreaseAmount(0);
  };
 
  return (
    <View style={styles.amountContainer}>
      <Text style={styles.sectionTitle}>Aumentar Monto</Text>
      <AmountInput
        value={increaseAmount}
        onChange={setIncreaseAmount}
        placeholder="Ingresa la cantidad a aumentar"
      />
      <ActionButton
        disabled={!increaseAmount.length}
        title="Aumentar Monto"
        onPress={handleSubmit}
        color={colors.bg_seco_f}
      />
    </View>
  );
}

