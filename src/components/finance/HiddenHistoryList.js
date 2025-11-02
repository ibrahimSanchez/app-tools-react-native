import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../styles/colors";

export default function HiddenHistoryList() {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="visibility-off" size={80} color="#6B7280" />
                </View>
                <Text style={styles.title}>
                    Historial oculto
                </Text>
                <Text style={styles.description}>
                    El historial está actualmente oculto. 
                    Presiona el botón de mostrar para ver tus registros nuevamente.
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    card: {
        height: 320,
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
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.card_e,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: '#374151',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        color: '#6B7280',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 22,
    }
});