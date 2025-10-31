import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

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
    <LinearGradient
      colors={[colors.bg_prim_f, colors.bg_seco_f, colors.bg_terc_f]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <Text style={styles.label}>Current Balance</Text>
        <Text style={styles.balance}>${formattedBalance}</Text>
        <View style={styles.balanceChange}>
          <Text style={styles.changeText}>+2.5% from last month</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.chartPlaceholder} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.chartText}>
          <SimpleLineIcons name="wallet" size={18} color="#ffffffff" />
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    marginVertical: 8,
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
  balanceChange: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    backdropFilter: 'blur(10px)',
  },
  changeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: "600",
  },
  chartPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#7a231dff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#f0e4e4ff',
  },
  chartText: {
    fontSize: 24,
  },
});