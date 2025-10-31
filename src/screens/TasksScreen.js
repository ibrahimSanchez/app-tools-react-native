import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, Easing, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import TaskList from "../components/tasks/TaskList";
import useTasks from "../hooks/useTasks";
import { styles } from "../styles/TasksScreenCss";
import Spinner from "../components/ui/Spinner";
import TaskHeader from "../components/tasks/TaskHeader";

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

  if (loading) return <Spinner text="Cargando tareas..."/>

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
        <TaskHeader 
          tasks={tasks}
          pendingCount={pendingCount}
          completionPercentage={completionPercentage}
        />

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
