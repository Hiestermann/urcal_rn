import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import ChatScreen from './Chat/ChatScreen';
import ProfileScreen from './ProfileScreen/ProfileScreen';
import LoginScreen from './LoginScreen/LoginScreen';
import ChatPartner from './Chat/ChatPartner';
import Chat from './Chat/Chat';
import ListsOverviewScreen from './Chat/Lists/ListsOverviewScreen';
import SignUpScreen from './SignUpScreen/SignUpScreen';
import firebase from 'react-native-firebase';
import Notification from '../components/Notification';

export function registerScreens() {
   Navigation.registerComponent('urcal.ChatScreen', () => ChatScreen);
   Navigation.registerComponent('urcal.ChatScreen.ChatPartner', () => ChatPartner);
   Navigation.registerComponent('urcal.ChatScreen.Chat', () => Chat);
   Navigation.registerComponent('urcal.ProfileScreen', () => ProfileScreen);
   Navigation.registerComponent('ucral.LoginScreen', () => LoginScreen);
   Navigation.registerComponent('urcal.ChatScreen.ListScreen', () => ListsOverviewScreen);
   Navigation.registerComponent('urcal.SignUpScreen', ()=> SignUpScreen);
   Navigation.registerComponent('urcal.Types.Notification', () => Notification)
   firebase.messaging().onMessage((data) => handleInAppNotification(data));
}

handleInAppNotification = (data) => {
    console.log(data)
    Navigation.showInAppNotification({
        screen: 'urcal.Types.Notification',
        passProps: {notification : data.notification}
      });
}

