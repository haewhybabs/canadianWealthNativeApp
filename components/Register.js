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

class Register extends Component{
    
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

    loginHandler = () => {
        this.props.navigation.navigate('Login');
    }

    render(){

       
            return (  
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
                                <Input style={{color:'#fff'}} />
                            </Item>
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
                            <Item inlineLabel last>
                                <Label>Phone Number</Label>
                                <Input style={{color:'#fff'}} />
                            </Item>
                            <View style={{marginTop:50}}>
                                <Button rounded primary onPress={this.loginHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
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
            );

        

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default Register;