import Purchases from 'react-native-purchases';

export const initializeRevenueCat = async () => {
  try {
    Purchases.configure({
      apiKey: 'YOUR_REVENUECAT_API_KEY',
    });
  } catch (error) {
    console.error('RevenueCat initialization error:', error);
  }
};

export const getCustomerInfo = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo;
  } catch (error) {
    console.error('Error getting customer info:', error);
    return null;
  }
};

export const purchasePackage = async (packageToPurchase) => {
  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    return customerInfo;
  } catch (error) {
    console.error('Purchase error:', error);
    throw error;
  }
};

export const restorePurchases = async () => {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (error) {
    console.error('Restore error:', error);
    throw error;
  }
};
