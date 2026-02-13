import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMealPlan, addToMealPlan, removeFromMealPlan } from '../services/mealPlanService';

export default function MealPlanScreen({ navigation }) {
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const plan = await getMealPlan();
      setMealPlan(plan);
    } catch (error) {
      console.error('Error loading meal plan:', error);
    }
  };

  const handleRemove = async (mealId) => {
    Alert.alert(
      'Remove Meal',
      'Are you sure you want to remove this meal?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeFromMealPlan(mealId);
            loadMealPlan();
          },
        },
      ]
    );
  };

  const renderMealCard = ({ item }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item.recipe })}
    >
      <View style={styles.mealHeader}>
        <View>
          <Text style={styles.mealDay}>{item.day}</Text>
          <Text style={styles.mealType}>{item.mealType}</Text>
        </View>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <Text style={styles.mealTitle}>{item.recipe.title}</Text>
      {item.recipe.cookTime && (
        <Text style={styles.cookTime}>
          <Ionicons name="time-outline" size={14} /> {item.recipe.cookTime}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meal Plan</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color="#FF6B35" />
        </TouchableOpacity>
      </View>

      {mealPlan.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No meals planned yet</Text>
          <Text style={styles.emptySubtext}>
            Add recipes to your meal plan to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={mealPlan}
          keyExtractor={item => item.id}
          renderItem={renderMealCard}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  mealType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cookTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
