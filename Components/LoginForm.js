import React, {Component} from 'react';
import { Button, View, Text,
  StyleSheet,ListView,SectionList,StatusBar,TouchableOpacity,Image,AsyncStorage,reject,
  TextInput,Alert ,KeyboardAvoidingView} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import ListContacts from "./ListContacts";
import ContactDetail from "./ContactDetail";
import ChangePass from "./ChangePass";
import Settings from "./Settings";
import Home from "./Home";
import CONSTANTS from "./Constants"
import { YellowBox,CheckBox } from 'react-native'



YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android,
  fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

 class LoginForm extends React.Component {
  constructor(props){
    super(props);
    isLoggedIn: false
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state={Username:'',password:'',showPassword: true,finger:false}
    this.arrayholder = [] ;
    
}
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _onPressButton() {
    const { Username, password } = this.state;
    //this.props.navigation.navigate('Home'
    fetch(CONSTANTS.LOGIN_URL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(
        {UserInfo:{
              'type':'AD',
              //  'userName': Username,
              //  'passWord': password
              'userName': 'hunglv5',
              'passWord': 'abcd1234@#'
                  }
         }
       ) 
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
          this.arrayholder = responseJson 
  
          if(responseJson.UserInfo.authen == true){
              var fullName = responseJson.UserInfo.fullName
              var email =responseJson.UserInfo.email
              var mobile = responseJson.UserInfo.mobile
              var department =responseJson.UserInfo.department
              //Alert.alert(fullName)

              this.props.navigation.navigate('Home',{
                 fullname: fullName,
                 email:email,
                 mobile:mobile,
                 department:department                
                })
  
          }else{
              Alert.alert('User not exist!!')
          }
          
      })
      .catch((error) => {
        Alert.alert(error.message);
        reject(new Error(`Unable to retrieve events.\n${error.message}`))
        console.error(error);
        
      });
    
}
componentWillReceiveProps(nextProps) {
  if (nextProps.navigation.state.params.token) {
    this.componentDidMount();
  }
}
componentDidMount() {

  AsyncStorage.getItem("Username").then((Username) => {
    if (Username!=null){
      this.setState({"Username": JSON.parse(Username).Username });
    }
  }).done();
  AsyncStorage.getItem("@Setting.finger").then((finger) => {
    if (finger!=null){
      this.setState({"finger": JSON.parse(finger) });
    }
     
  }).done();
}
saveData(value) {
  
  AsyncStorage.setItem("Username" ,JSON.stringify(value));

  this.setState({"Username": value});
}

render() {
    const { navigate } = this.props.navigation;
  //var { navigate } = this.props.navigation;
  if(this.state.finger==false){

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.fcontainer}>
  
                  <View style={styles.loginContainer}>
                  
                      <Image resizeMode="contain" style={styles.logo} source={require('./images/Logo.png')} />
                    {/* <Text style={styles}>Sổ tay danh bạ</Text> */}
                      </View>
                 <View style={styles.formContainer} >
                 <View style={styles.container}>
            <StatusBar barStyle = 'default'/>
            <TextInput style = {styles.input} 
                        autoCapitalize="none" 
                        underlineColorAndroid='transparent'
                        onSubmitEditing={() => this.passwordInput.focus()} 
                        autoCorrect={false} 
                        //keyboardType='email-address' 
                        returnKeyType="next" 
                        placeholder='Username' 
                        onChangeText ={(Username)=>this.saveData({Username})}
                        //onChangeText={(Username)=>this.setState({Username})}
                        value={this.state.Username}
                        placeholderTextColor='rgba(62,62,62,0.7)'/>
  
              <View style = { styles.textBoxBtnHolder }>
                        <TextInput style = {styles.input}   
                                  returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                                  underlineColorAndroid='transparent'
                                  placeholder='Password' 
                                  onChangeText={(password)=>this.setState({password})}
                                  value={this.state.password}
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
                <Text  style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity> 
  
        </View>
                 </View>
              </KeyboardAvoidingView>
    );
  }
  else
  {
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.fcontainer}>
          <View style={styles.loginContainer}>  
              <Image resizeMode="contain" style={styles.logo} source={require('./images/Logo.png')} />
              </View>
              <View style={styles.container} >

              <TouchableOpacity style={styles.fingerContainer}
              onPress={this._onPressButton.bind(this)}>
                <Image resizeMode="contain" style={styles.finger} source={require('./images/finger_print.png')} />
              
          </TouchableOpacity> 
           
          </View>
      </KeyboardAvoidingView>
    );

  }
  
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
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: '#fff',
      showIcon: true,
      showLabel: true,
    }
  }
);

export default class App extends React.Component {
  render() {
    
    return <RootStack />;
  }
}