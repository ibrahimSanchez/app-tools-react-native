import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../../styles/colors";

export default function ConfigItem({ label, value, onChange, placeholder, iconName, type = 'primary' }) {
    
    const getTypeStyles = () => {
        switch (type) {
            case 'primary':
                return {
                    borderLeftColor: colors.bg_prim_f,
                    iconColor: colors.bg_prim_f,
                };
            case 'secondary':
                return {
                    borderLeftColor: colors.bg_seco_f,
                    iconColor: colors.bg_seco_f,
                };
            default:
                return {
                    borderLeftColor: colors.primary,
                    iconColor: colors.primary,
                };
        }
    };

    const typeStyles = getTypeStyles();

    return (
        <View style={[styles.container, { 
            backgroundColor: colors.card,
            borderLeftWidth: 4,
            borderLeftColor: typeStyles.borderLeftColor,
        }]}>
            {/* Header del item */}
            <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                    {iconName && (
                        <Ionicons 
                            name={iconName} 
                            size={20} 
                            color={typeStyles.iconColor} 
                            style={styles.icon}
                        />
                    )}
                    <Text style={[styles.label, { color: colors.textDark }]}>
                        {label}
                    </Text>
                </View>
                
                {/* Indicador de estado */}
                <View style={[
                    styles.statusIndicator,
                    { 
                        backgroundColor: value ? colors.success : '#f0f0f0',
                        borderColor: value ? colors.success : colors.textLight
                    }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: value ? 'white' : colors.textLight }
                    ]}>
                        {value ? '✓' : '!'}
                    </Text>
                </View>
            </View>

            {/* Input con mejor diseño */}
            <View style={styles.inputContainer}>
                <View style={[styles.currencyContainer, { backgroundColor: typeStyles.iconColor }]}>
                    <Text style={styles.currencyText}>$</Text>
                </View>
                <TextInput
                    style={[styles.input, { color: colors.textDark }]}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    selectionColor={typeStyles.iconColor}
                />
                
                {/* Botón de clear */}
                {value ? (
                    <TouchableOpacity 
                        style={styles.clearButton}
                        onPress={() => onChange('')}
                    >
                        <Ionicons name="close-circle" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Línea decorativa inferior */}
            <View style={[styles.bottomLine, { backgroundColor: typeStyles.iconColor }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        overflow: 'hidden',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    labelLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    },
    statusIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    currencyContainer: {
        paddingHorizontal: 15,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currencyText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 14,
        paddingHorizontal: 12,
        fontWeight: '500',
    },
    clearButton: {
        padding: 10,
    },
    bottomLine: {
        height: 2,
        marginTop: 15,
        borderRadius: 1,
        opacity: 0.6,
    },
});