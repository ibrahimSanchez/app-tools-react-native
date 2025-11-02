import { useState } from 'react';
import { Text, View } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/ConfigFinanceScreenCss";
import AmountInput from "./AmountInput";
import ActionButton from "./ActionButton";

function SetAmount({ currentAmount, onSubmit }) {
  const [amount, setAmount] = useState(currentAmount || '0');

  const handleSubmit = () => {
    onSubmit(parseFloat(amount) || 0);
    setAmount('');
  };

  return (
    <View style={styles.amountContainer}>
      <Text style={styles.sectionTitle}>Establecer Monto Total</Text>
      <AmountInput
        value={amount}
        onChange={setAmount}
        placeholder="Ingresa el nuevo monto"
      />
      <ActionButton
        title="Establecer Monto"
        onPress={handleSubmit}
        color={colors.bg_prim_f}
        disabled={!amount}

      />
    </View>
  );
}

export default SetAmount;