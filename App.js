import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { NotificationProvider } from './src/context/NotificationContext';
import Notification from './src/components/ui/Notification';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NotificationProvider>
        <Notification />
        <AppNavigator />
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
