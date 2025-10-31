import { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ActionModal = ({ visible, action, onClose, addTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animaciones de entrada y salida
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  // Manejar la altura del teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });
    
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = () => {

    addTransaction(amount, action?.type, description);
    console.log('Action:', action?.type);
    console.log('Amount:', amount);
    console.log('Description:', description);
    
    setAmount('');
    setDescription('');
    onClose();
  };

  if (!action) return null;

  const getModalTitle = () => {
    switch (action.type) {
      case 'ingreso': return 'Ingresar Dinero';
      case 'retiro': return 'Retirar Dinero';
      case 'transfer': return 'Transferir Dinero';
      case 'pay': return 'Pagar Servicio';
      case 'invest': return 'Invertir Fondos';
      default: return action.title;
    }
  };

  const getPlaceholderText = () => {
    switch (action.type) {
      case 'ingreso': return '0.00';
      case 'retiro': return '0.00';
      case 'transfer': return '0.00';
      case 'pay': return '0.00';
      case 'invest': return '0.00';
      default: return '0.00';
    }
  };

  const getActionDescription = () => {
    switch (action.type) {
      case 'ingreso': return 'Agrega fondos a tu cuenta de manera segura y rápida.';
      case 'retiro': return 'Retira fondos de tu cuenta a tu cuenta bancaria vinculada.';
      case 'transfer': return 'Envía dinero a otros usuarios o cuentas de forma instantánea.';
      case 'pay': return 'Paga tus servicios y facturas pendientes de manera conveniente.';
      case 'invest': return 'Invierte tus fondos en opciones de crecimiento a largo plazo.';
      default: return 'Completa los detalles para realizar esta operación.';
    }
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlayTouchable}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Animated.View 
                style={[
                  styles.modalContent,
                  {
                    transform: [{ translateY: slideAnim }],
                    marginBottom: keyboardHeight > 0 ? keyboardHeight * 0.1 : 0,
                  }
                ]}
              >
                <LinearGradient
                  colors={action.color}
                  style={styles.gradientContent}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {/* Header del Modal */}
                  <View style={styles.modalHeader}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.modalTitle}>{getModalTitle()}</Text>
                      <Text style={styles.modalSubtitle}>
                        {getActionDescription()}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      onPress={onClose} 
                      style={styles.closeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView 
                    style={styles.modalBody}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >

                    {/* Campo de monto - Más prominente */}
                    <View style={styles.amountSection}>
                      <Text style={styles.amountLabel}>Monto</Text>
                      <View style={styles.amountInputContainer}>
                        <Text style={styles.currencySymbol}>$</Text>
                        <TextInput
                          style={styles.amountInput}
                          placeholder={getPlaceholderText()}
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          keyboardType="decimal-pad"
                          value={amount}
                          onChangeText={setAmount}
                          autoFocus={true}
                          returnKeyType="next"
                          selectionColor="rgba(255,255,255,0.8)"
                        />
                      </View>
                      <Text style={styles.amountHint}>
                        Ingresa el monto en dólares
                      </Text>
                    </View>

                    {/* Campo de descripción */}
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Descripción (Opcional)</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Ej: Pago de servicios, Transferencia familiar..."
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={3}
                        returnKeyType="done"
                        selectionColor="rgba(255,255,255,0.8)"
                      />
                    </View>

                    {/* Campos adicionales según el tipo de acción */}
                    {action.type === 'transfer' && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Cuenta Destino</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Número de cuenta, email o teléfono"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          returnKeyType="next"
                          selectionColor="rgba(255,255,255,0.8)"
                        />
                      </View>
                    )}

                    {action.type === 'pay' && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Servicio a Pagar</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Selecciona el servicio o ingresa el nombre"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          returnKeyType="done"
                          selectionColor="rgba(255,255,255,0.8)"
                        />
                      </View>
                    )}

                    {action.type === 'invest' && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Tipo de Inversión</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Selecciona el tipo de inversión"
                          placeholderTextColor="rgba(255,255,255,0.5)"
                          returnKeyType="done"
                          selectionColor="rgba(255,255,255,0.8)"
                        />
                      </View>
                    )}

                    {/* Información adicional */}
                    <View style={styles.infoSection}>
                      <Text style={styles.infoTitle}>Resumen de la operación</Text>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Comisión:</Text>
                        <Text style={styles.infoValue}>$0.00</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total:</Text>
                        <Text style={styles.infoValue}>
                          ${amount ? (parseFloat(amount) || 0).toFixed(2) : '0.00'}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>

                  {/* Botones de acción */}
                  <View style={[
                    styles.modalFooter,
                    keyboardHeight > 0 && styles.modalFooterWithKeyboard
                  ]}>
                    <TouchableOpacity 
                      style={styles.cancelButton}
                      onPress={onClose}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.confirmButton,
                        !amount && styles.confirmButtonDisabled
                      ]}
                      onPress={handleSubmit}
                      activeOpacity={0.7}
                      disabled={!amount}
                    >
                      <LinearGradient
                        colors={amount ? ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'] : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                        style={styles.confirmGradient}
                      >
                        <Text style={[
                          styles.confirmButtonText,
                          !amount && styles.confirmButtonTextDisabled
                        ]}>
                          Confirmar {action.title}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  );
};




const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalOverlayTouchable: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.85, // 85% de la pantalla - mucho más grande
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  gradientContent: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 28,
  },
  modalBody: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 20,
  },
  actionInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  amountSection: {
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  currencySymbol: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
    paddingVertical: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  amountHint: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
    marginLeft: 4,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 10,
    fontSize: 16,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    minHeight: 60,
  },
  infoSection: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  modalFooterWithKeyboard: {
    paddingBottom: 34,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmGradient: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  confirmButtonTextDisabled: {
    color: 'rgba(255,255,255,0.7)',
  },
});

export default ActionModal;