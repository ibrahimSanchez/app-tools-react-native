import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import colors from "../../styles/colors";
import ActionModal from './ActionModal';

export default function Actions({ addTransaction, showHistory, setShowHistory }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [
    { 
      id: 1, 
      title: 'Ingresar', 
      color: [colors.bg_ingr_a, '#032b50ff'],
      type: 'ingreso'
    },
    { 
      id: 2, 
      title: 'Retirar', 
      color: ['#2a1949ff', colors.bg_reti_a],
      type: 'retiro'
    },
  ];

  const handleActionPress = (action) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAction(null);
  };

  const historyButtonText = showHistory ? 'Ocultar Historial' : 'Mostrar Historial';
  
  return (
    <View style={styles.container}>
      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <TouchableOpacity 
            key={action.id}
            onPress={() => handleActionPress(action)}
            style={styles.actionButton}
          >
            <LinearGradient
              colors={action.color}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.actionTitle}>{action.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}

      </View>
        <TouchableOpacity 
          style={[
              styles.historyButton, 
              showHistory ? styles.historyButtonActive : styles.historyButtonInactive
          ]} 
          onPress={() => setShowHistory(!showHistory)}
          activeOpacity={0.8}
        >
              <Text style={[
                styles.historyButtonText,
                showHistory ? styles.historyButtonTextActive : styles.historyButtonTextInactive
              ]}>
                {historyButtonText}
              </Text>
          </TouchableOpacity>

      <ActionModal 
        addTransaction={addTransaction}
        visible={modalVisible}
        action={selectedAction}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientButton: {
    width: '100%',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  historyButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    flexDirection: 'row',
  },
  historyButtonInactive: {
    backgroundColor: colors.bg_head_f + 'ef',
  },
  historyButtonActive: {
    backgroundColor: colors.bg_head_f + 'af',
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  historyButtonTextInactive: {
    color: '#e2e6ebff',
  },
  historyButtonTextActive: {
    color: '#FFFFFF',
  },
});