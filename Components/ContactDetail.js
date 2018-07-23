/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Alert,ScrollView,TouchableOpacity,Linking
} from 'react-native';
import { Avatar } from 'react-native-elements';
import ActionBar from './ActionBar';

export default class ContactDetail extends Component {
    constructor(props){
        super(props);
            avatar = this.props.navigation.state.params.avatar;
            name = this.props.navigation.state.params.name;
            position = this.props.navigation.state.params.position;
            department = this.props.navigation.state.params.department;
            phonenumber = this.props.navigation.state.params.phonenumber;
            workphone = this.props.navigation.state.params.workphone;
            email = this.props.navigation.state.params.email;
        }
        //Alert.alert(name);
    
        callNumber(mobilePhone) {
            this.openURL('tel:' + mobilePhone);
        }
    
        sendMessage(mobilePhone) {
            this.openURL('sms:' + mobilePhone);
        }
    
        sendMail(email) {
            this.openURL('mailto:' + email);
        }
    
        openURL(url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
  render(){
    return (
      <View style={styles.container}>
      
      <View style={styles.header}>
      
      <Avatar
        large
        rounded
        title = {avatar}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
        
        containerStyle={{marginTop: 30,marginBottom : 10}}
      />
      <Text style={styles.appname}>
      {name}
      </Text>
      <Text style={{color:'grey'}}>
      {position}
      </Text>
      <Text style={{color:'grey'}}>
      {department}
      </Text>
      <ActionBar mobilePhone={phonenumber} email={email} />
      </View>
      <View style={styles.emptyList}>
      <Text style={styles.content}>
      phone
      </Text>
      <TouchableOpacity onPress={() => this.callNumber(phonenumber)}>
      <Text style={styles.detail}>
      {phonenumber}
      </Text>
      </TouchableOpacity >
      <Text style={styles.content}>
      work phone
      </Text>
      <TouchableOpacity onPress={() => this.callNumber(workphone)}  >
      <Text style={styles.detail}>
      {workphone}
      </Text>
      </TouchableOpacity>
      <Text style={styles.content}>
      email
      </Text>
      <TouchableOpacity  onPress={() => this.sendMail(email)}>
      <Text style={styles.detail}>
      {email}
      </Text>
      </TouchableOpacity>
              </View>
      </View>
    );
}

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#FAFAFF',
        paddingBottom: 4,
        borderBottomColor: '#F2F2F7',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
  logo: {
    padding:10,
    position: 'absolute',
    width: 200,
    height: 100
  },
  row:{
      //borderBottomColor : 'grey',
      borderBottomWidth : 0.1,
      height: 200,
      flexDirection:'row'
      
  },
  emptyList: {
    flex: 1
},
  icon:{

  },


  appname: {
    fontSize: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems:'center',
    color:'black'
   },

   content: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems:'center',
    color:'black'
   },

   detail: {
    fontSize: 16,
    paddingBottom: 10,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems:'center',
    color:'#4F8EF7',
    borderBottomColor: 'black',
    borderBottomWidth: 1
   },
  label:{
      fontSize:15
  }

})
