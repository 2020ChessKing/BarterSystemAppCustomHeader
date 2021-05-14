import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../Screens/HomeScreen.js';
import { StackNavigator } from "./StackNavigator.js";


export const TabNavigtor = createBottomTabNavigator({
        HomeScreen : {screen : HomeScreen},
        Barter : {screen : StackNavigator},
})