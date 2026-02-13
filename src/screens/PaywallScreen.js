import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaywallScreen({ navigation }) {
  const handlePurchase = async () => {
    // RevenueCat purchase logic here
    console.log('Purchase initiated');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="diamond" size={64} color="#FF6B35" />
        <Text style={styles.title}>Epic Bites Premium</Text>
        <Text style={styles.subtitle}>Unlock unlimited recipes and features</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.featureText}>Unlimited recipe saves</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.featureText}>AI meal planning</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.featureText}>Smart grocery lists</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          <Text style={styles.featureText}>Exclusive creator collections</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePurchase}>
        <Text style={styles.buttonText}>Start Free Trial</Text>
        <Text style={styles.buttonSubtext}>Then $9.99/month</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#333', marginTop: 16 },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
  features: { paddingHorizontal: 40, marginBottom: 40 },
  feature: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  featureText: { fontSize: 18, color: '#333', marginLeft: 12 },
  button: { backgroundColor: '#FF6B35', marginHorizontal: 20, padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  buttonSubtext: { color: '#fff', fontSize: 14, marginTop: 4, opacity: 0.9 },
  restoreText: { color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 40 },
});
