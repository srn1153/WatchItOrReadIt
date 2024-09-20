import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function ListScreen() {
  const [selectedTab, setSelectedTab] = useState('Your List');  // State to track the selected tab
  const navigation = useNavigation(); //To navigate between screens

  return (
    <View style={styles.container}>
      <View style={styles.topTabs}>  {/* Top Tabs: Navigation between different list types */}
        <TouchableOpacity onPress={() => setSelectedTab('Your List')}>
          <Text style={[styles.tab, selectedTab === 'Your List' && styles.activeTab]}>Your List</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Watchlist')}>
          <Text style={[styles.tab, selectedTab === 'Watchlist' && styles.activeTab]}>Watchlist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('TBR')}>
          <Text style={[styles.tab, selectedTab === 'TBR' && styles.activeTab]}>TBR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}  
          style={styles.plusButton}
        >
          <FontAwesome name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Area where 'List' content would be displayed */}
      <View style={styles.content}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40, 
    marginBottom: 10,
  },
  tab: {
    fontSize: 22,
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  plusButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

