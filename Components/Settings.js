/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert,AsyncStorage} from 'react-native';
import {icon} from 'react-native-vector-icons' ;
import { List,ListItem} from 'react-native-elements';
import TouchID from 'react-native-touch-id';
import ChangePass from './ChangePass';
import CONSTANTS from "./Constants";


const instructions = Platform.select({
  ios: 'Login with touchid/faceid',
  android:
      'Login with fingerprint',
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
        this.state={ Username:'',password:'',finger: false};
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
    _pressHandler() {
      TouchID.authenticate('Put the finger on scanner to login',CONSTANTS.BIO_CONFIG)
        .then(success => {
          this._onPressButton();
          //Alert.alert('Authenticated Successfully');
          //this.props.navigation.navigate('Home');
        })
        .catch(error => {
          Alert.alert('Authentication Failed');
        });
  
      }

    saveData(value) {
      TouchID.isSupported()
  .then(biometryType => {
    // Success code
    if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
    } else {
      TouchID.authenticate('Put the finger on scanner to login',CONSTANTS.BIO_CONFIG)
      .then(success => {
        AsyncStorage.setItem("@Setting.finger" ,JSON.stringify(value));
        this.setState({"finger": value});
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
        console.log('TouchID is supported.');
    }
  })
  .catch(error => {
    Alert.alert('Biometric login not supported!');
    // Failure code
    console.log(error);
  });

    }
    componentDidMount() {

      AsyncStorage.getItem("@Setting.finger").then((finger) => {
        if (finger!=null){
          this.setState({"finger": JSON.parse(finger) });
        }
         
      }).done();
    }

  render() {
    return (
      <View style ={styles.container} >
      <ScrollView>
<List>
          <ListItem
            
            title="Change password"
            leftIcon={{name: 'refresh',color:"#4F8EF7"}}
            onPress={() => this.props.navigation.navigate('ChangePass')}

            
          />
          <ListItem
            switchButton
            leftIcon={{  name: 'fingerprint',color:"pink", }}
            switched={this.state.finger}
            hideChevron
            title={instructions}
            onSwitch={(value) => this.saveData(value)}
          />

        </List>
        </ScrollView>
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
