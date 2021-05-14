import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Dimensions, Animated, View, Image, TextInput, TouchableOpacity, Platform, ToastAndroid, Modal, Alert, FlatList, TouchableHighlightBase } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import images from '../images.js';
import styles from '../Styles';
import firebase from 'firebase';
import db from '../config.js';
import { Icon, ListItem, Button } from "react-native-elements";
import { SwipeListView } from "react-native-swipe-list-view";
import MyHeader from '../Components/Header.js';

export default class Notifications extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            UserId : firebase.auth().currentUser.email,
            AllNotifications : [],
        } 

        this.dataToFetch = null;
    }

    fetchData = async () =>
    {
        this.dataToFetch = db.collection( "Notifications" ).where("SellerEmail", "==", this.state.UserId).where("Status", "==", "unread").onSnapshot(( snapshot ) =>
            {
                var AllNotifications = snapshot.docs.map(( doc ) => doc.data() )
                this.setState(
                    {
                        "AllNotifications" : AllNotifications,
                    }
                )
            }
        )
    }

    componentDidMount = () =>
    {
        this.fetchData();
    }

    renderItem = ( data ) =>
    {
        return(
            <Animated.View>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title style = { styles.listTitleStyles }>{ data.item.Item }</ListItem.Title>
                        <ListItem.Subtitle style = { styles.listSubtitleStyles }>{ data.item.Message }</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </Animated.View>
        );
    }

    renderHiddenItem = () => (
        <View style = { styles.rowBack }>
          <View style = {[ styles.backRightBtn, styles.backRightBtnRight ]}>
            <Text style = { styles.backTextWhite }>Mark as read</Text>
          </View>
        </View>
    );

    updateMarkAsRead = ( data ) =>
    {
        db.collection( "Notifications" ).doc( data ).update(
            {
                "Status" : "read",
            }
        )
    }

    getId = ( data ) => {
        var ref = this.state.AllNotifications[ data ].Id;

        db.collection( "Notifications" ).where("Id", "==", ref).onSnapshot(( snapshot ) =>
        {
            snapshot.forEach(( doc ) =>
            {
                this.updateMarkAsRead( doc.id )
                Alert.alert( doc.id )
            })
        })

    };

    onSwipeCalled = ( data ) =>
    {
        var AllNotifications = this.state.AllNotifications;
        const { key, value } = data;
        if( value < -Dimensions.get("window").width )
        {
            const newData = [ ...AllNotifications];
            this.getId( key ) ;
            Alert.alert( key )
            newData.splice( key, 1 );
            this.setState({ AllNotifications: newData });
        }
    }

    keyExtractor = (item, index) => index.toString() 

    render()
    {
        return(
            <View>
                {
                    this.state.AllNotifications.length === 0
                    ? (
                        <Button 
                            title =  { <Text style = {{ fontSize : 25, color : '#df2800', fontWeight : "bold", marginVertical : 10, }}>  You Don't Have Any Notifications Right Now </Text> } 
                            style = {{ padding : 10, }} 
                            buttonStyle = {{ backgroundColor : "#fff", margin : 15,  }}
                            icon = { <Icon name = "folder-open" color = "#df2800" type = "font-awesome" size = { 30 } /> }
                            disabled
                            disabledStyle = {{ backgroundColor : "#fff" }}
                        />
                    )
                    : (
                        <View>
                            <MyHeader title = { "Your Notifications" } navigation = { this.props.navigation }/>
                            <SwipeListView
                                disableRightSwipe = { true }
                                data = { this.state.AllNotifications }
                                renderItem = { this.renderItem }
                                renderHiddenItem = { this.renderHiddenItem }
                                rightOpenValue = { -Dimensions.get("window").width }     
                                previewRowKey={ "0" }
                                previewOpenValue = { -40 }
                                previewOpenDelay = { 3000 }
                                onSwipeValueChange = { this.onSwipeCalled }
                                keyExtractor = { this.keyExtractor }           
                            />
                        </View>
                    )
                }
            </View>
        );
    }
}
