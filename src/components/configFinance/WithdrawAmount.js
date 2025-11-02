import { useState } from "react";
import { View, Text } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/ConfigFinanceScreenCss";
import AmountInput from "./AmountInput";
import ActionButton from "./ActionButton";

function WithdrawAmount({ onSubmit }) {
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleSubmit = () => {
    onSubmit(parseFloat(withdrawAmount) || 0);
    setWithdrawAmount(0);
  };

  return (
    <View style={styles.amountContainer}>
      <Text style={styles.sectionTitle}>Retirar Monto</Text>
      <AmountInput
        value={withdrawAmount}
        onChange={setWithdrawAmount}
        placeholder="Ingresa la cantidad a retirar"
      />
      <ActionButton
        title="Retirar Monto"
        onPress={handleSubmit}
        color={colors.bg_terc_f}
        disabled={!withdrawAmount.length}
      />
    </View>
  );
}

export default WithdrawAmount;