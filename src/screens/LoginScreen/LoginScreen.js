import React from 'react';
import {View} from 'react-native'
import StylesLogin from './StylesLogin';
import {Button, FormLabel, FormInput} from 'react-native-elements'
import firebase from 'react-native-firebase'

class LoginScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            mail:'',
            password: '',
        }
        this.onChangeMail = this.onChangeMail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
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
        } catch(error) {
            return
        }

        firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).then((info) => {
            if (err) {
                console.log(err)
            } else {
                this.props.navigator.dismissModal()
            }
        })

        
    }

    onChangeMail(mailFormInput) {
        this.setState({mail: mailFormInput})
        
    }

    onChangePassword(passwordFormInput) {
        this.setState({password: passwordFormInput})
        
    }

    render(){
        return(
            <View style={StylesLogin.container}>
            <FormLabel>Mail</FormLabel>
            <FormInput onChangeText={this.onChangeMail}/>
            <FormLabel>Password</FormLabel>
            <FormInput 
            secureTextEntry={true} 
            onChangeText={this.onChangePassword}/>
            <Button
            onPress={this.onResetTo}
            title="Login"/>
            <Button
            onPress={()=>this.props.navigator.push({
                screen: 'urcal.SignUpScreen',
            })}
            title="Sign up"/>
            </View>
        )
    }
}

export default LoginScreen;