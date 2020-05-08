import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity,ActivityIndicator, AsyncStorage,
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail
   } from 'native-base';
    import {apiUrl} from '../Config';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import {connect} from 'react-redux';
class Register extends Component{
    
    constructor(){
        super()

        this.state = {

            email:'',
            password:'',
            passwordConfirmation:'',
            name:'',
            phoneNumber:'',
            isLoading:true,
            
        }
  
       
    }
    componentDidMount(){
        this.setState({
            isLoading:false
        })
    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }


    loginHandler = () => {

        this.props.navigation.navigate('Login');
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }

    submitValidation = () =>{
        
        let state = this.state;
        let nameError = state.nameError;
        let emailError= state.emailError;
        let phoneNumberError = state.phoneNumberError;
        let passwordError =state.passwordError;
        let passwordConfirmationError=state.passwordConfirmationError

        if(state.email == ""){
            emailError = 'Email cannot be empty';
        }
        if(state.name ==""){
            nameError='Name Field cannot be empty';
        }
        if(state.password==""){
            passwordError= "Password Field cannot be empty";
        }
        if(state.passwordConfirmation==""){
            passwordConfirmationError="Password confirmation field cannot be empty";
        }
        if(state.phoneNumber==""){
            phoneNumberError="Phone number field cannot be empty";
        }

        this.setState({
            nameError,
            passwordError,
            passwordConfirmationError,
            emailError,
            phoneNumberError
        });
    }

    registerHandler = () =>
    {
        this.submitValidation();
        let state = this.state
        if(this.state.emailError=="" && this.state.nameError =="" && this.state.phoneNumberError=="" && this.state.passwordError=="" && this.state.passwordConfirmationError==""){
            this.showLoader();
            fetch(apiUrl+'user/registration',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:state.name,
                    email: state.email,
                    password: state.password,
                    password_confirmation:state.passwordConfirmation,
                    phoneNumber:state.phoneNumber
                })
                
            })
            .then(response => {
                 
                                
                return response.json();   
                  
            })
            .then((contents)=>{
                this.hideLoader();
                
                if(contents.status==false){
                    
                    Toast.show({
                        text:contents.errors[0].msg,
                        buttonText:'Okay',
                        style:{backgroundColor:'red'}
                        
                    })  
                }
                else{
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
                        this.props.navigation.navigate('Profile');
                    },3000);
                }
            })
            .catch((error)=>{
                this.errorInConnection();
                this.setState({
                    password_confirmation:'',
                    password:''
                })
            })
        
        }
        
    }

    validateName = (name) => {
        if(name == ""){
            this.setState({
                nameError:'Name field cannot be empty'
            })
        }
        else{
            this.setState({
                nameError:'',
                name
            })
        }
        
    }

    validateMail = (email) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (reg.test(email) === false || email=="") 
            {
                
                this.setState({

                    emailError:'Email not valid'
                })
            }
            else{
                this.setState({
                    emailError:'',
                    email
                })
            }
    }

    passwordValidation = (password) =>
    {
        if(password.length<=6 || password ==""){
            this.setState({

                passwordError:'Password must be greater than 6'
            })
        }
        else{
            this.setState({
                password,
                passwordError:''
            })
        }
        
    }

    passwordConfirmationValidation = (passwordConfirmation) =>{
        if(this.state.password != passwordConfirmation){
            this.setState({
                passwordConfirmationError:'Password does not match',
            })
        }
        else{
            this.setState({
                passwordConfirmation,
                passwordConfirmationError:''
            })
        }
    }
    phoneNumberValidation =(phoneNumber) =>
    {
        if(phoneNumber == ""){
            this.setState({
                phoneNumberError:'Phone Number Field cannot be empty'
            });
        }
        else{
            this.setState({
                phoneNumber,
                phoneNumberError:''
            });
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
                                    style={{width:300,height:50,marginTop:80}}
                                />
                            </View>              
                            <Form style={{marginTop:50,marginLeft:15,marginRight:15}}>
                                <Item inlineLabel last>
                                    <Label>Full Name</Label>
                                    <Input style={{color:'#fff'}} onChangeText={(name)=>this.validateName(name)}/>
                                </Item>
                                <Text style={{color:'red'}}>{this.state.nameError}</Text>
                                <Item inlineLabel last>
                                    <Label>Email</Label>
                                    <Input style={{color:'#fff'}} onChangeText={(email)=>this.validateMail(email)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.emailError}</Text>
                                <Item inlineLabel last>
                                    <Label>Password</Label>
                                    <Input secureTextEntry style={{color:'#fff'}} onChangeText={(password)=>this.passwordValidation(password)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.passwordError}</Text>
                                <Item inlineLabel last>
                                    <Label>Password Confirmation</Label>
                                    <Input secureTextEntry style={{color:'#fff'}} onChangeText={(passwordConfirmation)=>this.passwordConfirmationValidation(passwordConfirmation)} />
                                </Item>
                                <Text style={{color:'red'}}>{this.state.passwordConfirmationError}</Text>
                                <Item inlineLabel last>
                                    <Label>Phone Number</Label>
                                    <Input style={{color:'#fff'}} onChangeText={(phoneNumber)=>this.phoneNumberValidation(phoneNumber)}/>
                                </Item>
                                <Text style={{color:'red'}}>{this.state.phoneNumberError}</Text>
                                <View style={{marginTop:50}}>
                                    <Button rounded primary onPress={this.registerHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Register</Text>
                                    </Button>
                                </View>       
                            </Form>
                        </Content>
                        <View style={{position:'absolute',bottom:0,alignItems:'center',width:'100%',marginBottom:10}}>
                            <Row>
                                <Text style={{marginLeft:10, marginTop:10,color:'#fff'}}>Already have an account?</Text>
                                <TouchableOpacity onPress={this.loginHandler} >
                                    <Text style={{marginLeft:10, marginTop:10,color:'#e83e8c'}}>Login here</Text>
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


export default connect(mapStateToProp,mapActionstoProps)(Register);