import React from 'react';
import {View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';



class ChooseChatPartnerRow extends React.Component {
    constructor(props) {
        super(props)
    }
    onSayHello = () => {
        const { onSayHello } = this.props
        if(onSayHello) {
            onSayHello();
        }
    }
    
    render(){
        return(
            <ListItem 
            title={this.props.item.userdata.username}
            onPress={this.onSayHello}/>
        )
    }
    
}

export default ChooseChatPartnerRow