import React from 'react';
import {View, Alert} from 'react-native';
import StylesProfile from './StylesProfile';
import {Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

class ProfileScreen extends React.Component {
    
    constructor(props) {
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {   
        console.log(event)

        if (event.id === 'topRight') {
            this.logoutAlert()
        }
    }

    logoutAlert = () => {
        Alert.alert(
            'Logout',
            'Wirklich ausloggen?',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'OK', onPress: () => this.logout()},
            ],
            { cancelable: false }
          )
    }

    componentWillMount(){
        this.props.navigator.setButtons({
            rightButtons: [{
                title: 'Logout',
                id: 'topRight',
            }],
        });
    }

    logout(){

        uid = firebase.auth().currentUser.uid;
        let userRef = firebase.database().ref().child('user').child(uid).child('userdata')
        userRef.update({userToken: ''}).then(() => {
            firebase.auth().signOut().then(() => {
                firebase.messenger().deleteInstanceId()
                this.props.navigator.showModal({
                    screen: 'ucral.LoginScreen',
                });
            }); 
        });
    }
    
    render(){
        return(
            <View style={StylesProfile.container}>
            </View>
        )
    }
}

export default ProfileScreen;