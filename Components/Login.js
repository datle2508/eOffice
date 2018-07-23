import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
import HomeScreen from './HomeScreen';


export default class Login extends Component {
    
    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
                
                    <Image resizeMode="contain" style={styles.logo} source={require('./images/Logo.png')} />
                  {/* <Text style={styles}>Sổ tay danh bạ</Text> */}
                    </View>
               <View style={styles.formContainer} >
                   <LoginForm />
               </View>
               
         
            </KeyboardAvoidingView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#2c3e50',
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
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
})




