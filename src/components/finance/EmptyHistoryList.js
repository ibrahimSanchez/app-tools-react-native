import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";

export default function EmptyHistoryList() {
    return (
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="history" size={50} color="#6B7280" />
                </View>
                <Text style={styles.title}>
                    Historial vacío
                </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        padding: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 60,
        backgroundColor: colors.card_e,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        color: '#374151',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
});