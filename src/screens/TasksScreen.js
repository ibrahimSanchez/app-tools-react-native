import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Easing, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../hooks/useTasks";

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const { tasks, loading, addTask, toggleTask, removeTask, clearCompleted } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await addTask(newTask);
      setNewTask("");
      
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Cargando tareas...</Text>
      </View>
    );
  }

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedCount / tasks.length) * 100) 
    : 0;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        
        {/* Header con gradiente */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <View style={styles.titleRow}>
                <Ionicons name="checkbox-outline" size={32} color="#fff" />
                <Text style={styles.title}>Mis Tareas</Text>
              </View>
              <Text style={styles.subtitle}>
                {pendingCount === 0 
                  ? '¡Todo listo! 🎉' 
                  : `${pendingCount} pendiente${pendingCount !== 1 ? 's' : ''}`
                }
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{tasks.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{completionPercentage}%</Text>
                <Text style={styles.statLabel}>Completado</Text>
              </View>
            </View>
          </View>

          {/* Barra de progreso */}
          {tasks.length > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${completionPercentage}%` }]} />
              </View>
            </View>
          )}
        </View>

        {/* Input para nueva tarea */}
        <Animated.View style={[styles.inputContainer, { 
          transform: [{ 
            scale: fadeAnim.interpolate({ 
              inputRange: [0, 1], 
              outputRange: [1, 1.02] 
            }) 
          }] 
        }]}>
          <View style={styles.inputWrapper}>
            <Ionicons 
              name="create-outline" 
              size={20} 
              color={colors.textLight} 
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Agregar nueva tarea..."
              placeholderTextColor={colors.textLight}
              value={newTask}
              onChangeText={setNewTask}
              onSubmitEditing={handleAddTask}
              returnKeyType="done"
            />
            {newTask.trim().length > 0 && (
              <TouchableOpacity 
                style={styles.clearInputButton}
                onPress={() => setNewTask("")}
              >
                <Ionicons name="close-circle" size={20} color={colors.textLight} />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.addButton, !newTask.trim() && styles.addButtonDisabled]} 
            onPress={handleAddTask}
            disabled={!newTask.trim()}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={26} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Botón para limpiar completadas */}
        {completedCount > 0 && (
          <TouchableOpacity 
            style={styles.clearCompletedButton}
            onPress={clearCompleted}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={16} color={colors.danger} />
            <Text style={styles.clearCompletedText}>
              Limpiar {completedCount} completada{completedCount !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        )}

        {/* Lista de tareas */}
        <TaskList tasks={tasks} onToggle={toggleTask} onRemove={removeTask} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textLight,
  },
  header: {
    backgroundColor: "#667eea",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
    fontWeight: '600',
  },
  progressContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 15,
    fontWeight: "500",
    color: colors.textDark,
  },
  clearInputButton: {
    padding: 4,
  },
  addButton: {
    backgroundColor: colors.primary,
    marginLeft: 10,
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  clearCompletedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger + '10',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.danger + '20',
  },
  clearCompletedText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
    marginLeft: 6,
  },
});