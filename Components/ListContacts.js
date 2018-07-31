import React, {Component} from 'react';
import{View,StyleSheet,TextInput,ListView,Text,ActivityIndicator,Alert,Button,AsyncStorage,FlatList,
  TouchableOpacity,reject,Image,Keyboard,ScrollView} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar,List,ListItem } from 'react-native-elements';
import CONSTANTS from "./Constants"
import Highlighter from 'react-native-highlight-words';
//history = new Array(5);

var history = [];
var myArray2 = new Array(5);

export default class ListContacts extends React.Component {

        constructor(props){
          super(props);
          this.state={isLoading: true,search:'',isLoadingMore: false,page:1,showhis: false,
          dataSource :new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
          finalpage:false
          
        }
          this.arrayholder = [] ;
        }
        
      componentWillMount(){

      }
        _fetchMore() {
          if (!this.state.isLoadingMore&&!this.state.finalpage) {
            this.setState({isLoadingMore: true})
          fetch(CONSTANTS.PS_URL
            ,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                {peopleSoft:{
                      'function':'employee',
                      'employeeName': this.state.search,
                      "msgID":CONSTANTS.MSG_ID_PS,
                      'pageSize': CONSTANTS.PAGE_SIZE,
                      'pageNumber': this.state.page+1
                          }
                 }
               ) 
            })
              .then((response) => response.json())
              .then((responseJson) => {
                if(responseJson.peopleSoft.employee.length >0 ){

                  mang = mang.concat(responseJson.peopleSoft.employee)
                  this.arrayholder = mang 
                  this.setState({
                    isLoadingMore:false,
                    finalpage:false,
                    dataSource: this.state.dataSource.cloneWithRows(mang),
                    page:this.state.page +1
                  });
                }
                else{
                  this.setState({finalpage:true})
                }
              })
              .catch((error) => {
                
                Alert.alert(error.message);
                reject(new Error(`Unable to retrieve events.\n${error.message}`));
                console.error(error);
              });
            }
        }

        ListViewItemSeparator = () => {
            return (
              <View
                style={list.separator}
              />
            );
          }
          passHis (his) {
            this.setState({showhis: false,search:his});
            this.SearchFunction(his);
            
          }
          onfocus () {
            this.setState({showhis: true})
          }
          onblur () {
            
            this.setState({showhis: false});
          }
          saveData(value) {
            history = history.reverse();
            if(history.length>CONSTANTS.MAX_HIS)
            {
              history.splice(0,1) ;
            }
            //var pos =  history.every((item) => item.id !== ticketId);
            if(history.every((item) => item !== value))
            {
              
              AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
              console.log('save1 '+ JSON.stringify(history.concat(value)))
            }
            else
            {
              history.splice(history.indexOf(value),1);
              AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
              console.log('save2 '+ JSON.stringify(history.concat(value)));
            }


            //AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
            //console.log('save '+ JSON.stringify(history.concat(value)));
              
            //AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
            // if(history.length>CONSTANTS.MAX_HIS)
            // {
            //   history.splice(0,1) ;
            // }
            // if(history.every((item) => item == value)){
            //   AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
            //   console.log('save '+ JSON.stringify(history.concat(value)))
            // }else
            // {
            //   //delete old value
            //   history.splice(history.indexOf(value),1);
            //   AsyncStorage.setItem('historylist',JSON.stringify(history.concat(value)));
            //   console.log('save '+ JSON.stringify(history.concat(value)));

            // }
            //console.log('save exisst ')
            

              
          }
          getData(){
            history =[]
            AsyncStorage.getItem("historylist").then((myArray2) => {
              if (myArray2!=null){

                history = JSON.parse(myArray2).reverse();
                console.log('get '+ JSON.parse(myArray2));
                //history.push(JSON.parse(myArray2)) ;
                //this.setState({"historylist": JSON.parse(myArray2) });
              }
              
               
            }).done();
            
          }
          
          renderSectionHeader(sectionData, sectionID) {
            return (
              <View style={styles.section}>
                <Text style={styles.sectionText}>{sectionID}</Text>
              </View>
              )
          }
          GetListViewItem (department, firstName,lastName,name,position,avatar,workphone,phonenumber,email) {
             this.props.navigation.navigate("ContactDetail",
             { department:department,firstName:firstName,lastName:lastName,name: name,position:position,avatar:avatar,email:email,workphone:workphone,phonenumber:phonenumber });
           
           }
           SearchFunction(text){
            Keyboard.dismiss();
            this.onblur();
            this.saveData(text);
            this.getData();
            fetch(CONSTANTS.PS_URL
            ,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                {peopleSoft:{
                      'function':'employee',
                      'employeeName': text,
                      "msgID":CONSTANTS.MSG_ID_PS,
                      'pageSize': CONSTANTS.PAGE_SIZE,
                      'pageNumber':'1'
                          }
                 }
               ) 
            })
              .then((response) => response.json())
              .then((responseJson) => {
                //Alert.alert(JSON.stringify(responseJson))
                
                if(responseJson.peopleSoft.employee.length >0 ){
                  let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                  mang = responseJson.peopleSoft.employee
                  this.setState({
                    isLoadingMore:false,
                    isLoading: false,
                    finalpage: false,
                    dataSource: this.state.dataSource.cloneWithRows(mang)
                  }, function() {
                    this.arrayholder = mang ;
                  });
                }
                else
                {

                  mang = responseJson.peopleSoft.employee
                  this.setState({isLoadingMore:false,isLoading: false,finalpage:true,
                    dataSource: this.state.dataSource.cloneWithRows(mang)
                  }, function() {
                    this.arrayholder = mang ;
                  });
                }


              })
              .catch((error) => {
                
                Alert.alert(error.message);
                reject(new Error(`Unable to retrieve events.\n${error.message}`));
                console.error(error);
              });
        }
        componentDidMount() {
          this.getData();
             fetch(CONSTANTS.PS_URL
            ,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               },
               body: JSON.stringify(
                {peopleSoft:{
                      'function':'employee',
                      'employeeName': this.state.search,
                      "msgID":CONSTANTS.MSG_ID_PS,
                      'pageSize': CONSTANTS.PAGE_SIZE,
                      'pageNumber': this.state.page
                          }
                 }
               ) 
            })
              .then((response) => response.json())
              .then((responseJson) => {
                //Alert.alert(JSON.stringify(responseJson))
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                mang = responseJson.peopleSoft.employee
                this.setState({
                  isLoading: false,
                  dataSource: this.state.dataSource.cloneWithRows(mang)
                }, function() {
                  this.arrayholder = mang ;
                });
              })
              .catch((error) => {
                
                Alert.alert(error.message);
                reject(new Error(`Unable to retrieve events.\n${error.message}`));
                console.error(error);
              });
            }

                
        render() {
            if (this.state.isLoading) {
                return (
                  <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                  </View>
                );
              }
              if (this.state.showhis) {
                return (

                  <View style={list.header}>
                    {/* <Text style={list.Appname}>Contacts</Text> */}
                    {/* <Icon name="ios-search" size={20} color="#000"/> */}
                      <View style={list.searchcontainer}>
                      <View style={list.SectionStyle}>
                      <View style={{margin:5}}>
                      <Icon name= 'search'margin = {5}  size={20} color="#AAAAAA" />
                      </View >
                      <TextInput style={list.search}
                        placeholder="Search"
                        returnKeyType="search" 
                        underlineColorAndroid='transparent'
                        clearButtonMode="while-editing"
                        onFocus={(search)=>this.onfocus()}
                        //onBlur={(search)=>this.onblur()}
                        //onChangeText ={(search)=>this.saveData({search})}
                          onChangeText={(search)=>this.setState({search})}
                          onSubmitEditing={(event) =>this.SearchFunction(this.state.search)}
                        value={this.state.search}
                      />
                       </View>
                      
                      </View>
                      <Text style={{ fontWeight:'bold',paddingLeft:10, paddingTop:10,paddingBottom:0}}>RECENT SEARCHES</Text>
                      <ScrollView>
                    <List>
                      {
                        history.map((item, i) => (
                          <ListItem
                            key={i}
                            title={item}
                            underlayColor = '#FFFFFF'
                            onPress={() => this.passHis(item)}
                            //onPress={() => this.goto(item.appScreen)}
                          />
                        ))
                      }
                      </List>
                      </ScrollView>
                      </View>


                  );
              }
              

          return (

          <View style={list.header}>
            {/* <Text style={list.Appname}>Contacts</Text> */}
            {/* <Icon name="ios-search" size={20} color="#000"/> */}
              <View style={list.searchcontainer}>
              <View style={list.SectionStyle}>
              <View style={{margin:5}}>
              <Icon name= 'search'margin = {5} size={20} color="#AAAAAA" />
              </View>
              <TextInput style={list.search}
                placeholder="Search"
                returnKeyType="search" 
                underlineColorAndroid='transparent'
                clearButtonMode="while-editing"
                onFocus={(search)=>this.onfocus()}
                onBlur={(search)=>this.onblur()}
                
                // onChangeText={(search) =>
                //   this.setState({ search }, () => this.SearchFunction(this.state.search))}
                  onChangeText={(search)=>this.setState({search})}
                  //onChangeText ={(search)=>this.saveData({search})}
                  onSubmitEditing={(event) =>this.SearchFunction(this.state.search)}
                //onChangeText={(search)=>this.setState({search})}
                //onSubmitEditing={(event) =>this.SearchFunction(this.state.search)}
                // onSubmitEditing={
                value={this.state.search}
              />
               </View>
              </View>
            
      
        <ListView TouchableHighlight style={list.container}
          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) =>
 
            <View style={{flex:1, flexDirection: 'row', padding: 5}} >
              <TouchableOpacity style={{flex:1, flexDirection: 'row'}}
               onPress={this.GetListViewItem.bind(this,rowData.deptName3+' '+rowData.deptName4,rowData.firstName,rowData.lastName,rowData.nameDisplay,rowData.officerDescr,rowData.label,rowData.phoneOffice,rowData.phonePersonal,rowData.emailAddr)}>
                    <Avatar
                    containerStyle={{ marginTop: 10,marginBottom: 10}}
                medium
                rounded
                title = {rowData.label}
              />
            <View style={{flex:1, flexDirection: 'column'}} >
            <Highlighter style={styles.HeaderContainer}
              highlightStyle={{fontWeight: "bold"}}
              searchWords={[this.state.search]}
              textToHighlight={rowData.nameDisplay} 
              />
            <Highlighter style={styles.rowViewContainer}
              highlightStyle={{fontWeight: "bold"}}
              searchWords={[this.state.search]}
              textToHighlight={rowData.officerDescr} 
              />
              <Highlighter style={styles.rowViewContainer}
              highlightStyle={{fontWeight: "bold"}}
              searchWords={[this.state.search]}
              textToHighlight={rowData.deptName3+' - '+rowData.deptName4} 
              />
              </View>
              </TouchableOpacity>
      
            </View>
      
             }
          enableEmptySections={true}
          style={{marginTop: 10}}
          //onEndReached ={this._fetchMore()}
          onEndReached={ () => this._fetchMore()}
          onEndReachedThreshold={5}
          renderFooter={() => {
            if(!this.state.finalpage){
              return (
                this.state.isLoadingMore && 
                <View style={{ flex: 1 }}>
                  <ActivityIndicator size="small" />
                </View>
              );
            }else if(this.state.dataSource.getRowCount()<=0 ){
              return (
              <View style={{ flex: 1 }}>
              <Text>No record found</Text>
            </View>
            );
            }
          }}
        />
          
              </View>
          );
        }
      }
      const styles = StyleSheet.create({
 
        MainContainer :{
        
         justifyContent: 'center',
         flex:1,
         margin: 7,
        
         },
         HeaderContainer: {
          padding: 5,
          fontSize: 17,
          height: 30,
         },
        rowViewContainer: {
          padding: 5,
          fontSize: 12,
          height: 25,
         },
         textViewContainer: {
          padding: 2,
          fontSize: 14,
          paddingLeft: 10,
          color:'grey'
         },
        
         TextInputStyleClass:{
          padding: 10,
          fontSize: 18,
          height: 44,
          borderWidth: 1,
          borderColor: '#009688',
          borderRadius: 7 ,               
          }
        
       });
      const list = StyleSheet.create({

        container: {
          backgroundColor: '#FFFFFF',
          marginTop: 60
      },
      separator: {
          height: StyleSheet.hairlineWidth,
          backgroundColor: '#AAAAAA',
      },

        header: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          paddingTop: 2,
          paddingRight:5,
          paddingLeft: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 1
         },
      
        Appname: {
          //flex: 1,
          fontSize: 20,
          fontWeight: 'bold',
          paddingBottom: 10,
          paddingLeft: 10,
          color:'black'
          //backgroundColor: 'red',
         },
         searchcontainer: {
          //backgroundColor: '#F5FCFF',
          //borderWidth:1,
         // borderColor:'#FFFFFF',
          height: 42,
          backgroundColor: '#FFFFFF',

         },
         SectionStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(247,247,247,4.0)',
          borderWidth:1,borderRadius: 20,
          borderColor:'#AAAAAA',
          margin:5,


          

      },
         search: {
          flex:1,
          height: 30,
          padding:0
          //fontSize:12,
         },
        container: {
         flex: 1,
         paddingTop: 22
        },
        sectionHeader: {
          paddingTop: 2,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 2,
          fontSize: 14,
          fontWeight: 'bold',
          backgroundColor: 'rgba(247,247,247,1.0)',
          
        },
        item: {
          padding: 10,
          fontSize: 18,
          height: 44,
        },
      })