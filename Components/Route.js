import React, {Component} from 'react';
import { View
} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import ListContacts from "./ListContacts";
import LoginForm from "./LoginForm";
import ContactDetail from "./ContactDetail";
import ChangePass from "./ChangePass";
import Settings from "./Settings";
import Home from "./Home";
  
const RootStack =  createStackNavigator(
  {
    LoginForm: {
      screen: LoginForm,
      navigationOptions: () => ({
        header:null
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header:null,
        gesturesEnabled: false,
      }),
    },

    Settings: {
      screen: Settings,
      navigationOptions: () => ({
        title: 'Settings',
        headerBackTitle: 'Settings'
      }),
    },
    ChangePass: {
      screen: ChangePass,
      navigationOptions: () => ({
        title: 'Change Password',
        headerBackTitle: 'Change Password'
      }),
    },
    ListContacts: {
      screen: ListContacts,
      navigationOptions: () => ({
        title: 'Contacts',
        headerBackTitle: ''
      }),
      
    },

    ContactDetail: {
      screen: ContactDetail,
      navigationOptions: () => ({

      }),
    },
  },
  {
    initialRouteName: 'LoginForm',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: '#fff',
      showIcon: true,
      showLabel: true,
    }
  }
);

export default class Route extends Component {
  render() {
    return (
    <RootStack/>
    )
  }
}

  