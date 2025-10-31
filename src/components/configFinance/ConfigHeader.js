import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../../styles/colors";

export default function ConfigHeader({ title, onBack }) {
    return (
        <View style={[styles.header, { backgroundColor: colors.bg_prim_f }]}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconContainer}>
                <Ionicons name="settings-outline" size={20} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    iconContainer: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 10,
    },
});