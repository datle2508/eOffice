/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert,Dimensions,TouchableOpacity,Image,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { List,ListItem,Header,Tile, Avatar } from 'react-native-elements'
import img from './images/Cover.png';


type Props = {};
const list = [
  {
    title: 'Contacts',
    subtitle:'',
    icon: 'book',
    appScreen:'ListContacts'
  },
  {
    title: 'Send SMS',
    subtitle:'',
    icon: 'inbox',
    appScreen:'SendSMS'
  },
  {
    title: 'Settings',
    subtitle:'',
    icon: 'gear',
    appScreen:'Settings'
  },
  {
    title: 'Personalize',
    subtitle:'',
    icon: 'user',
    appScreen:'ChangePass'
  }
]

export default class Home extends Component<Props> {
    constructor(props){
        super(props);
        fullName = this.props.navigation.state.params.fullname;
            department = this.props.navigation.state.params.department;
            phonenumber = this.props.navigation.state.params.phonenumber;
            email = this.props.navigation.state.params.email;

        this.arrayholder = [] ;
        this.state={Username:'',password:''};
    }
    // componentDidMount() {
    //     return fetch('http://192.168.0.108:3000/users')
    //     //return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
          
    //     .then(
          
    //       (response) => response.json())
    //       .then((responseJson) => {
    //         //Alert.alert(JSON.stringify(responseJson))
    //         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //         this.setState({
    //           isLoading: false,
    //           dataSource: ds.cloneWithRows(responseJson),
    //         }, function() {
     
    //           // In this block you can do something with new state.
    //           this.arrayholder = responseJson ;
     
    //         });
    //       })
    //       .catch((error) => {
            
    //         Alert.alert(error.message);
    //         reject(new Error(`Unable to retrieve events.\n${error.message}`));
    //         console.error(error);
    //       });
    //     }
    componentWillMount(){

      BackHandler.addEventListener( "hardwareBackPress",function(){
        return true;
      });
    }

    logout() {
        Alert.alert(
            'Confirm','Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.props.navigation.navigate("LoginForm",{token: '<new token>'} )},
            ]
          )
      }

      goto(appScreen) {
          if(appScreen == 'ListContacts'||appScreen == 'Settings'){
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
<Header
  //leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.saveData(),}}
  backgroundColor ='rgba(213,116,47,1)'
  centerComponent={{ text: 'eOffice', style: { fontSize:20, color: '#fff' } }}
  rightComponent={{ icon: 'lock',underlayColor: 'rgba(213,116,47,1)' , color: '#fff',onPress: () => this.logout(),}}
/>
{/* <Tile
  imageSrc={img}
  title= "Lê Việt Hưng"
  featured
  caption="Phát triển ứng dụng"
/> */}
<Tile
  imageSrc={img}
  title= {fullName}
  contentContainerStyle={{ height: 80 }}
>
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flex: 1, flexDirection: 'column'}}>
    <Text>{department}</Text>
    </View>
  </View>
</Tile>

  <ScrollView showsVerticalScrollIndicator =  {true}>
    <View style={grid_styles.container}>
      {
        list.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={grid_styles.item}
              onPress={() => this.goto(item.appScreen)}
            >
          <Icon name= {item.icon} size={30} color="#4F8EF7" />
              <Text style={grid_styles.itemTitle}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  </ScrollView>


{/* <ScrollView>
        <List>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              underlayColor = '#64b5f6'
              leftIcon={{name: item.icon}}
              onPress={() => this.goto(item.appScreen)}
              
            />

          ))
        }
      </List>
        </ScrollView> */}
</View>
    );
  }
}

var grid_styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  item: {
      width: Dimensions.get('window').width * 0.5,
      height: 100,
      borderWidth: 1,
      borderColor: "lightgray",
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor:'white'       
  },
  itemIcon: {
      width: 100,
      height: 100,
      resizeMode: 'contain'
  },
  itemTitle: {
      marginTop: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flex: 1,
    //backgroundColor : 'green',
    //borderBottomColor : 'grey',
    //borderBottomWidth : 0.1,
    flexDirection:'row'
    //backgroundColor: 'green',
    //boderBottomColor: 'black',
    //boderbottomWidth:1
    
},
});
