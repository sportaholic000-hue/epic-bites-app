import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@epic_bites_recipes';

export const getAllRecipes = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

export const saveRecipe = async (recipe) => {
  try {
    const recipes = await getAllRecipes();
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    recipes.push(newRecipe);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return newRecipe;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};

export const updateRecipe = async (recipeId, updates) => {
  try {
    const recipes = await getAllRecipes();
    const index = recipes.findIndex(r => r.id === recipeId);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updates };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return recipes[index];
    }
    throw new Error('Recipe not found');
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    const recipes = await getAllRecipes();
    const filtered = recipes.filter(r => r.id !== recipeId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};

export const getRecipeById = async (recipeId) => {
  try {
    const recipes = await getAllRecipes();
    return recipes.find(r => r.id === recipeId);
  } catch (error) {
    console.error('Error getting recipe:', error);
    return null;
  }
};
