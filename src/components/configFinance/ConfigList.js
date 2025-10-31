import { View, StyleSheet, Text } from "react-native";
import ConfigItem from "./ConfigItem";
import colors from "../../styles/colors";

export default function ConfigList({ monthlyAmount, setMonthlyAmount, savingGoal, setSavingGoal }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: colors.textDark }]}>
                Configuración Financiera
            </Text>
            
            <ConfigItem
                label="Monto Mensual"
                value={monthlyAmount}
                onChange={setMonthlyAmount}
                placeholder="Ej: 1500.00"
                iconName="calendar-outline"
                type="primary"
            />
            
            <ConfigItem
                label="Meta de Ahorro"
                value={savingGoal}
                onChange={setSavingGoal}
                placeholder="Ej: 5000.00"
                iconName="trophy-outline"
                type="secondary"
            />
            
            {/* Información adicional */}
            <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.infoText, { color: colors.textLight }]}>
                    💡 Establece tus metas financieras para un mejor control de tus gastos e ingresos.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoCard: {
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#FF9500',
    },
    infoText: {
        fontSize: 14,
        lineHeight: 20,
        fontStyle: 'italic',
    },
});