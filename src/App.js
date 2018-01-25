/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import { registerScreens } from './screens/index';

registerScreens();

const tabs = [{
  label: 'Profile',
  screen: 'urcal.ProfileScreen',
  icon: require('../img/user-32.png'),
},{
  label: 'Chat',
  screen: 'urcal.ChatScreen',
  icon: require('../img/chat.png'),
},];

Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#d9f8fb',
    tabBarButtonColor: '#898e94',
    tabBarSelectedButtonColor: '#e0b378',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#898e94',
    navBarButtonColor: '#898e94',
    tabBarButtonColor: '#ffffff',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#e0b378',
    navigationBarColor: '#003a66',
    navBarBackgroundColor: '#d9f8fb',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  },
});