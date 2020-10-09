import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
import Test from '../screens/Test'
import HomeScreen from '../screens/Home'
import RegisterUsScreen from '../screens/RegistroUs'
import RegisterProfScreen from '../screens/RegistroProf'
import ForgotPassword from '../screens/ForgotPassword'
const screens = {
    Test:{
        screen:Test
    },
    Login: {
        screen: LoginScreen
    },
    Register:{
        screen:RegisterScreen
    },
    Home:{
        screen:HomeScreen
    },
    Forgot:{
        screen:ForgotPassword
    }
}
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);