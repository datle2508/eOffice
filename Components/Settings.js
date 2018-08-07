/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert,AsyncStorage,BackHandler} from 'react-native';
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
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
        })
        .catch(error => {
          Alert.alert('Authentication Failed');
        });
  
      }
      checkBioSupported(){
      }

     async saveData(value) {
      this.setState({"finger": value});
      await              
          TouchID.isSupported()
            .then(biometryType => {
            // Success code
            if (biometryType === 'FaceID') {
                console.log('FaceID is supported.');
                
            } else {
              TouchID.authenticate('Put the finger on scanner to login',CONSTANTS.BIO_CONFIG)
              .then(success => {
                AsyncStorage.setItem("@Setting.finger" ,JSON.stringify(value));
              })
              .catch(error => {
                this.setState({"finger": !value});
                Alert.alert('Authentication Failed');
              });
                console.log('TouchID is supported.');
            }
            AsyncStorage.setItem("@Setting.bioType" ,JSON.stringify(biometryType));
          })
          .catch(error => {
            this.setState({"finger": !value});
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
  componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
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
