import { Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/ConfigFinanceScreenCss";

const OptionButton = ({ title, isSelected, onPress, color }) => (
  <TouchableOpacity
    style={[
      styles.optionButton,
      { backgroundColor: color },
      isSelected && styles.optionButtonSelected
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.optionText,
      isSelected && styles.optionTextSelected
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default OptionButton;
