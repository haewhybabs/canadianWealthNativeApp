import React,{Component} from 'react';
import { StyleSheet,Image,ActivityIndicator,View} from 'react-native';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import {connect} from 'react-redux';
class Logout extends Component{
    
    constructor(){
        super()       
    }

    componentWillMount(){
        let token = "";

        this.props.saveUserDetailsAction({

            token: token,
            loggedIn:false

        });

        this.props.navigation.navigate('Login');
    }

   
    
  
    render(){
      

       
        return (  
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>            
        );

        
    }
}



const mapStateToProp = (state) =>{

    return {
        user:state.user
    }

    
}

const mapActionstoProps = (dispatch) => {
    return bindActionCreators({
        saveUserDetailsAction
    },dispatch)
}


export default connect(mapStateToProp,mapActionstoProps)(Logout);