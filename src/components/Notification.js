import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';

class Notification extends React.Component {

    constructor (props) {
        super(props);
    }

    componentDidMount(){
    }

  render() {
    return (
      <View style={styles.container}>
        <Text numberOfLines={2} style={styles.title}>{this.props.notification.title}</Text>
        <Text style={styles.content}>{this.props.notification.body}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 50,
    width: 300,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Notification;