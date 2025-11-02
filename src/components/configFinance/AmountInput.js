import { Text, TextInput, View } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/ConfigFinanceScreenCss";

const AmountInput = ({ label = '', value, onChange, placeholder, keyboardType = 'numeric' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={colors.textLight}
    />
  </View>
);

export default AmountInput;