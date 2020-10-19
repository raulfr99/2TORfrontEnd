import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import Test from '../screens/Test'
import HomeScreen from '../screens/Home'
import RegisterUsScreen from '../screens/RegistroUs'
import RegisterProfScreen from '../screens/RegistroProf'
import ForgotPassword from '../screens/ForgotPassword'
import Loading from '../screens/Loading'
import SteepScreen from '../screens/StepsScreen'
const screens = {
    Test:{
        screen:Test,
        navigationOptions: {
           
            headerShown: false 
          },
    },
    Login: {
        screen: LoginScreen
        ,
        navigationOptions: {
           
            headerShown: false 
          },
    },
    Register:{
        screen:RegisterScreen
        ,
        navigationOptions: {
           
            headerShown: false 
          },
    },
    Home:{
        screen:HomeScreen
        ,
        navigationOptions: {
           
            headerShown: false,
            
            gesturesEnabled: false 
          },
    },
    Forgot:{
        screen:ForgotPassword
        ,
        navigationOptions: {
           
            headerShown: false 
          },
    }
}
const HomeStack = createStackNavigator(screens);

const AppStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
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