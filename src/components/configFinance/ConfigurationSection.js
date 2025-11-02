import { useState } from 'react';
import { View, Text } from 'react-native';
import SetAmount from './SetAmount';
import IncreaseAmount from './IncreaseAmount';
import WithdrawAmount from './WithdrawAmount';
import colors from '../../styles/colors';
import { styles } from '../../styles/ConfigFinanceScreenCss';
import OptionButton from './OptionButton';
import { useNotification } from '../../context/NotificationContext';

const OPTIONS = {
  SET: 'set',
  INCREASE: 'increase',
  WITHDRAW: 'withdraw'
};

export default function ConfigurationSection({ currentAmount, defineBalance, enterBalance, withdrawBalance }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const { showNotification } = useNotification();

  const renderOptionContent = () => {
    switch (selectedOption) {
      case OPTIONS.SET:
        return <SetAmount currentAmount={currentAmount} onSubmit={handleSubmit} />;
      case OPTIONS.INCREASE:
        return <IncreaseAmount onSubmit={handleSubmit} />;
      case OPTIONS.WITHDRAW:
        return <WithdrawAmount onSubmit={handleSubmit} />;
      default:
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Selecciona una opción para configurar el monto
            </Text>
          </View>
        );
    }
  };

  const handleSubmit = async (data) => {
   
   try {
     switch (selectedOption) {
       case OPTIONS.SET:
        await defineBalance(data);
        break;
       case OPTIONS.INCREASE:
        await enterBalance(data);
        break;
       case OPTIONS.WITHDRAW:
        await withdrawBalance(data);
        break;
       default: 
         showNotification('La opción no es válida', 'error');
    }
   } catch (error) {
     showNotification('Error al realizar la operación', 'error');
     console.log('Error al realizar la operacion', error); 
   }

  };

  return (
    <View style={styles.container}>
     
      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <OptionButton
          title="Establecer"
          isSelected={selectedOption === OPTIONS.SET}
          onPress={() => setSelectedOption(OPTIONS.SET)}
          color={colors.bg_prim_f}
        />
        <OptionButton
          title="Aumentar"
          isSelected={selectedOption === OPTIONS.INCREASE}
          onPress={() => setSelectedOption(OPTIONS.INCREASE)}
          color={colors.bg_seco_f}
        />
        <OptionButton
          title="Retirar"
          isSelected={selectedOption === OPTIONS.WITHDRAW}
          onPress={() => setSelectedOption(OPTIONS.WITHDRAW)}
          color={colors.bg_terc_f}
        />
      </View>

      {/* Contenido dinámico */}
      <View style={styles.contentContainer}>
        {renderOptionContent()}
      </View>
    </View>
  );
}
