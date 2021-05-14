import React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './Screens/Login';
import { DrawerNavigator } from './Components/DrawerNavigator.js'

export default function App() 
{
    return ( <AppContainer /> );
}

const StackNavigator = createSwitchNavigator({
  Login : { screen : Login },
  DrawerNavigator : { screen : DrawerNavigator },
})

const AppContainer = createAppContainer( StackNavigator );