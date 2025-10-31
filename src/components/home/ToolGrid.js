import { View, StyleSheet } from 'react-native';
import ToolCard from './ToolCard';

const TOOLS = [
  {
    id: 'tasks',
    title: 'Notas & Tareas',
    description: 'Organiza tus pendientes',
    icon: 'checkbox-outline',
    color: '#667eea',
    gradient: ['#667eea', '#764ba2'],
    route: 'Tasks',
  },
  {
    id: 'finances',
    title: 'Finanzas',
    description: 'Control de ingresos y gastos',
    icon: 'wallet-outline',
    color: '#f093fb',
    gradient: ['#f093fb', '#f5576c'],
    route: 'Finance',
  },
  {
    id: 'calendar',
    title: 'Calendario',
    description: 'Gestiona eventos y citas',
    icon: 'calendar-outline',
    color: '#4facfe',
    gradient: ['#4facfe', '#00f2fe'],
    route: null,
  },
  {
    id: 'habits',
    title: 'Hábitos',
    description: 'Construye rutinas positivas',
    icon: 'fitness-outline',
    color: '#43e97b',
    gradient: ['#43e97b', '#38f9d7'],
    route: null,
  },
  {
    id: 'notes',
    title: 'Notas Rápidas',
    description: 'Captura ideas al instante',
    icon: 'document-text-outline',
    color: '#fa709a',
    gradient: ['#fa709a', '#fee140'],
    route: null,
  },
  {
    id: 'goals',
    title: 'Metas',
    description: 'Define y alcanza objetivos',
    icon: 'trophy-outline',
    color: '#30cfd0',
    gradient: ['#30cfd0', '#330867'],
    route: null,
  },
];

export default function ToolGrid() {
  return (
    <View style={styles.container}>
      {TOOLS.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});