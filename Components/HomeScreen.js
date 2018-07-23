import React from 'react';
import { Button, View, Text,
  StyleSheet,ListView,SectionList,StatusBar,TouchableOpacity,
  TextInput,Alert } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import ListContacts from "./ListContacts";
import ContactDetail from "./ContactDetail";
import Home from "./Home";
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

function Login(Username,password) {
  return fetch('http://10.36.126.14:11119/Authentication',{
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
            'passWord': '12345678'
                }
       }
     ) 
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      //Alert.alert('Button has been pressed!');
      //Alert.alert( JSON.stringify(responseJson[UserInfo].userName))
      //return responseJson;
      //Alert.alert(JSON.stringify(responseJson))
        // In this block you can do something with new state.
        this.arrayholder = responseJson 

        //Alert.alert(arrayholder)
        if(responseJson.UserInfo.authen == true){
            Alert.alert(JSON.stringify(arrayholder.UserInfo.authen) )
            //this.props.navigation.navigate('HomeScreen')
            //navigation.navigate
            //const { navigate } = this.props.navigation;
            //navigate('ContactDetail', { user: 'John' })
            //this.props.navigation.navigate("ContactDetail",
            //{ name: name,email:email });

        }else{
            Alert.alert('User not exist!!')
        }
        
    })
    .catch((error) => {
      console.error(error);
    });
}
class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    isLoggedIn: false

    this.state={Username:'',password:''}
    this.arrayholder = [] ;
    
}

 
  _onPressButton() {
    const { Username, password } = this.state;

    Login(Username,password)
    
}

render() {
  //var { navigate } = this.props.navigation;
  return (
      
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
                      onChangeText={(Username)=>this.setState({Username})}
                      value={this.state.Username}
                      placeholderTextColor='rgba(62,62,62,0.7)'/>

          <TextInput style = {styles.input}   
                     returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                     underlineColorAndroid='transparent'
                     placeholder='Password' 
                     onChangeText={(password)=>this.setState({password})}
                     value={this.state.password}
                     placeholderTextColor='rgba(62,62,82,0.7)' 
                     secureTextEntry/>
           {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
        <TouchableOpacity style={styles.buttonContainer}
        
         onPress={this._onPressButton.bind(this)}
        >
              <Text  style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity> 
          <Button
          onPress={() => this.props.navigation.navigate('Contacts')}
          title="Register"
        />
      </View>

  );
}
}


const styles = StyleSheet.create({
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
  }
 
});
const RootStack =  createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'HomeScreen',
        headerBackTitle: 'HomeScreen'
      }),
    },
    Contacts: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Home',
        headerBackTitle: 'Home'
      }),
    },
    ContactDetail: {
      screen: ContactDetail,
      navigationOptions: () => ({
        title: 'ContactDetail',
        headerBackTitle: 'ContactDetail'
      }),
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}