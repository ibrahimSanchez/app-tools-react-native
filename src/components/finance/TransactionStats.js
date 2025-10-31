import { View, Text, StyleSheet } from 'react-native';
import colors from "../../styles/colors"; 

const TransactionStats = ({ stats }) => {
  return (
    <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
        <Text style={styles.statsTitle}>
            Balance Total
        </Text>
        
        <Text style={[styles.statsDetailValue, { color: colors.bg_ingr_a }]}>
        +${Number(stats.totalIngresos || 0).toFixed(2)}
        </Text>

        </View>
        
        <View style={styles.statsDetailRow}>
        <View style={styles.statsDetailItem}>
            <Text style={styles.statsDetailLabel}>Ingresos</Text>
            <Text style={[styles.statsDetailValue, { color: colors.bg_ingr_a }]}>
            +${stats.totalIngresos.toFixed(2)}
            </Text>
        </View>
        <View style={styles.statsDetailItem}>
            <Text style={styles.statsDetailLabel}>Retiros</Text>
            <Text style={[styles.statsDetailValue, { color: colors.bg_reti_a }]}>
            -${stats.totalRetiros.toFixed(2)}
            </Text>
        </View>
        <View style={styles.statsDetailItem}>
            <Text style={styles.statsDetailLabel}>Total</Text>
            <Text style={[styles.statsDetailValue, { color: colors.textDark }]}>
            {stats.countIngresos + stats.countRetiros}
            </Text>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    statsContainer: {
        backgroundColor: colors.card,
        marginHorizontal: 0, 
        marginTop: 16,
        marginBottom: 8,
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statsRow: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginBottom: 8 
    },
    statsTitle: {
        fontSize: 16, 
        fontWeight: "600", 
        color: colors.textDark
    },
    balanceText: { 
        fontSize: 16, 
        fontWeight: "bold", 
    },
    statsDetailRow: { 
        flexDirection: "row", 
        justifyContent: "space-between" 
    },
    statsDetailItem: { 
        alignItems: "center" 
    },
    statsDetailLabel: { 
        fontSize: 12, 
        color: colors.textLight 
    },
    statsDetailValue: { 
        fontSize: 14, 
        fontWeight: "600" 
    },
});

export default TransactionStats;