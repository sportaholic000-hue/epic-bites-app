import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { extractRecipeFromURL, extractRecipeFromImage } from '../services/aiRecipeExtractor';
import { saveRecipe } from '../services/recipeService';

export default function AddRecipeScreen({ navigation }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedRecipe, setExtractedRecipe] = useState(null);

  const handleExtractFromURL = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a recipe URL');
      return;
    }

    setLoading(true);
    try {
      const recipe = await extractRecipeFromURL(url);
      setExtractedRecipe(recipe);
    } catch (error) {
      Alert.alert('Error', 'Failed to extract recipe from URL');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractFromPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const recipe = await extractRecipeFromImage(result.assets[0].uri);
        setExtractedRecipe(recipe);
      } catch (error) {
        Alert.alert('Error', 'Failed to extract recipe from photo');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveRecipe = async () => {
    if (!extractedRecipe) return;

    setLoading(true);
    try {
      await saveRecipe(extractedRecipe);
      Alert.alert('Success', 'Recipe saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save recipe');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualEntry = () => {
    setExtractedRecipe({
      title: '',
      ingredients: [''],
      instructions: [''],
      cookTime: '',
      servings: '',
      category: 'dinner',
      tags: [],
      imageUrl: '',
    });
  };

  const updateRecipeField = (field, value) => {
    setExtractedRecipe(prev => ({ ...prev, [field]: value }));
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...extractedRecipe.ingredients];
    newIngredients[index] = value;
    updateRecipeField('ingredients', newIngredients);
  };

  const addIngredient = () => {
    updateRecipeField('ingredients', [...extractedRecipe.ingredients, '']);
  };

  const removeIngredient = (index) => {
    const newIngredients = extractedRecipe.ingredients.filter((_, i) => i !== index);
    updateRecipeField('ingredients', newIngredients);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Extracting recipe...</Text>
      </View>
    );
  }

  if (extractedRecipe) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Recipe Title</Text>
          <TextInput
            style={styles.input}
            value={extractedRecipe.title}
            onChangeText={(text) => updateRecipeField('title', text)}
            placeholder="Enter recipe title"
          />

          <Text style={styles.label}>Cook Time</Text>
          <TextInput
            style={styles.input}
            value={extractedRecipe.cookTime}
            onChangeText={(text) => updateRecipeField('cookTime', text)}
            placeholder="e.g., 30 mins"
          />

          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            value={extractedRecipe.servings}
            onChangeText={(text) => updateRecipeField('servings', text)}
            placeholder="e.g., 4"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ingredients</Text>
          {extractedRecipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <TextInput
                style={[styles.input, styles.ingredientInput]}
                value={ingredient}
                onChangeText={(text) => updateIngredient(index, text)}
                placeholder="Enter ingredient"
              />
              <TouchableOpacity
                onPress={() => removeIngredient(index)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Ionicons name="add-circle-outline" size={24} color="#FF6B35" />
            <Text style={styles.addButtonText}>Add Ingredient</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Instructions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={extractedRecipe.instructions.join('\n')}
            onChangeText={(text) => updateRecipeField('instructions', text.split('\n'))}
            placeholder="Enter instructions (one per line)"
            multiline
            numberOfLines={10}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
            <Text style={styles.saveButtonText}>Save Recipe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <Ionicons name="link" size={48} color="#FF6B35" />
        <Text style={styles.sectionTitle}>Add from URL</Text>
        <Text style={styles.sectionDescription}>
          Paste a recipe URL and we'll extract all the details
        </Text>
        <TextInput
          style={styles.urlInput}
          value={url}
          onChangeText={setUrl}
          placeholder="https://example.com/recipe"
          autoCapitalize="none"
          keyboardType="url"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleExtractFromURL}>
          <Text style={styles.buttonText}>Extract Recipe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.section}>
        <Ionicons name="camera" size={48} color="#FF6B35" />
        <Text style={styles.sectionTitle}>Add from Photo</Text>
        <Text style={styles.sectionDescription}>
          Take or upload a photo of a recipe
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleExtractFromPhoto}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.section}>
        <Ionicons name="create" size={48} color="#FF6B35" />
        <Text style={styles.sectionTitle}>Manual Entry</Text>
        <Text style={styles.sectionDescription}>
          Enter recipe details manually
        </Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleManualEntry}>
          <Text style={styles.secondaryButtonText}>Start Writing</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  section: {
    alignItems: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  urlInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999',
    fontWeight: '500',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
