import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../../styles/colors";

export default function AccountBalance({ balance }) {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Config-Finance');
  };

  const formattedBalance = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(balance);
 
  return (
    <View
      style={styles.card}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Monto Actual</Text>
        <Text style={styles.balance}>${formattedBalance}</Text>
      </View>

      <TouchableOpacity
        style={styles.chartPlaceholder} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
      <Text style={styles.chartText}>
        <Ionicons name="settings-outline" size={18} color="#ffffffff" />
      </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    borderBottomRightRadius: 40,
    backgroundColor: colors.bg_head_f,
    padding: 18,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    fontWeight: "500",
  },
  balance: {
    fontSize: 36,
    fontWeight: "700",
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  chartPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: colors.bg_back_f,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#f0e4e4ff',
  },
  chartText: {
    fontSize: 24,
  },
});