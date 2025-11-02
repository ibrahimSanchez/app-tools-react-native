import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import { NotificationProvider } from './src/context/NotificationContext';
import Notification from './src/components/ui/Notification';
import { useEffect } from 'react';
import dbConnection from './src/database/db';

export default function App() {

  useEffect(() => {
    const init = async () => {
      try {
        await dbConnection.init();
      } catch (error) {
        console.log(error)
      }
    }

    init();
  }, [])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NotificationProvider>
        <AppNavigator />
        <Notification />
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
