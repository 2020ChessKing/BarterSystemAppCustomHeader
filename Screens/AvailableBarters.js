import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, FlatList, ToastAndroid, Modal } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../Components/Header.js';
import { ListItem, Avatar, Card, Button, Icon } from "react-native-elements";
import Constants from 'expo-constants';

export default class Barter extends React.Component 
{
    constructor()
    {
        super();
        this.state = {
            "requestedBooksArray" : [],
        }

        this.dataToFetch = null;
    }

    fetchData = async () =>
    {
        this.dataToFetch = db.collection("Items").onSnapshot(( snapshot ) =>
            {
                var requestBooksList = snapshot.docs.map(( doc ) => doc.data() )
                this.setState(
                    {
                        "requestedBooksArray" : requestBooksList,
                    }
                )
            }
        )

        console.log(this.state.requestedBooksArray);
    }

    componentDidMount = () =>
    {
         this.fetchData();
    }

    componentWillUnmount = () =>
    {
        this.dataToFetch();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem key = { i } bottomDivider onPress = {() => { this.props.navigation.navigate("ViewBarter", { "details" : item }) }}>
                <ListItem.Content >
                    <ListItem.Title style = { styles.listTitleStyles }>{ item.product }</ListItem.Title>
                    <ListItem.Subtitle style = { styles.listSubtitleStyles }>{ item.description }</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        );
    }
    
    render()
    {
        return(
            <View>
                <MyHeader title = { 'Available Barters' } navigation = { this.props.navigation }/>
                <View>
                    {
                        this.state.requestedBooksArray.length === 0
                            ?
                            (
                                <View> 
                                    <Button 
                                        title =  { <Text style = {{ fontSize : 25, color : '#df2800', fontWeight : "bold", marginVertical : 10, }}>  There Aren't Any Barters Open Currently  </Text> } 
                                        style = {{ padding : 10, }} 
                                        buttonStyle = {{ backgroundColor : "#fff" }}
                                        icon = { <Icon name = "folder-open" color = "#df2800" type = "font-awesome" size = { 30 } /> }
                                        disabled
                                        disabledStyle = {{ backgroundColor : "#fff" }}
                                    />
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    data = { this.state.requestedBooksArray }
                                    keyExtractor = { this.keyExtractor }
                                    renderItem = { this.renderItem }
                                />
                            )

                    }
                </View>
            </View>
        );
    }
}