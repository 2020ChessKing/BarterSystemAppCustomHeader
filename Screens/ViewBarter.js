import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ToastAndroid, Modal, TouchableHighlightBase } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../Components/Header.js';
import { Icon, Header, Button, Card } from "react-native-elements";
import { Alert } from 'react-native';

export default class ViewBarter extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = {
            "UserId" : firebase.auth().currentUser.email,
            "Name" : "",
            "ProductName" : this.props.navigation.getParam('details')[ 'product' ],       
            "Description" : this.props.navigation.getParam('details')[ 'description' ],       
            "SellerName" : this.props.navigation.getParam('details')[ 'sellerName' ],       
            "SellerEmail" : this.props.navigation.getParam('details')[ 'sellerEmail' ],       
            "Reason" : this.props.navigation.getParam('details')[ 'reason' ],       
        }
    }

    getInfo = () =>
    {
        db.collection("Users").where("email", "==", this.state.UserId ).onSnapshot(( snapshot ) => 
        {
            snapshot.forEach(( doc ) =>
                {
                    this.setState(
                        {
                            "Name" : doc.data().fullName, 
                        }
                    )
                }
            )
        })
    }

    createUniqueId = () =>
    {
        return Math.random().toString(36).substring(7);
    }

    sendNotification = () =>
    {
        var randomRequest = this.createUniqueId();

        db.collection("Notifications").add({
            "Item" : this.state.ProductName, 
            "Message" : this.state.Name + " has shown interest in your barter, " + this.state.ProductName,
            "SellerEmail" : this.state.SellerEmail,
            "BuyerEmail" : this.state.UserId,
            "Status" : "unread",
            "Id" : randomRequest,
        })

        Alert.alert("The Seller Has Been Notified That You Are Interested");
        this.props.navigation.goBack();
        this.props.navigation.navigate("HomeScreen");
    }

    componentDidMount = () =>
    {
        this.getInfo();
    }

    render()
    {
        return(
            <View>
                <Header
                    backgroundColor = { '#ffffff' }
                    leftComponent = {
                        <View>
                            <View style = {{ flexDirection : 'row', width : 18000 }}>
                                <Icon name = { "chevron-left" } type = { "font-awesome" } style = {{ marginTop : 6,  }} onPress = {() => { this.props.navigation.navigate("HomeScreen") }}/>
                                <Text style = {{ fontWeight : "bold", fontSize : 30, marginLeft : 10, }}>{ this.state.ProductName }</Text>
                            </View>
                        </View>
                    }
                />
                <View>
                    <Card>
                        <Card.Title> Item Information </Card.Title>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Name : { this.state.ProductName } </Text>
                        </Card>

                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Description : { this.state.Description } </Text>
                        </Card>

                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Reason : { this.state.Reason } </Text>
                        </Card>
                    </Card>

                    <Card>
                        <Card.Title> Seller Information </Card.Title>
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Name : { this.state.SellerName } </Text>
                        </Card>
                        
                        <Card>
                            <Text style = { { fontWeight : 'bold' } }> Email : { this.state.SellerEmail } </Text>
                        </Card>
                    </Card>

                    <View style = {{ margin : 10, }}>
                        <Button 
                            title =  { <Text style = {{ fontSize : 25, color : 'white', fontWeight : "bold", marginVertical : 10, }}>  I'm Interested </Text> } 
                            style = {{ padding : 10, }} 
                            buttonStyle = {{ backgroundColor : "#df2800" }}
                            onPress = {() => { this.sendNotification() }} 
                            disabled = { this.state.UserId === this.state.SellerEmail ? true : false }
                            icon = { <Icon name = "shopping-cart" type = "font-awesome" color = "#fff" size = { 30 } /> }
                        />
                    </View>
                </View>
            </View>
        );
    }   
}