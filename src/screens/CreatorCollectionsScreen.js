import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCreatorCollections } from '../services/creatorCollectionsService';

export default function CreatorCollectionsScreen({ navigation }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    const data = await getCreatorCollections();
    setCollections(data);
  };

  const renderCollection = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CollectionDetail', { collection: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.creator}>{item.creatorName}</Text>
        <Text style={styles.count}>{item.recipeCount} recipes</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Creator Collections</Text>
      </View>
      <FlatList
        data={collections}
        keyExtractor={item => item.id}
        renderItem={renderCollection}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  image: { width: '100%', height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  info: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  creator: { fontSize: 14, color: '#FF6B35', marginBottom: 8 },
  count: { fontSize: 14, color: '#666' },
});
