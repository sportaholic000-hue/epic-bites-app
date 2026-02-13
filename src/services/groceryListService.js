import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@epic_bites_grocery_list';

export const getGroceryList = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading grocery list:', error);
    return [];
  }
};

export const addItem = async (name) => {
  try {
    const list = await getGroceryList();
    const newItem = {
      id: Date.now().toString(),
      name,
      checked: false,
      createdAt: new Date().toISOString(),
    };
    list.push(newItem);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return newItem;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const toggleItem = async (itemId) => {
  try {
    const list = await getGroceryList();
    const index = list.findIndex(i => i.id === itemId);
    if (index !== -1) {
      list[index].checked = !list[index].checked;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  } catch (error) {
    console.error('Error toggling item:', error);
    throw error;
  }
};

export const removeItem = async (itemId) => {
  try {
    const list = await getGroceryList();
    const filtered = list.filter(i => i.id !== itemId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing item:', error);
    throw error;
  }
};
