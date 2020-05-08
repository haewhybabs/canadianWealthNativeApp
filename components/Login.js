import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity,ActivityIndicator,AsyncStorage,
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,
    Picker} from 'native-base';
import {apiUrl} from '../Config';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import {connect} from 'react-redux';
class Login extends Component{
    
    constructor(){
        super()

        this.state = {
            isLoading:true,
            email:'',
            password:'',
        }
  
       
    }

    componentDidMount() {
       
        this.setState({ isLoading: false })
        
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    registerHandler = () =>{

        if(!this.props.route){
            this.props.navigation.navigate('Register');
        }

        else{
            this.props.route('Register');
        }
    }

    forgotPasswordHandler = () =>{
        if(!this.props.route){
            this.props.navigation.navigate('ForgotPassword');
        }

        else{
            this.props.route('ForgotPassword');
        }
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }
    
    loginHandler = () =>{

        let state = this.state;
        if(state.email != "" && state.password != ""){
            this.showLoader();
            fetch(apiUrl+'user/login',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                    email: state.email,
                    password: state.password,
                    
                })
                
            })
            .then(response => {
                 
                                
                return response.json();   
                  
            })
            .then((contents)=>{

                this.hideLoader();
                
                if(contents.status){
                    AsyncStorage.setItem('userDetails',
                    JSON.stringify({
                        name:contents.data.name,
                        email:contents.data.email,
                    }));

                    this.props.saveUserDetailsAction({

                        token:contents.token

                    });
                    
                    Toast.show({
                        text:'Success!!',
                        buttonText:'Okay',
                        style:{backgroundColor:'green'},
                        duration:3000       
                    })
                    setTimeout( () => {
                                  
                        if(!this.props.route){
                            this.props.navigation.navigate('Profile');
                        }    
                        else{
                            this.props.route('Profile');
                        }
                    
                    },2000); 
                }
                else{
                    Toast.show({
                        text:'Invalid Email or Password!!',
                        buttonText:'Okay',
                        style:{backgroundColor:'red'},
                        duration:3000       
                    })
                }
            })
            .catch((error)=>{
               
                this.errorInConnection();
            })
        }

        
    }
  
  
    render(){

       
        return (  
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#00CCFF" animating  />
            </View>
            :
            <Root>
                <Container style={{backgroundColor:'#0F1C44'}}>
                    <Content>
                        <View style={{width:'100%',alignItems:'center'}}>
                            <Image source={require('../assets/canadian-wealth.png')}
                                style={{width:300,height:50,marginTop:180}}
                            />
                        </View>              
                        <Form style={{marginTop:50,marginLeft:15,marginRight:15}}>
                            <Item inlineLabel last>
                                <Label>Email</Label>
                                <Input style={{color:'#fff'}} onChangeText={(email)=>this.setState({email})} />
                            </Item>
                            <Item inlineLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry style={{color:'#fff'}} onChangeText={(password)=>this.setState({password})}/>
                            </Item>

                            <View style={{marginTop:50}}>
                                <Button rounded primary onPress={this.loginHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Login</Text>
                                </Button>
                            </View>

                            <View style={{width:'100%',alignItems:'center',marginTop:10}}>
                                <TouchableOpacity onPress={this.forgotPasswordHandler}>
                                    <Text style={{color:'#fff'}}>Forgot Password ?</Text>
                                </TouchableOpacity>
                            </View>
                            

                            
                        </Form>
                    </Content>
                    <View style={{position:'absolute',bottom:0,alignItems:'center',width:'100%',marginBottom:10}}>
                        <Row>
                            <Text style={{marginLeft:10, marginTop:10,color:'#fff'}}>You don't have an account?</Text>
                            <TouchableOpacity onPress={this.registerHandler} >
                                <Text style={{marginLeft:10, marginTop:10,color:'#e83e8c'}}>Register here</Text>
                            </TouchableOpacity>
                        </Row>
                    </View>

                    

                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

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


export default connect(mapStateToProp,mapActionstoProps)(Login);