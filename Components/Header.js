import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, View, Image } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import db from "../config.js";
import firebase from "firebase";
import ThemedListItem from 'react-native-elements/dist/list/ListItem';

export default class MyHeader extends React.Component
{
    constructor( props )
    {
        super( props );
        this.state = {
            "title" : this.props.title,
            "userId" : firebase.auth().currentUser.email,
            "valueBadge" : 0,
        }

        this.dataToFetch = null;
    }

    fetchData = async () =>
    {
        this.dataToFetch = db.collection( "Notifications" ).where("SellerEmail", "==", this.state.userId).where("Status", "==", "unread").onSnapshot(( snapshot ) =>
            {
                var AllNotifications = snapshot.docs.map(( doc ) => doc.data() )
                this.setState(
                    {
                        "valueBadge" : AllNotifications.length,
                    }
                )
            }
        )

    }

    componentDidMount = () =>
    {
        this.fetchData();
        console.log( this.state.valueBadge )
    }

    badgeComponent = () =>
    {
        return(
            <View>
                <Icon name = { "bell" } type = { "font-awesome" } style = {{ marginTop : 6, marginRight : 7, }} onPress = {() => { this.props.navigation.navigate("Notifications") }}/>
                <Badge value = { this.state.valueBadge } status = { "error" } containerStyle = {{ position : "absolute", top : -4, right : -4  }} />
            </View>
        );
    }

    render()
    {
        return (
            <View>
              <Header
                  backgroundColor = { '#ffffff' }
                  leftComponent = {
                      <View>
                        <View style = {{ flexDirection : 'row', width : 18000 }}>
                            <Icon name = { "bars" } type = { "font-awesome" } style = {{ marginTop : 6,  }} onPress = {() => { this.props.navigation.toggleDrawer() }}/>
                            <Text style = {{ fontWeight : "bold", fontSize : 30, marginLeft : 10, }}>{ this.props.title }</Text>
                        </View>
                      </View>
                  }

                  rightComponent = {
                    <View>
                        <View>
                            <this.badgeComponent navigation = { this.props.navigation }/>
                        </View>
                    </View>
                  }
              />
            </View>
        );
    }
}