import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@epic_bites_meal_plan';

export const getMealPlan = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading meal plan:', error);
    return [];
  }
};

export const addToMealPlan = async (recipe, day, mealType) => {
  try {
    const mealPlan = await getMealPlan();
    const newMeal = {
      id: Date.now().toString(),
      recipe,
      day,
      mealType,
      createdAt: new Date().toISOString(),
    };
    mealPlan.push(newMeal);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mealPlan));
    return newMeal;
  } catch (error) {
    console.error('Error adding to meal plan:', error);
    throw error;
  }
};

export const removeFromMealPlan = async (mealId) => {
  try {
    const mealPlan = await getMealPlan();
    const filtered = mealPlan.filter(m => m.id !== mealId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing from meal plan:', error);
    throw error;
  }
};
