import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableHighlight,
  Modal,
  ScrollView,
  Button,
  ViewPropTypes,
} from 'react-native';
import {GiftedChat, Send, InputToolbar, SystemMessage, Bubble} from 'react-native-gifted-chat';
import {Icon} from 'react-native-elements';
import CustomSystemMessage from './CustomSystemMessage';
import styles from './Styles'
import ActionButtons from './ActionButtons';
import firebase from 'react-native-firebase'

 class Chat extends Component {

  constructor(props) {
    super(props)
    this._images = [];
    this.state = {
      messages: [],
      modalIsActive: false
    };
    
  }
    
    static navigatorStyle = {
        tabBarHidden: true
    };
    
      componentDidMount() {
        chatID = this.props.chatID
        var ref = firebase.database().ref().child('chats').child(chatID).child('messages');
        ref.on('child_added', (snapshot) => {
          var addMessage = snapshot._value.message          
          this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, addMessage),
            }));
        });
      }
    
      onSend(messages = []) {
        messages[0].user._id = firebase.auth().currentUser.uid
        var sendRef = firebase.database().ref().child('chats').child(this.props.chatID).child('messages')
        sendRef.push({message: messages[0]})
      }

      _renderInputToolbar = (props) =>{
        console.log(props)
          return(
            <ActionButtons {...props}/>
          )
        
      }
      
      _modalImagePicker = () => (
        <View style= {styles.modalContent}>
          <Button style={styles.buttonDismissImagePicker} title='X'/>
        </View>
      )

      renderBubble(props) {
        return (
          <Bubble
            {...props}
          />
        );
      }
    
      renderCustomView(props) {
        return(
          <View/>
        )
      }

      render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            renderSend={()=>{}}
            onSend={(messages) => this.onSend(messages)}
            renderAccessory={this._renderInputToolbar}
            renderBubble={this.renderBubble}
            isAnimated
            renderCustomView={this.renderCustomView}
            renderSystemMessage={(props) => ( <InfoRow {...props}/>
            )}
            user={{
              _id: firebase.auth().currentUser.uid,
            }}
          />
        );
      }
    
}



const InfoRow = (props) => {
console.log(props)
  var type = props.currentMessage.type
  var headerText =  props.currentMessage.text
  
  return(

    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10
    }}>
    <TouchableHighlight
    onPress={() => console.log(props.currentMessage)}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',flexDirection: 'row', width: 300, height: 50, backgroundColor: 'blue', borderRadius: 10, paddingBottom: 5}}>
      <Icon
        iconStyle={{paddingLeft: 5, paddingRight: 5, paddingTop: 10}}
        name={type}
        type='evilicon'
        size={50}
        color='#517fa4'
        onPress={this.handleCalendar}
        />
        <Text> {headerText} </Text>
      </View>
      </TouchableHighlight>
    </View>
  )
}



export default Chat;

// import React from 'react';
// import {GiftedChat} from 'react-native-gifted-chat';
// import firebase from 'react-native-firebase';


// class Chat extends React.Component {
//     constructor(props) {
//         super(props)
//         state = {
//             messages: [],
//         }
//     }
//     static navigatorStyle = {
//         tabBarHidden: true
//     };
    
   

//     componentWillMount() {
//         this.setState({
//           messages: [],
//         });
//       }
    
//       componentDidMount(){
//         // firebase.database().ref().child('chats').child(this.props.navigation.state.params.key).child('messages').on('child_added', (snapshot) => {
//         //   addMessage = snapshot._value.message
//         //   this.setState((previousState) => ({
//         //   messages: GiftedChat.append(previousState.messages, addMessage),
//         //   }));
//         // })
//       }
    
//       onSend(messages=[]) {
//         // message = messages[0]
//         // firebase.database().ref().child('chats').child(this.props.navigation.state.params.key).child('messages').push({message})
       
//       }
    
//       render() {
//         return (
//           <GiftedChat
//             messages={this.state.messages}
//             onSend={(messages) => this.onSend(messages)}
//             user={{
//               _id: firebase.auth().currentUser.uid,
//             }}
//           />
//         );
//       }
// }

// export default Chat;