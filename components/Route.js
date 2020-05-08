import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    Image
     } from 'react-native';
  
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Splash from './Splash';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import{Container,Content,Header,Body} from 'native-base';


class Route extends Component {

    constructor() {
        super()

        this.state = {
            dataSource: [],
            isLoading: true,

        }


    }

    render() {

        return ( <Navigator />);
    }
}

export default Route;




const screens = {


    Splash: {
        screen: Splash,
        header: null,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },
    Login: {
        screen: Login,
        header: null,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },
    Register: {
        screen: Register,
        header: null,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },

    ForgotPassword: {
        screen: ForgotPassword,
        header: null,
        navigationOptions:({navigation}) =>{
            return {
                drawerLabel: ()=> null,
                drawerLockMode:'locked-closed'
            }
        }
    },

    Profile: {
        screen: Profile,
        header: null,
        navigationOptions:({navigation}) =>{
            return {
                title:'Profile'
            }
        }
    }

}
const CustomDrawerContentComponent = props =>(
    <Container>
        <Header style={{height:200,backgroundColor:'#fff'}}>
            <Body>
                <Image style={styles.drawerImage} source = {require('../assets/canadian-wealth.png')}/>
            </Body>
            
        </Header>
        <Content>
            <DrawerItems {...props} />
        </Content>
    </Container>
)

const HomeStack = createDrawerNavigator(screens,{
    contentComponent:CustomDrawerContentComponent,
    initialRouteName:'Splash',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
});

const Navigator = createAppContainer(HomeStack);

const styles = StyleSheet.create({
    
    drawerImage:{
        height:40,
        width:200,
        borderRadius:75
    }
  });