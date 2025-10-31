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

export default function Actions({ addTransaction }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [
    { 
      id: 1, 
      title: 'Ingresar', 
      icon: '💰', 
      color: [colors.bg_ingr_a, '#032b50ff'],
      type: 'ingreso'
    },
    { 
      id: 2, 
      title: 'Retirar', 
      icon: '💸', 
      color: [colors.bg_reti_a, '#2a1949ff'],
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
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

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
    marginVertical: 16,
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
    height: 100,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});