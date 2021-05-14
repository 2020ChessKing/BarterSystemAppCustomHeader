import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase from "firebase";
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Icon, Button } from "react-native-elements";

export default class CustomSidebarMenu extends Component
{
    logout = () =>
    {
        this.props.navigation.navigate('Login'); 
        firebase.auth().signOut();
    }

    render()
    {
        return( 
            <View style = {{ flex : 1, }}>
                <View style = {{ marginTop : 10, }}>
                    <DrawerItems { ...this.props }/>   
                </View>
                <View style = {{ flex : 1, justifyContent : 'flex-end', paddingBottom : 30, }}>
                    <Button 
                        type = { "ClearButton" }
                        title = { <Text style = {{ fontWeight : "bold", color : "#000", }}>Logout</Text> }
                        onPress = {() => { this.logout(); }}
                        icon = { <Icon name = "sign-out" type = "font-awesome" color = "#000" style = {{ marginHorizontal : 3, }}/>}
                    />
                </View>
            </View>
        );
    }
}