import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Barter from '../Screens/AvailableBarters.js'
import ViewBarter from '../Screens/ViewBarter.js'

export const StackNavigator = createStackNavigator(
    {
        Barter: 
        {
            screen : Barter,
            navigationOptions : { headerShown : false }
        },

        ViewBarter: 
        {
            screen : ViewBarter,
            navigationOptions : { headerShown : false }
        },
    },
    // {
    //     initialRouteName : "Barter",
    // },
)