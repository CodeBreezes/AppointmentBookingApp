// components/CustomHeader.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomHeader = ({ title, onMenuPress }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onMenuPress}>
        <Image
          source={require('../assets/menu.png')} // 🧠 Make sure you have this icon
          style={styles.menuIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 25 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    backgroundColor: '#6A5ACD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default CustomHeader;
