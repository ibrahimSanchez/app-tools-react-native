import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";

const TransactionItem = ({ item, onDelete }) => {
  const isIngreso = item.type === "ingreso";
  
  const handleDelete = () => {
    Alert.alert(
      "Eliminar Transacción",
      `¿Estás seguro de que quieres eliminar este ${isIngreso ? "ingreso" : "retiro"}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: () => onDelete(item.id)
        }
      ]
    );
  };

  const containerStyle = [
    styles.container,
    { 
      borderLeftColor: isIngreso ? colors.bg_ingr_a : colors.bg_reti_a,
    }
  ];

  const typeChipStyle = [
    styles.typeChip,
    {
      backgroundColor: isIngreso ? colors.bg_ingr_a + "20" : colors.bg_reti_a + "20",
    }
  ];

  const typeTextStyle = [
    styles.typeText,
    {
      color: isIngreso ? colors.bg_ingr_a : colors.bg_reti_a,
    }
  ];

  const amountTextStyle = [
    styles.amountText,
    {
      color: isIngreso ? colors.bg_ingr_a : colors.bg_reti_a,
    }
  ];


  return (
    <View style={containerStyle}>
      
      <View style={styles.headerRow}>
        <View style={typeChipStyle}>
          <Text style={typeTextStyle}>
            {isIngreso ? "Ingreso" : "Retiro"}
          </Text>
        </View>

        <Text style={amountTextStyle}>
          {isIngreso ? "+" : "-"}${Number(item.amount || 0).toFixed(2)}
        </Text>
      </View>

      {item.description ? (
        <Text style={styles.descriptionText}>
          {item.description}
        </Text>
      ) : null}

      <View style={styles.footerRow}>
        <Text style={styles.dateText}>
          {item.date}
        </Text>

        <TouchableOpacity 
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>
            <MaterialIcons name="delete-outline" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4, 
  },
  headerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start",
    marginBottom: 8 
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: { 
    fontWeight: "600", 
    fontSize: 12,
    textTransform: "uppercase",
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionText: { 
    fontSize: 15, 
    color: colors.textDark,
    marginBottom: 8,
    lineHeight: 20 
  },
  footerRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  dateText: { 
    fontSize: 13, 
    color: colors.textLight,
    fontStyle: "italic"
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: colors.danger + "20",
    borderRadius: 100,
  },
  deleteButtonText: { 
    fontSize: 12, 
    fontWeight: "600",
    color: colors.danger 
  },
});

export default TransactionItem;