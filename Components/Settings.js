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

    saveData(value) {
  
      AsyncStorage.setItem("@Setting.finger" ,JSON.stringify(value));
    
      this.setState({"finger": value});
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
            title="Login with fingerprint"
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
