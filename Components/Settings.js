/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert} from 'react-native';
import {icon} from 'react-native-vector-icons' ;
import { List,ListItem} from 'react-native-elements'
import ChangePass from './ChangePass';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



type Props = {};
const list = [
    {
        title: 'Change Password',
        subtitle:'',
        icon: 'lock',
        appScreen:'Changepass'
      },
        {
        title: 'FingerPrint',
        subtitle:'',
        icon: 'fingerprint',
        appScreen:'FingerPrint'
        }
]

export default class Settings extends Component<Props> {
    constructor(props){
        super(props);
        this.arrayholder = [] ;
        this.state={Username:'',password:''};
    }
    

    goto(appScreen) {
        if(appScreen == 'FingerPrint'||appScreen == 'Settings'){
          this.props.navigation.navigate(appScreen)
        }
      else
      {
          Alert.alert("Comming soon!!")
      }
    }
  render() {
    return (
      <View style ={styles.container} >
<List>
          <ListItem
            
            title="Change password"
            onPress={() => this.props.navigation.navigate('ChangePass')}
            
          />
          <ListItem
            switchButton
            switched={this.state.switchState}
            hideChevron
            title="Login with fingerprint"
            onSwitch={(value) => {
              this.setState(previousState => {
                return {previousState,switchState: value}
              })
            }}
          />
        </List>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flex: 1,
    flexDirection:'row'
    
},
});
