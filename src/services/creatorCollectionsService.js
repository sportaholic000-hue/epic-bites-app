// Mock data for creator collections
const mockCollections = [
  {
    id: '1',
    title: 'Eitan's Favorites',
    creatorName: 'Eitan Bernath',
    description: 'My go-to recipes',
    imageUrl: 'https://via.placeholder.com/400x250',
    recipeCount: 12,
    recipes: [],
  },
];

export const getCreatorCollections = async () => {
  return mockCollections;
};

export const getCollectionById = async (collectionId) => {
  return mockCollections.find(c => c.id === collectionId);
};
