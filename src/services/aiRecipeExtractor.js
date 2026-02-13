export const extractRecipeFromURL = async (url) => {
  // Mock implementation - replace with actual API call
  return {
    title: 'Sample Recipe',
    ingredients: ['2 cups flour', '1 cup sugar', '2 eggs'],
    instructions: ['Mix ingredients', 'Bake at 350F for 30 mins'],
    cookTime: '30 mins',
    servings: '4',
    category: 'dessert',
    tags: ['easy', 'quick'],
    imageUrl: '',
  };
};

export const extractRecipeFromImage = async (imageUri) => {
  // Mock implementation - replace with actual API call
  return {
    title: 'Recipe from Photo',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: ['Step 1', 'Step 2'],
    cookTime: '45 mins',
    servings: '6',
    category: 'dinner',
    tags: [],
    imageUrl: imageUri,
  };
};
