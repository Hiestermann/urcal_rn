import React from 'react';
import {View, FlatList, Text, TouchableHighlight} from 'react-native'
import StylesChat from './StylesChat';
import firebase from 'react-native-firebase';
import {Navigation} from 'react-native-navigation';
import { ListItem } from 'react-native-elements';

import ChatInfo from '../../components/User';

class ChatScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loggedIn: false,
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {   
        console.log(event)

        if (event.id === 'topRight') {
            this.props.navigator.push({
                screen: 'urcal.ChatScreen.ChatPartner'
            });
        }
    }

    componentWillMount(){
        this.props.navigator.setButtons({
            rightButtons: [{
                title: 'new Chat',
                id: 'topRight',
                icon: require('../../../img/edit.png'),
            }],
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user == null) {
                this.props.navigator.showModal({
                    screen: 'ucral.LoginScreen',
                }); 
            } else {
                firebase.messaging().requestPermissions()
                firebase.messaging().getToken().then((currentToken) => {
                    let userRef = firebase.database().ref().child("user").child(user._user.uid).child("userdata");

                    userRef.update({userToken: currentToken});
                })
                this.loadChats();
            }
        });
            
    }

    setupBadgeNumber = () => {
        let badageNumber = firebase.messaging().getBadgeNumber().then(badageNumber => {
            badageNumber += 1;
            firebase.messaging().setBadgeNumber(badageNumber);
        });
        
       
    }

    loadChats = () => {
        uid = firebase.auth().currentUser.uid;
        ref = firebase.database().ref().child('user').child(uid).child('chats');
        var data = this.state.data;
        ref.on('child_added',(snapshot) => {
            
            var chatInfo = snapshot;
            chatInfo.chatID = snapshot._childKeys[0];
            chatInfo.userdata = snapshot.key;

            this.setupBadgeNumber()
            var userdata = this.getUserData(snapshot.key).then((snapshot) => {
                chatInfo.username = snapshot.username;     
            });
            
            data.push(snapshot);            

        });
        this.setState({data: data});
    }

    getUserData = (key) => {

        var userdataRef = firebase.database().ref().child('user').child(key).child('userdata')
           return  userdataRef.once('value').then((snapshot) => {
                return snapshot.val();
        });
    }

    componentDidMount() {
        if (this.props.chatID !== undefined) {
            this.loadChats();
            this.props.navigator.push({
                screen: 'urcal.ChatScreen.Chat'
            });
        }  
    }

    componentWillReceiveProps(props) {
        firebase.messaging().onMessage(()=> console.log('Hllo'))
    }
   
    componentDidUpdate(prevProps, prevState) {
        firebase.messaging().onMessage(()=> console.log('Hllo'))
    }

    choseChat = (data) => {
        console.log(data)
        this.props.navigator.push({
            screen: 'urcal.ChatScreen.Chat',
            passProps: {chatID : data.item.chatID}
          });
    }

    render(){
        return(
            <View style={StylesChat.container}>
             <FlatList
                alwaysBounceVertical={true}
                data={this.state.data}
                enableEmptysections
                renderItem={(data) => <ChatRow {...data} onChoseChat={() => this.choseChat(data)}/> }
                keyExtractor={() => Math.random()}/>
            </View>
        )
    }
}


class ChatRow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props)
    }

    onChoseChat = () => {
        const { onChoseChat } = this.props;
        if(onChoseChat) {
            onChoseChat();
        }
    }
    render() {
        return(
            <TouchableHighlight onPress={this.onChoseChat}>
                <ListItem
                title={this.props.item.username}></ListItem>
            </TouchableHighlight>
        )
    }
}

export default ChatScreen;