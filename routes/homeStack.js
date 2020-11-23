import {createStackNavigator} from 'react-navigation-stack';
import { Text,View,StyleSheet,Image } from 'react-native';
import { Icon } from 'react-native-elements'
import * as React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import Test from '../screens/Test'
import HomeScreen from '../screens/Home'
import Chat from '../screens/Chat'
import Perfil from '../screens/Perfil'
import Notificaciones from '../screens/Notificaciones'
import RegisterUsScreen from '../screens/RegistroUs'
import RegisterProfScreen from '../screens/RegistroProf'
import ForgotPassword from '../screens/ForgotPassword'
import Loading from '../screens/Loading'
import Search from '../screens/Search'
import Ofertar from '../screens/Ofertar'
import SteepScreen from '../screens/StepsScreen'
import Ofertas from '../screens/Ofertas'
import ChatMessages from '../screens/ChatMessages'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';



//

const Tabs = createMaterialTopTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: ({tintColor}) => (
        <View style={styles.iconCOntainer}>
          <Icon name="home" color={tintColor} size={25} />
          
        </View>
      ),
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      tabBarLabel: ({tintColor}) => (
        <View style={styles.iconCOntainer}>
          
          <Text style={{color: tintColor,fontSize:12,padding:15}}>Chat</Text>
        </View>
      ),
    },
  },
  Notificaciones: {
    screen: Notificaciones,
    navigationOptions: {
      tabBarLabel: ({tintColor}) => (
        <View style={styles.iconCOntainer}>
         
          <Text style={{color: tintColor,fontSize:8,padding:8}}>Notificaciones</Text>
        </View>
      ),
    },
  },
  Perfil: {
    screen: Perfil,
    navigationOptions: {
      tabBarLabel: ({tintColor}) => (
        <View style={styles.iconCOntainer}>
         
          <Text style={{color: tintColor,fontSize:12,padding:15}}>Perfil</Text>
        </View>
      ),
    },
  },
},
{
  initialRouteName: 'Home',
  lazyLoad: true,
  tabBarPosition: 'top',
  swipeEnabled: true,
  
  tabBarOptions: {
    style: {
      height: 60,
      backgroundColor: 'white',
      
      
     
    },
    indicatorStyle: {
      backgroundColor: 'black',
      
    
    },
    activeTintColor: 'black',
    inactiveTintColor: 'black',
   
  },
},
);
const styles = StyleSheet.create({
  iconCOntainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    
  },
  icon:{
    padding:20,
    
   
  },
  imageIcon:{
    width:30,
    height:30,
    alignSelf:'center',
   
  }
});
//

//
const AppStack = createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions:({ navigation }) => ({
        title: '2TOR',
        headerStyle: {
          backgroundColor: 'white',
         
        },
      
        headerTitleStyle: {
          color: 'gray',
          justifyContent: 'center',
         
        },
        headerRight: (<Icon onPress={() => {navigation.navigate('Search')}} name="search"/>),
        headerRightContainerStyle:{marginRight:15},
        headerTitle:(<Image source={require('../assets/logo.png')} style={styles.imageIcon}/>),
        headerTitleContainerStyle: {  right:0 }
       
        
        
      }),
    },
    Search:{
      screen:Search,
      navigationOptions:{
        title: 'Buscar',
        headerStyle: {
          backgroundColor: 'white',
          
        },
        headerTitleStyle: {
          color: 'gray',
        },
        
      }
    },
    Ofertar:{
      screen:Ofertar,
      navigationOptions:{
        title: 'Ofertar',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'gray',
        },
        
      }
    },
    Ofertas:{
      screen:Ofertas,
      navigationOptions:{
        title: 'Ofertas',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'gray',
        },
        
      }
    },
    ChatMessages:{
      screen:ChatMessages,
      navigationOptions:{
        title: 'Mensajes',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          color: 'gray',
        },
        
      }
    }

  })
  const AuthStack = createStackNavigator({
    Test: {
        screen: Test,
        navigationOptions: {
            headerShown: false,
        },
      },
    Login: {
        
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            headerShown: false,
        },
      },
      Forgot: {
        screen: ForgotPassword,
        navigationOptions: {
            headerShown: false,
        },
      },
      Steps:{
        screen: SteepScreen,
        navigationOptions: {
            headerShown: false,
        },
      }
  })
export default createAppContainer(
    createSwitchNavigator(
      {
        Loading: Loading,
        App: AppStack,
        Auth: AuthStack,
      },
      {
        initialRouteName: "Loading"
      }
    )
  );