/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import { Button, View, Text,
  StyleSheet,ListView,SectionList,StatusBar,TouchableOpacity,Image,AsyncStorage,reject,
  TextInput,Alert ,KeyboardAvoidingView} from 'react-native';
import {icon} from 'react-native-vector-icons' ;
import { List,ListItem} from 'react-native-elements';


type Props = {};


export default class ChangePass extends Component<Props> {
    constructor(props){
        super(props);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.state={Username:'',password:'',re_password:'',showPassword: true};
    }
    _onPressButton() {
        Alert.alert("Change password success!")

    }


    componentDidMount() {
    }
    toggleSwitch() {
      this.setState({ showPassword: !this.state.showPassword });
    }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.fcontainer}>

                <View style={styles.loginContainer}>
                
                    <Image resizeMode="contain" style={styles.logo} source={require('./images/Logo.png')} />
                  {/* <Text style={styles}>Sổ tay danh bạ</Text> */}
                    </View>
               <View style={styles.formContainer} >
               <View style={styles.container}>
          <StatusBar barStyle = 'default'/>
          <View style = { styles.textBoxBtnHolder }>
                      <TextInput style = {styles.input}   
                                returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                                underlineColorAndroid='transparent'
                                placeholder='Current-password' 
                                onChangeText={(cur_password)=>this.setState({cur_password})}
                                value={this.state.cur_password}
                                placeholderTextColor='rgba(62,62,82,0.7)' 
                                secureTextEntry={this.state.showPassword}/>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.toggleSwitch }>
                        <Image source = { ( this.state.showPassword ) ? require('./images/show.png') : require('./images/hide.png') } style = { styles.btnImage } />
                      </TouchableOpacity>
            </View>

            <View style = { styles.textBoxBtnHolder }>
                      <TextInput style = {styles.input}   
                                returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                                underlineColorAndroid='transparent'
                                placeholder='new-password' 
                                onChangeText={(password)=>this.setState({password})}
                                value={this.state.password}
                                placeholderTextColor='rgba(62,62,82,0.7)' 
                                secureTextEntry={this.state.showPassword}/>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.toggleSwitch }>
                        <Image source = { ( this.state.showPassword ) ? require('./images/show.png') : require('./images/hide.png') } style = { styles.btnImage } />
                      </TouchableOpacity>
            </View>

                        <View style = { styles.textBoxBtnHolder }>
                      <TextInput style = {styles.input}   
                                returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                                underlineColorAndroid='transparent'
                                placeholder='Retype-password' 
                                onChangeText={(re_password)=>this.setState({re_password})}
                                value={this.state.re_password}
                                placeholderTextColor='rgba(62,62,82,0.7)' 
                                secureTextEntry={this.state.showPassword}/>
                        <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.toggleSwitch }>
                        <Image source = { ( this.state.showPassword ) ? require('./images/show.png') : require('./images/hide.png') } style = { styles.btnImage } />
                      </TouchableOpacity>
            </View>
           {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
        <TouchableOpacity style={styles.buttonContainer}
        onPress={this._onPressButton.bind(this)}
        >
              <Text  style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity> 
      </View>
               </View>
            </KeyboardAvoidingView>
  );
}
}


const styles = StyleSheet.create({
    fcontainer: {
        flex: 1,
        marginBottom: 200,
        //backgroundColor: '#2c3e50',
    },
  container: {
   padding: 20
  },
  input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      //backgroundColor: 'white',
      borderWidth:1,borderRadius: 5,
      borderColor:'black',
      marginBottom: 10,
      padding: 10,
      color: 'black'
  },
  buttonContainer:{
      backgroundColor: 'rgba(213,116,47,1)',
      paddingVertical: 15
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }, 
  loginButton:{
    backgroundColor:  'yellow',
     //color: '#fff'
  },
  loginContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
    
},
logo: {
    position: 'absolute',
    width: 500,
    height: 200
},
fingerContainer:{
  alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  paddingVertical: 15
},
finger: {
  position: 'relative',
  width: 50,
  height: 50,
  justifyContent: 'center'
},
title:{
    color: "#FFF",
    marginTop: 120,
    width: 180,
    textAlign: 'center',
    opacity: 0.9
},

textBoxBtnHolder:
  {
    position: 'relative',
    //alignSelf: 'stretch',
    justifyContent: 'center'
  },
 
  visibilityBtn:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
 
  btnImage:
  {
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  }
 
});