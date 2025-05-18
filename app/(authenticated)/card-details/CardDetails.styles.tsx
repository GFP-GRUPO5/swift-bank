import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 16,
    borderBottomWidth: 1,
  },
  dialogButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogButton: {
    backgroundColor: '#2C2C2C',
    padding: 16,
    borderRadius: 24,
    color: '#FFF',
    fontWeight: '700',
  },
});