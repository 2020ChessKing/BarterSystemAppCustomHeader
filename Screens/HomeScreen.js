import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ToastAndroid, Modal } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../Components/Header.js';
import { Icon, Button } from "react-native-elements";
import { Alert } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor()
    {
        super();
        this.state = {
            "modalVisible" : false,
            "email" : firebase.auth().currentUser.email,
            "name" : "John Doe",
            "product" : "",
            "description" : "",
            "reason" : "",
        }
    }

    getInfo = () =>
    {
        var id = this.state.email;

        db.collection('Users').where("email", "==", id).get()
        .then(( snapshot ) =>
        {
            snapshot.forEach(( doc ) =>
            {
                this.setState(
                    {
                        "name" : doc.data().fullName,
                    }
                )
            })
        })
    }

    addItem = () =>
    {
        var sellerName = this.state.name;
        var email = this.state.email;
        var product = this.state.product;
        var description = this.state.description;
        var reason = this.state.reason;

        if(product !== "" && description !== "" && reason !== "")
        {
            db.collection('Items').add({
                "product" : product,
                "description" : description,
                "reason" : reason,
                "sellerEmail" : email,
                "sellerName" : sellerName,
            })
    
            this.setState({ "modalVisible" : false,}); 
            Alert.alert("Your Item is Now Available For Barter");
        }
        else
        {
            Alert.alert("Please Enter the Required Info?");
        }

    }

    componentDidMount = () =>
    {
        this.getInfo();
    }

    showModal()
    {
        var modalVisible = this.state.modalVisible;

        return(
            <Modal visible = { modalVisible } animationType = { 'slide' } transparent = { true } >
              <View style = { styles.container }>

                <View style = {{ alignItems : 'center', }}>
                <Image style = { styles.logoIMG } source = { images.LogoIMG } />
                <Text style = { styles.title }> Barter </Text>

                <View style = { styles.rowView }>
                    <Text> By</Text>
                    <Text style = { styles.boldRedText }> Oval Inc</Text>
                </View>
                </View>

                <View style = { styles.LoginView }>
                <Text style = {[ styles.LoginText, { marginTop : '10%' } ]}> PRODUCT </Text>
                <TextInput style = { styles.LoginInput } placeholder =  "Which product are you bartering?"  onChangeText = {( data ) => { this.setState({ "product" : data })}}/>
                <Text style = {[ styles.LoginText, { marginTop : '5%' } ]}> DESCRIPTION </Text>
                <TextInput  style = { styles.LoginInput } placeholder =  "A short description of the product?" onChangeText = {( data ) => { this.setState({ "description" : data })}}/>
                <Text style = {[ styles.LoginText, { marginTop : '5%' } ]}> YOUR REASON </Text>
                <TextInput  style = { styles.LoginInput } placeholder =  "Why Are You Bartering This Item?" onChangeText = {( data ) => { this.setState({ "reason" : data })}}/>                
                </View>

                <View>
                <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.addItem(); }}>
                    <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>ADD PRODUCT</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.setState({ "modalVisible" : false })}}>
                    <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>CLOSE</Text>
                </TouchableOpacity>
                </View>

                </View>
            </Modal>
          );
    }

    render()
    {
        return(
            <View>
                { this.showModal() }
                <MyHeader title = { "Welcome, " + this.state.name + "!" } navigation = { this.props.navigation }/>
                <Button 
                    title =  { <Text style = {{ fontSize : 25, color : 'white', fontWeight : "bold", marginVertical : 10, }}>  Add Barter </Text> } 
                    style = {{ padding : 10, }} 
                    buttonStyle = {{ backgroundColor : "#df2800" }}
                    onPress = {() => { this.setState({ "modalVisible" : true })}} 
                    icon = { <Icon name = "plus-circle" type = "font-awesome" color = "#fff" size = { 30 } /> }
                />
            </View>
        );
    }
}