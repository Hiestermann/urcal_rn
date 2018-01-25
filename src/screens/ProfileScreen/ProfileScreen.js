import React from 'react';
import {View, AsyncStorage} from 'react-native';
import StylesProfile from './StylesProfile';
import {Button} from 'react-native-elements';
import firebase from 'react-native-firebase';

class ProfileScreen extends React.Component {
    
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
            <Button
                title={'Logout'}
                onPress={this.logout}
            />
            </View>
        )
    }
}

export default ProfileScreen;