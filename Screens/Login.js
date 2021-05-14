import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ToastAndroid, Modal, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';

export default class Login extends React.Component {

  componentDidMount = () => 
  {
    console.log('hello world');
  }

  constructor()
  {
    super();
    this.state = {
      email : '',
      password : '',
      firstName : '',
      lastName : '',
      address : '',
      contactNumber : '',
      confirmPassword : '',
      modalVisible : false,
    }
  }

  login = async () =>
  {
    var email = this.state.email;
    var password = this.state.password;

    if (email && password)
    {
      try
      {
        const response = await firebase.auth().signInWithEmailAndPassword(email ,password)
        if(response)
        {    
          console.log("Hello Aditi")
          if(Platform.OS !== 'android')
          {
            Alert.alert('Welcome');
          }
          else
          {
            ToastAndroid.show('Welcome', ToastAndroid.SHORT );
          }
          console.log("Hello Aditi")
          this.props.navigation.navigate("HomeScreen")
        }
      }

      catch(error)
      {
        switch (error.code) 
        {
          case 'auth/user-not-found':

            if(Platform.OS === 'android')
            {
              ToastAndroid.show('Invalid Username/Password', ToastAndroid.SHORT );
            }
            else
            {
              alert('Invalid Username/Password');
            }

            this.setState({
              email : '',
              password : '',
            })
            break

          case 'auth/invalid-email':

            if(Platform.OS === 'android')
            {
              ToastAndroid.show('Invalid Username/Password', ToastAndroid.SHORT );
            }
            else
            {
              alert('Invalid Username/Password');
            }

            this.setState({
              email : '',
              password : '',
            })
            break
        }
      }
    }
    
    else
    {
      if(Platform.OS === 'android')
      {
        ToastAndroid.show('Please Enter Username/Password', ToastAndroid.SHORT );
      }
      else
      {
        alert('Please Enter Username/Password');
      }
    }
  }

  signUpUser = () => {
    var email = this.state.email;
    var password = this.state.password;
    var confirmPassword = this.state.confirmPassword;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var contactNumber = this.state.contactNumber;
    var address = this.state.address;

    if(password !== confirmPassword )
    {
      return Alert.alert(" Password Does Not Match ");
    }
    else
    {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => 
      {
          db.collection('Users').add({
            firstName : firstName,
            lastName : lastName,
            fullName : firstName + " " + lastName,
            email : email,
            address : address,
            contact : contactNumber,
          })

          this.setState({
            modalVisible : false,
          })

          if( Platform.OS === 'android' )
          {
            ToastAndroid.show("Welcome" + firstName + " " + lastName, ToastAndroid.SHORT );
          }
          else
          {
            return Alert.alert( "Welcome" + firstName + " " + lastName );
          }
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
  
          return Alert.alert(errorMessage);
      })
    }
  }

  showModal = () =>
  {
    var modalVisible = this.state.modalVisible;

    return(
      <Modal visible = { modalVisible } animationType = { 'slide' } transparent = { true } >
        <View style = {{ width : '100%', height : '100%', backgroundColor : '#ffffff', alignSelf : 'center',  borderRadius : 15,}}>
          <View style = { styles.LoginView }>
            <Text style = {[ styles.LoginText, { marginTop : '5%', fontSize : 26, } ]}>REGISTRATION</Text>
            <TextInput style = { styles.FormInput } placeholder = { 'First Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ firstName : data }) }}/>
            <TextInput style = { styles.FormInput } placeholder = { 'Last Name' } maxLength = { 15 } onChangeText = {(data) => { this.setState({ lastName : data }) }} />
            <TextInput style = { styles.FormInput } placeholder = { 'Contact-Number' } maxLength = { 10 } keyboardType = { 'numeric' } onChangeText = {(data) => { this.setState({ contactNumber : data }) }} />
            <View style = { styles.FormInput }>
              <TextInput style = {{ fontSize : 18, }} placeholder = { 'Address' } multiline = { true } onChangeText = {(data) => { this.setState({ address : data }) }} />
            </View>
            <TextInput style = { styles.FormInput } placeholder = { 'Email' } maxLength = { 30 } onChangeText = {(data) => { this.setState({ email : data.toLowerCase() }) }} value = { this.state.email }/>
            <TextInput style = { styles.FormInput } placeholder = { 'Password' } secureTextEntry = { true } maxLength = { 30 } onChangeText = {(data) => { this.setState({ password : data }) }} value = { this.state.password }/>
            <TextInput style = { styles.FormInput } placeholder = { 'Confirm Password' } secureTextEntery = { true } maxLength = { 30 } onChangeText = {(data) => { this.setState({ confirmPassword : data }) }} />
          </View>
          <View>
            <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.signUpUser() }}>
              <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}> Register </Text>
            </TouchableOpacity>
            <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.setState({ 'modalVisible' : false}) }}>
              <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render()
  {
    return (
      <View>
        { this.showModal() }
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
            <Text style = {[ styles.LoginText, { marginTop : '10%', } ]}> EMAIL / USERNAME </Text>
            <TextInput value = { this.state.email } style = { styles.LoginInput } placeholder = { 'abc@example.com' } onChangeText = {( data ) => { this.setState({ email : data, }) }} />
            <Text style = {[ styles.LoginText, { marginTop : '5%', } ]}> PASSWORD </Text>
            <TextInput value = { this.state.password } style = { styles.LoginInput } placeholder = { '*******' } secureTextEntry = { true } onChangeText = {( data ) => { this.setState({ password : data, }) }} onEndEntry = {() => { this.login() }} />
          </View>

          <View>
            <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => {  this.login() }} >
              <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style = { styles.buttonWrapper } onPress = {() => { this.setState({ "modalVisible" : true })}}>
              <Text style = {[ styles.boldRedText, { fontSize : 23, } ]}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}