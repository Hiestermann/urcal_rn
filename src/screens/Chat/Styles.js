import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    inputtoolbar:{
        flex: 1,
        height: 200,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
    },
    modalStyle:{
        height: 600,
        justifyContent: 'flex-end',
        backgroundColor: 'red',
    },
    buttonDismissImagePicker:{
        backgroundColor: 'green',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    actionButtonStyle: {
        paddingLeft: 3, 
        paddingRight: 3
    }
})

export default styles;