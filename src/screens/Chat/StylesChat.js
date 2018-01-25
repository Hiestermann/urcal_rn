
import {StyleSheet, Dimensions, Platform} from 'react-native';

const StylesChat = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...Platform.select({
          ios: {
            paddingTop: 10,
          },
          android: {
          },
        }),
      },
});

export default StylesChat;