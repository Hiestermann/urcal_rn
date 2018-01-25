import React from 'react';
import {View, FlatList, Text} from 'react-native';
import firebase from 'react-native-firebase';
import ChooseChatPartnerRow from './ChooseChatPartnerRow';


class ChatPartner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        var newDs = [];
        firebase.database().ref().child("user").once().then((snapshot)=>{
            Object.keys(snapshot._value).forEach((k) => {
                var user = snapshot._value[k]
                user.userdata.uid = k
                newDs.push(snapshot._value[k])
                this.setState({data: newDs})
            })
        }
        )
    }

    presentChat = (data) => {
        this.props.navigator.resetTo({
            screen: 'urcal.ChatScreen',
            passProps: {chatID : data.userdata.uid}
          });
    } 

    createNewChat = (data) => {
        var refChat = firebase.database().ref().child('chats')
        var newPostKey = refChat.push({chatName: {users: {[data.userdata.uid]: 1, [firebase.auth().currentUser.uid]: 1 }}}).key;
        var refCurUser = firebase.database().ref().child('user').child(firebase.auth().currentUser.uid).child('chats').child(data.userdata.uid)
        refCurUser.update({[newPostKey]:1})

        var refChatPartner = firebase.database().ref().child('user').child(data.userdata.uid).child('chats').child(firebase.auth().currentUser.uid)
        refChatPartner.once().then((snapshot)=>{
            if(snapshot._value === null){
                refChatPartner.update({[newPostKey]:1}).then(this.presentChat(data))
            } else {
                this.presentChat(data)
            }
        })
        
    }

    sayHello = (data) => {
        firebase.database().ref().child("user").child(firebase.auth().currentUser.uid).child('chats').child(data.userdata.uid).once().then((snapshot)=>{
            if(snapshot._value === null){
                this.createNewChat(data)
                
            } else {
                this.presentChat(data)
            }
        })
    
    }
    render() {
        return(
            <View>
                <FlatList
                alwaysBounceVertical={true}
                data={this.state.data}
                enableEmptysections
                renderItem={(data) => <ChooseChatPartnerRow  {...data} onSayHello={() => this.sayHello(data.item)}/>}
                keyExtractor={() => Math.random()}/>
            </View>
        )
    }
}

export default ChatPartner;