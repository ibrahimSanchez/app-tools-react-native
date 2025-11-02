import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

export default function ConfigHeader({ title, onBack, balance }) {

    const formattedBalance = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(balance);

    return (
        <View style={[styles.header, { backgroundColor: colors.bg_head_f }]}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                
                <Text style={styles.title}>{title}</Text>
                
                <View style={styles.iconContainer}>
                    <SimpleLineIcons name="wallet" size={20} color="white" />
                </View>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.label}>Monto Actual: ${formattedBalance}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomRightRadius: 40,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    iconContainer: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
    },
    amountContainer: {
        alignItems: 'center', 
    },
    label: {
        fontSize: 16,
        backgroundColor: '#4b9668c0',
        color: '#533530c4',
        fontWeight: "800",
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignSelf: 'center',
    },
});