import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity,ActivityIndicator
   } from 'react-native';
import {  Container,Content,Col,Button,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,
    } from 'native-base';
 import {apiUrl} from '../Config';
class ForgotPassword extends Component{
    
    constructor(){
        super()

        this.state = {
            email:'',
            isLoading:true,
            
        }
  
       
    }

    componentDidMount() {
       
        this.setState({ isLoading: false })

    }

    resetPasswordHandler = ()=>{
        let email = this.state.email;
        if(email !="")
        {
            this.showLoader();
            fetch(apiUrl+'user/reset-password',{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  
                    email: email
                   
                })          
            })
            .then(response => {
                                    
                return response.text();      
            })
            
            .then((contents)=>{

                console.log(contents)
                this.hideLoader()
                if(contents.status)
                {
                   
                    Toast.show({
                        text:'Success!! Kindly check your mail for your new password',
                        buttonText:'Okay',
                        style:{backgroundColor:'green'},
                        duration:3000       
                    })
                }

                else{
                   
                    Toast.show({
                        text:'ooopps!! We could not identify your mail',
                        buttonText:'Okay',
                        style:{backgroundColor:'red'},
                        duration:3000       
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
                this.errorInConnection();
            })
        }

    }

    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }



    
    registerHandler = () =>{

        if(!this.props.route){
            this.props.navigation.navigate('Register');
        }

        else{
            this.props.route('Register');
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
                            
                                <View style={{marginTop:50}}>
                                    <Button rounded primary onPress={this.resetPasswordHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                        <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Reset Password</Text>
                                    </Button>
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

export default ForgotPassword;