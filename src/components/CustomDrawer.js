import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomDrawer = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.drawer}>
        <View style={styles.headerBackground} />

        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/rashid.png')} // 👤 Your avatar image
            style={styles.avatar}
          />
          <Text style={styles.name}>LanreB</Text>
          <Text style={styles.subtitle}>70 Events</Text>
        </View>

        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          <DrawerItem icon="🏠" label="Home" />
          <DrawerItem icon="🔍" label="Explore" />
          <DrawerItem icon="🗓️" label="My Events" />
          <DrawerItem icon="📝" label="Tasks" />
          <DrawerItem icon="📨" label="Invite Friends" />
          <DrawerItem icon="⚙️" label="Settings" />
          <DrawerItem icon="ℹ️" label="About" />
        </ScrollView>

        <TouchableOpacity style={styles.logoutContainer}>
          <Text style={styles.logoutText}>↩️ Sign Out</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const DrawerItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 55, // ➤ Keep below your header
    left: 0,
    width,
    height: height - 55,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    zIndex: 999,
  },
  drawer: {
    width: width * 0.75,
    backgroundColor: '#fff',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerBackground: {
    position: 'absolute',
    top: -70,
    left: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#C5E1E8',
    zIndex: -1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  icon: {
    fontSize: 18,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  logoutContainer: {
    paddingVertical: 14,
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  logoutText: {
    color: '#D22B2B',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomDrawer;
