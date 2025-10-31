import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import colors from "../../styles/colors";


export default function Spinner({ text = '' }){
    return (
        <View style={[styles.container, styles.centerContent]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>{text}</Text>
        </View>
    )
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
});