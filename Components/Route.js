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
  
  export default class Route extends React.Component {
    render() {
      
      return <RootStack />;
    }
  }