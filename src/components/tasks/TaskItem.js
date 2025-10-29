import { Text, StyleSheet, TouchableOpacity, Alert, Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";
import { useState, useRef, useEffect } from "react";

export default function TaskItem({ task, onToggle, onRemove }) {
  const [scaleValue] = useState(new Animated.Value(1));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar tarea", 
      `¿Deseas eliminar "${task.title}"?`,
      [
        { 
          text: "Cancelar", 
          style: "cancel",
        },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: 50,
                duration: 250,
                useNativeDriver: true,
              }),
            ]).start(() => onRemove(task.id));
          }
        },
      ]
    );
  };

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onToggle(task.id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays === -1) return "Ayer";
    if (diffDays < -1) return "Vencida";
    if (diffDays <= 7) return `En ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleValue },
            { translateX: slideAnim }
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.touchable, task.completed && styles.completedContainer]}
        onPress={handleToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.leftContent}>
          <View style={styles.checkbox}>
            {task.completed ? (
              <Animated.View>
                <Ionicons name="checkmark-circle" size={28} color={colors.primary} />
              </Animated.View>
            ) : (
              <View style={styles.uncheckedCircle} />
            )}
          </View>
          
          <View style={styles.textContainer}>
            <Text 
              style={[styles.text, task.completed && styles.completed]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            
            {task.description && (
              <Text 
                style={[styles.description, task.completed && styles.completedDescription]}
                numberOfLines={1}
              >
                {task.description}
              </Text>
            )}

            {task.dueDate && (
              <View style={styles.dateContainer}>
                <Ionicons 
                  name="calendar-outline" 
                  size={12} 
                  color={task.completed ? colors.textLight : colors.primary} 
                />
                <Text style={[styles.dateText, task.completed && styles.completedDate]}>
                  {formatDate(task.dueDate)}
                </Text>
              </View>
            )}

            {task.categoryName && (
              <View style={[styles.category, { backgroundColor: task.categoryColor + '20' }]}>
                <View style={[styles.categoryDot, { backgroundColor: task.categoryColor }]} />
                <Text style={[styles.categoryText, { color: task.categoryColor }]}>
                  {task.categoryName}
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  completedContainer: {
    backgroundColor: "#f8f9fa",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  checkbox: {
    marginRight: 14,
    paddingTop: 2,
  },
  uncheckedCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2.5,
    borderColor: colors.textLight,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDark,
    lineHeight: 22,
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: "line-through",
    color: colors.textLight,
    fontWeight: "500",
  },
  description: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 18,
    marginBottom: 6,
  },
  completedDescription: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: "500",
  },
  completedDate: {
    color: colors.textLight,
    textDecorationLine: "line-through",
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: colors.danger + '10',
  },
});