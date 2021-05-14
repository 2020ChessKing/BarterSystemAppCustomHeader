import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ToastAndroid, Modal } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';
import MyHeader from '../Components/Header.js';
import { Icon } from "react-native-elements";
import { Alert } from 'react-native';

export default class Settings extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            "UserId" : firebase.auth().currentUser.email,
            "FirstName" : "",
            "Number" : "",
            "LastName"  : "",
            "Address" : "",
            "DocId" : "",
        }
    }

    getInfo = () =>
    {
        db.collection('Users').where("email", "==", this.state.UserId).onSnapshot(( snapshot ) =>
        {
            snapshot.forEach(( doc ) =>
            {
                var data = doc.data();

                this.setState({
                    "FirstName" : data.firstName,
                    "LastName" : data.lastName,
                    "Address" : data.address,
                    "Number" : data.contact,
                    "DocId" : doc.id,
                })
            })
        })
    }

    saveDetails = () =>
    {
        db.collection("Users").doc( this.state.DocId ).update(
            {
                "firstName" : this.state.FirstName,
                "lastName" : this.state.LastName,
                "fullName" : this.state.FirstName + " " + this.state.LastName,
                "contact" : this.state.Number,
                "address" : this.state.Address,
            }
        )
    }

    componentDidMount = () =>
    {
        this.getInfo();
    }

    render()
    {
        return(
            <View style = { styles.container }>

                <View style = {{ alignItems : 'center', }}>
                    <Image style = { styles.logoIMG } source = { images.LogoIMG } />
                    <Text style = { styles.title }> Profile </Text>

                    <View style = { styles.rowView }>
                        <Text> By</Text>
                        <Text style = { styles.boldRedText }> Oval Inc</Text>
                    </View>
                </View>
                    <View style = { styles.LoginView }>
                        <Text style = {[ styles.LoginText, { marginTop : '10%' } ]}> FIRSTNAME </Text>
                        <TextInput style = { styles.LoginInput } value = { this.state.FirstName }  onChangeText = {( data ) => { this.setState({ "FirstName" : data })}}/>
                        <Text style = {[ styles.LoginText, { marginTop : '5%' } ]}> LASTNAME </Text>
                        <TextInput  style = { styles.LoginInput } value =  { this.state.LastName } onChangeText = {( data ) => { this.setState({ "LastName" : data })}}/>
                        <Text style = {[ styles.LoginText, { marginTop : '5%' } ]}> ADDRESS </Text>
                        <TextInput  style = { styles.LoginInput } value =  { this.state.Address } onChangeText = {( data ) => { this.setState({ "Address" : data })}}/>    
                        <Text style = {[ styles.LoginText, { marginTop : '5%' } ]}> CONTACT </Text>
                        <TextInput  style = { styles.LoginInput } value =  { this.state.Number } onChangeText = {( data ) => { this.setState({ "Number" : data })}}/>                
                    </View>

                    <View>
                        <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.saveDetails(); }}>
                            <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>SAVE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.props.navigation.navigate("HomeScreen") }}>
                            <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}