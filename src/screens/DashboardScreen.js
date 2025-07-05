import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import MainLayout from '../components/MainLayout';

const dummyData = [
  { id: '1', title: 'Upcoming Appointment', description: 'Hair Spa - 5th July, 11:00 AM' },
  { id: '2', title: 'Recent Booking', description: 'Facial Cleanup - 28th June, 3:00 PM' },
  { id: '3', title: 'Offer', description: 'Get 20% off on next visit!' },
];

const DashboardScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );

  return (
    <MainLayout title="Dashboard">
      <Text style={styles.welcome}>Welcome Back!</Text>
      <Image
        source={require('../assets/History.png')}
        style={styles.banner}
      />
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 16,
    color: '#333',
  },
  banner: {
    height: 140,
    width: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});

export default DashboardScreen;
