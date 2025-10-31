import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import colors from "../../styles/colors";
import { useEffect, useRef } from "react";
import { useNotification } from "../../context/NotificationContext";
import { SimpleLineIcons } from "@expo/vector-icons";

const Notification = () => {
  const { notification } = useNotification();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animación de fade-in / fade-out
  useEffect(() => {
    if (notification.visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [notification.visible]);

  if (!notification.visible) return null;

  const bgColor =
    notification.type === "success"
      ? colors.bg_ingr_a
      : notification.type === "error"
      ? colors.bg_reti_a
      : colors.card;

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor, opacity: fadeAnim }]}>

      <View style={styles.contentRow}>
        <SimpleLineIcons
          name={
            notification.type === "success"
              ? "check"
              : notification.type === "error"
              ? "close"
              : "info"
          }
          size={18}
          color="#fff"
          style={styles.icon}
        />

        <Text style={styles.text}>{notification.message}</Text>
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 20,
    maxWidth: "85%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    zIndex: 999,
    elevation: 8,

    // Mejor sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 10,
  },

  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    flexShrink: 1, 
  },
});

export default Notification;
