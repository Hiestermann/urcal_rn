import React, { Component } from 'react';
import {
  CameraRoll,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Modal,
  Button,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Send } from 'react-native-gifted-chat';
//import CameraRollPicker from 'react-native-camera-roll-picker';
import styles from './Styles';
//import PropTypes from 'prop-types';

class ActionButtons extends Component {
  constructor(props){
    super(props)
    this._images = [];
    this.state={
      modalIsActive: false
    }
    this.selectImages = this.selectImages.bind(this)
  }

  handleLike = () => {
    var messages = [
      {
      _id: Math.round(Math.random() * 1000000),
      type: 'like',
      text: '👍',
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    }]
    this.props.onSend(messages)
  }

  handleCalendar = () => {
    var messages = [
      {
      _id: Math.round(Math.random() * 1000000),
      type: 'calendar',
      text: 'Name of the Event',
      createdAt: new Date(),
      system: true,
    }]
    this.props.onSend(messages)
  }

  handleList= () => {
    console.log(this.props)
    // this.props.navigator.push({
    //   screen: 'urcal.ChatScreen.ListScreen', 
    // })
    // var messages = [
    //   {
    //   _id: Math.round(Math.random() * 1000000),
    //   type: 'navicon',
    //   text: 'Name of the List',
    //   createdAt: new Date(),
    //   system: true,
    // }]
    // this.props.onSend(messages)
  }

  selectImages(images) {
    var messages = [
      {
      _id: Math.round(Math.random() * 1000000),
      type: 'like',
      text: '',
      image: images[0].uri,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    }]
    this.props.onSend(messages)
    this.setState({modalIsActive: false})
  }

  setImages(images) {
    this._images = images;
  }

  render() {
    return (
      <View style={styles.inputtoolbar}>
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='like'
               type='evilicon'
               size={50}
               color='#517fa4'
               onPress={this.handleLike}
               />
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='ios-pin-outline'
               type='ionicon'
               size={40}
               color='#517fa4'
               onPress={this.handleList}
               />
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='calendar'
               type='evilicon'
               size={50}
               color='#517fa4'
               onPress={this.handleCalendar}
               />
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='navicon'
               type='evilicon'
               size={50}
               color='#517fa4'
               onPress={this.handleList}
               />
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='camera'
               type='evilicon'
               size={45}
               color='#517fa4'
               onPress={() => console.log('hello')}
               />
               <Icon
               iconStyle={styles.actionButtonStyle}
               name='image'
               type='evilicon'
               size={45}
               color='#517fa4'
               onPress={() => this.setState({modalIsActive : true})}
               />
               <Send
               {...this.props}
               />
               <Modal 
               visible={this.state.modalIsActive}
               transparent={false}
               animationType={'slide'}>
                <View style= {styles.modalStyle}>
                  {/* <CameraRollPicker
                  maximum={10}
                  imagesPerRow={4}
                  callback={this.selectImages}
                  selected={[]}
                  /> */}
                  <Button 
                  style={styles.buttonDismissImagePicker} 
                  title='X'
                  onPress={()=> {
                    this.setState({modalIsActive: false})
                    
                  }}/>
                </View>
               </Modal>
            </View>
    );
  }
}

// ActionButtons.defaultProps = {
//   onSend: () => {}
// }

// ActionButtons.propTypes = {
//   onSend: PropTypes.func,
// };

export default ActionButtons;

