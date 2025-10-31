import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/TasksScreenCss";

export default function TaskHeader({ tasks, pendingCount, completionPercentage }){

    return (
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
    )
}