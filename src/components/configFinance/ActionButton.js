import { Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import { styles } from "../../styles/ConfigFinanceScreenCss";

const ActionButton = ({ title, onPress, color = colors.primary, disabled = true }) => {
  const realColor = disabled ? color + '4f' : color;
  return (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: realColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  )
};

export default ActionButton