import { StyleSheet } from "react-native";

export const homeAccountCardStyles = StyleSheet.create({
  accountLink: {
    marginBottom: 8
  },
  accountLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  moneyAmount: {
    fontWeight: 700,
    fontSize: 30,
    marginBottom: 24,
  },
  transactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  transactionPressableItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconContainer: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF3DE',
    borderRadius: '100%',
    marginBottom: 8,
  }
})