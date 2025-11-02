import { StyleSheet } from "react-native";
import colors from "./colors";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    opacity: 0.8,
  },
  optionButtonSelected: {
    opacity: 1,
    transform: [{ scale: 1.05 }],
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  contentContainer: {
    minHeight: 200,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    color: colors.textLight,
    fontSize: 16,
    textAlign: 'center',
  },
  amountContainer: {
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.textLight,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});