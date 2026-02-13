import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CookingModeScreen({ route, navigation }) {
  const { recipe } = route.params;
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = recipe.instructions?.length || 0;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{recipe.title}</Text>
        <Text style={styles.stepCounter}>
          Step {currentStep + 1} of {totalSteps}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.stepContainer}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{currentStep + 1}</Text>
          </View>
          <Text style={styles.instruction}>
            {recipe.instructions[currentStep]}
          </Text>
        </View>
      </View>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Ionicons 
            name="chevron-back" 
            size={32} 
            color={currentStep === 0 ? '#ccc' : '#FF6B35'} 
          />
          <Text style={[styles.navText, currentStep === 0 && styles.navTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentStep === totalSteps - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentStep === totalSteps - 1}
        >
          <Text style={[styles.navText, currentStep === totalSteps - 1 && styles.navTextDisabled]}>
            Next
          </Text>
          <Ionicons 
            name="chevron-forward" 
            size={32} 
            color={currentStep === totalSteps - 1 ? '#ccc' : '#FF6B35'} 
          />
        </TouchableOpacity>
      </View>

      {currentStep === totalSteps - 1 && (
        <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.doneButtonText}>Done Cooking!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FF6B35',
  },
  closeButton: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  stepCounter: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepNumberText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  instruction: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navText: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
    marginHorizontal: 8,
  },
  navTextDisabled: {
    color: '#ccc',
  },
  doneButton: {
    flexDirection: 'row',
    backgroundColor: '#34C759',
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
