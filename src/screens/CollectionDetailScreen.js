import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CollectionDetailScreen({ route, navigation }) {
  const { collection } = route.params;

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        {item.cookTime && <Text style={styles.cookTime}>{item.cookTime}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: collection.imageUrl }} style={styles.headerImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{collection.title}</Text>
        <Text style={styles.creator}>by {collection.creatorName}</Text>
        <Text style={styles.description}>{collection.description}</Text>
        <FlatList
          data={collection.recipes}
          keyExtractor={item => item.id}
          renderItem={renderRecipe}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 250 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  creator: { fontSize: 16, color: '#FF6B35', marginBottom: 16 },
  description: { fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 20 },
  listContainer: { paddingBottom: 20 },
  recipeCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  recipeImage: { width: 100, height: 100, borderRadius: 12 },
  recipeInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  recipeTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  cookTime: { fontSize: 14, color: '#666' },
});
