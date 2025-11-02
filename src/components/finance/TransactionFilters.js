import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from "../../styles/colors"; 

const FilterButton = ({ label, value, isActive, setFilter }) => (
  <TouchableOpacity 
    onPress={() => setFilter(value)}
    style={[
      styles.filterButton,
      isActive ? styles.filterButtonActive : styles.filterButtonInactive
    ]}
  >
    <Text style={[
      styles.filterButtonText,
      isActive ? styles.filterButtonTextActive : styles.filterButtonTextInactive
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const TransactionFilters = ({ filter, setFilter }) => {
  return (
    <View style={styles.filtersContainer}>
        <FilterButton label="Todos" value="todos" isActive={filter === "todos"} setFilter={setFilter} />
        <FilterButton label="Ingresos" value="ingreso" isActive={filter === "ingreso"} setFilter={setFilter} />
        <FilterButton label="Retiros" value="retiro" isActive={filter === "retiro"} setFilter={setFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
    filtersContainer: {
        flexDirection: "row",
        marginHorizontal: 0, 
        marginVertical: 12,
    },
    filterButton: {
        flex: 1,
        marginHorizontal: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    filterButtonActive: {
        backgroundColor: colors.bg_prim_f + 'a0',
        borderColor: colors.bg_prim_f,
    },
    filterButtonInactive: {
        backgroundColor: colors.card,
        borderColor: colors.bg_prim_f,
    },
    filterButtonText: { 
        fontSize: 14,
    },
    filterButtonTextActive: { 
        fontWeight: "bold",
        color: colors.card,
    },
    filterButtonTextInactive: { 
        fontWeight: "600",
        color: colors.textDark,
    },
});

export default TransactionFilters;