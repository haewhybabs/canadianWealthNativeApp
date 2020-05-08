import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity,StatusBar,Platform,
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Icon,Footer,FooterTab,
    Picker} from 'native-base';

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    );

class Profile extends Component{
    
    
    constructor(){
        super()

        this.state = {
            dataSource:[],
            isLoading:true,
            userdetails:[],
            timePassed:false
        }
  
       
    }

    componentDidMount() {
       
        this.setState({ loading: false })
        
    }
    
  
    render(){
       
            return (  
                <Container style={{backgroundColor:'#fff'}}>
                    <MyStatusBar backgroundColor="#0F1C44" barStyle="light-content" />
                    <Content>
                        <View style={{backgroundColor:'#0F1C44',width:'100%',height:200}}>
                       
                            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{color:'#fff'}}/>
                            </Button>
                        
                            <View style={{width:'100%',alignItems:'center',marginTop:20}}>
                                <Thumbnail
                                    source = {require('../assets/finebabe.png')}
                                    scaleX={2} scaleY={2}         
                                />
                                <Text style={{marginTop:40,color:'#fff',fontSize:20}}>Change Profile Picture</Text>
                            </View>
                        </View>

                            <View style={{marginTop:20,width:'100%',alignItems:'center'}}> 
                                <Text style={{fontSize:18}}>Profile Information</Text>
                            </View>

                            <Card style={{marginTop:20}}>
                                <CardItem>
                                    <Icon active name="man" style={{color:'#00CCFF'}}/>
                                    <Input value="Ayobami Babalola"/>
                                </CardItem>
                            </Card>

                            <Card style={{marginTop:20}}>
                                <CardItem>
                                    <Icon active name="phone-portrait" style={{color:'#00CCFF'}}/>
                                    <Input value="08135373563"/>
                                    
                                </CardItem>
                            </Card>

                            <View style={{marginTop:50}}>
                                <Button rounded primary onPress={this.loginHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Update</Text>
                                </Button>
                            </View>
                        
                    </Content>

                    <Footer>
                        <FooterTab  style={{backgroundColor:'#0F1C44'}}>
                            <Button vertical onPress={this.DashboardHandler}>
                                <Icon name="person" />
                                <Text style={{color:'#fff'}}>Profile</Text>
                            </Button>
                            
                            <Button vertical onPress={this.ProfileHandler}>
                                <Icon name="log-out" />
                                <Text style={{color:'#fff'}}>Logout</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            );

        

        
    }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },

  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});



export default Profile;