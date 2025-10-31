import { FlatList, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TaskItem from "./TaskItem";
import colors from "../../styles/colors";

export default function TaskList({ tasks, onToggle, onRemove }) {

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={64} color={colors.textLight} />
      </View>
      <Text style={styles.emptyTitle}>No hay tareas</Text>
      <Text style={styles.emptySubtitle}>
        Agrega tu primera tarea para comenzar
      </Text>
    </View>
  );

  if (tasks.length === 0) {
    return renderEmpty();
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        
        return (
            <TaskItem 
              task={item} 
              onToggle={onToggle} 
              onRemove={onRemove} 
            />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textDark,
    marginLeft: 8,
  },
  badge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  divider: {
    marginTop: 16,
  },
});