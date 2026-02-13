import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { initializeFirebase } from './src/services/firebase';
import { initializeRevenueCat } from './src/services/revenuecat';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import GroceryListScreen from './src/screens/GroceryListScreen';
import MealPlanScreen from './src/screens/MealPlanScreen';
import CreatorCollectionsScreen from './src/screens/CreatorCollectionsScreen';
import CollectionDetailScreen from './src/screens/CollectionDetailScreen';
import CookingModeScreen from './src/screens/CookingModeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PaywallScreen from './src/screens/PaywallScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MealPlanStack = createStackNavigator();
const CollectionsStack = createStackNavigator();

// Meal Plan Stack Navigator
function MealPlanNavigator() {
  return (
    <MealPlanStack.Navigator>
      <MealPlanStack.Screen 
        name="MealPlanMain" 
        component={MealPlanScreen}
        options={{ title: 'Meal Plan' }}
      />
      <MealPlanStack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen}
        options={{ title: 'Recipe' }}
      />
      <MealPlanStack.Screen 
        name="CookingMode" 
        component={CookingModeScreen}
        options={{ headerShown: false }}
      />
    </MealPlanStack.Navigator>
  );
}

// Collections Stack Navigator
function CollectionsNavigator() {
  return (
    <CollectionsStack.Navigator>
      <CollectionsStack.Screen 
        name="CollectionsMain" 
        component={CreatorCollectionsScreen}
        options={{ title: 'Creator Collections' }}
      />
      <CollectionsStack.Screen 
        name="CollectionDetail" 
        component={CollectionDetailScreen}
        options={{ title: 'Collection' }}
      />
      <CollectionsStack.Screen 
        name="RecipeDetail" 
        component={RecipeDetailScreen}
        options={{ title: 'Recipe' }}
      />
      <CollectionsStack.Screen 
        name="CookingMode" 
        component={CookingModeScreen}
        options={{ headerShown: false }}
      />
    </CollectionsStack.Navigator>
  );
}

// Main Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MealPlan') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Collections') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Grocery') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="MealPlan" 
        component={MealPlanNavigator}
        options={{ title: 'Meal Plan' }}
      />
      <Tab.Screen 
        name="Collections" 
        component={CollectionsNavigator}
      />
      <Tab.Screen 
        name="Grocery" 
        component={GroceryListScreen}
        options={{ title: 'Grocery List' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root Navigator with modals
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initializeFirebase();
        await initializeRevenueCat();
        setIsReady(true);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsReady(true); // Continue anyway for dev
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null; // Add splash screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen 
          name="AddRecipe" 
          component={AddRecipeScreen}
          options={{
            headerShown: true,
            title: 'Add Recipe',
            headerStyle: { backgroundColor: '#FF6B35' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetailScreen}
          options={{
            headerShown: true,
            title: 'Recipe',
          }}
        />
        <Stack.Screen 
          name="CookingMode" 
          component={CookingModeScreen}
        />
        <Stack.Screen 
          name="Paywall" 
          component={PaywallScreen}
          options={{
            headerShown: true,
            title: 'Go Premium',
            headerStyle: { backgroundColor: '#FF6B35' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
