import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,
    Picker} from 'native-base';

class ForgotPassword extends Component{
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            userdetails:[],
            timePassed:false
        }
  
       
    }

    async componentDidMount() {
       
        this.setState({ loading: false })
        setTimeout( () => {
            this.setTimePassed();
        },2000);
    }



    setTimePassed() {
        this.setState({timePassed: true});
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
                                <Input style={{color:'#fff'}} />
                            </Item>
                            <Item inlineLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry style={{color:'#fff'}} />
                            </Item>
                            <Item inlineLabel last>
                                <Label>Password Confirmation</Label>
                                <Input secureTextEntry style={{color:'#fff'}} />
                            </Item>
                            <View style={{marginTop:50}}>
                                <Button rounded primary onPress={this.loginHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
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
            );

        

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default ForgotPassword;