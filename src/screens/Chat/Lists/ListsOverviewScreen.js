import React from 'react';
import { View, StyleSheet, Dimensions , FlatList, Keyboard, TextInput} from 'react-native';

import {List, ListItem, Button, Platform} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import exampleData from './exampleData'

const {height, width} = Dimensions.get('screen')

export default class ListsOverviewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: exampleData,
            showNewListTextInput: false
        }
    }

    handleDeleteListElement = (index) => {
        console.log(index)
        arr = this.state.data
        console.log(arr)
        arr.splice(index, 1)
        this.setState({
            data: arr,
          });
    }

    componentWillMount(){
        Keyboard.addListener('keyboardWillShow', this.keyboardDidShow.bind(this))
        Keyboard.addListener('keyboardWillHide',  this.keyboardDidShow.bind(this))

        Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
        Keyboard.addListener('keyboardDidHide', () => this.setState({keyboardActive: false}))

    }

    keyboardDidShow(e) {
        keyboardHeight = e.endCoordinates.height
        this.setState({
            ...this.state,
            keyboardActive: true
        })        
    }

    renderBottomComponent(){
        if (this.state.showNewListTextInput) {
            return(
                <View style={styles.newListtextInput}>
                    <TextInput/>
                </View>
            )
        }
    }

    render() {
        if(this.state.data.length === 0){
            return(
                <Button
            buttonStyle={styles.addListButton}
            icon={{name: 'squirrel', type: 'octicon', buttonStyle: styles.someButtonStyle }}
            onPress={()=> this.setState({data: exampleData}, () => console.log(this.state))}
            />
            )
        }

        return(
            <View>
            <FlatList
            style={styles.flatListStyle}
            alwaysBounceVertical={true}
            data={this.state.data}
            
            enableEmptysections/>
            <Button
            buttonStyle={styles.addListButton}
            icon={{name: 'squirrel', type: 'octicon', buttonStyle: styles.someButtonStyle }}
            onPress={()=> this.setState({showNewListTextInput: true})}
            />
            {this.renderBottomComponent()}
            </View>

        )
    }
}


class ListElement extends React.Component {
    constructor(props){
        super(props)

    }

    componentDidMount() {
        console.log(Object.keys(this.props.item)[0])
    }

    onDeleteListElement (){
        console.log('works')
        const { onDeleteListElement } = this.props;
        if (onDeleteListElement) {
            onDeleteListElement();
        }
    }

    render(){
        var swipeoutBtns = [
            {
              text: 'Button',
              backgroundColor: 'red',
              onPress: ()=> this.onDeleteListElement()
            }
          ]
        return(
            <Swipeout
            right={swipeoutBtns}
            autoClose>
            <ListItem title={Object.keys(this.props.item)[0]}/>
            </Swipeout>
        )
    }

}

const styles = StyleSheet.create({
    constructor:{
        height: 100,
        backgroundColor: 'red'
    },
    addListButton: {
        position: 'absolute',
        top: height - 70,
        left: width/2 - 45,
        width: 60,
        height:60,
        justifyContent: 'center',
        borderRadius: 30,
    },
    newListtextInput: {
        position: 'absolute',
        top: height - 70,
        left: 0,
        width: width,
        height:60,
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'red',
    },
    flatListStyle: {
        position: 'absolute',
        height: height,
        width: width
    }

})