import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllPhotosScreen from '../screens/AllPhotosScreen';
import LikedPhotosScreen from '../screens/LikedPhotoScreen'

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen name="All Photos" component={AllPhotosScreen} />
      <Tab.Screen name="Liked Photos" component={LikedPhotosScreen} />
    </Tab.Navigator>
  );
}
