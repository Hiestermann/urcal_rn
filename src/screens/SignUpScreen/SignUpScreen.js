import React from 'react';
import {View} from 'react-native'
import StylesLogin from './StylesSignUp';
import {Button, FormLabel, FormInput} from 'react-native-elements'
import firebase from 'react-native-firebase'

class SignUpScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            mail:'',
            password: '',
            username: '',
        }
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setStyle({
            navBarHidden: true
        });
      }

    onResetTo = () => {
        try{
            let mail = this.state.mail;
            let password = this.state.password; 
            let username = this.state.username
        } catch(error) {
            return
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
        .then(() => {
            let uid = firebase.auth().currentUser.uid;
            firebase.database().ref().child("user").child(uid).child("userdata").set({username: this.state.username});
        }).then(this.props.navigator.dismissModal());

        
    }

    onChangeMail(mailFormInput) {
        this.setState({mail: mailFormInput})
        
    }

    onChangeUsername(usernameFormInput) {
        this.setState({username: usernameFormInput})
        
    }

    onChangePassword(passwordFormInput) {
        this.setState({password: passwordFormInput})
        
    }

    render(){
        return(
            <View style={StylesLogin.container}>
            <FormLabel>Mail</FormLabel>
            <FormInput onChangeText={this.onChangeMail}/>
            <FormLabel>Username</FormLabel>
            <FormInput onChangeText={this.onChangeUsername}/>
            <FormLabel>Password</FormLabel>
            <FormInput 
            secureTextEntry={true} 
            onChangeText={this.onChangePassword}/>
            <Button
            onPress={this.onResetTo}
            title="Sign Up"/>
            </View>
        )
    }
}

export default SignUpScreen;