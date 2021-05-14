import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { TabNavigtor } from './TabNavigator.js';
import CustomSideBarMenu from './CustomSidebarMenu.js';
import Settings from '../Screens/Settings.js';
import Notifications from '../Screens/MyNotifications.js';

export const DrawerNavigator = createDrawerNavigator(
    {

        Home : {
            screen : TabNavigtor,
        },

        Settings : {
            screen : Settings,
        },

        Notifications : {
            screen : Notifications,
        },

    }, 
    {
        contentComponent : CustomSideBarMenu,
    },
    {
        initialRouteName : 'Home',
    }
)