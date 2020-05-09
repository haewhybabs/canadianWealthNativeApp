import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text,View,TouchableOpacity,StatusBar,Platform,ActivityIndicator
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,Icon,Footer,FooterTab,
    Picker} from 'native-base';
import {apiUrl} from '../Config';
import {bindActionCreators} from 'redux';
import {saveUserDetailsAction} from '../redux/actions';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    );
const options = {
    title:'Select a photo',
    takePhotoButtonTitle:'Take a photo',
    chooseFromLibraryButtonTitle:'Choose from gallery',
    quality:1
}

class Profile extends Component{
    
    
    constructor(props){
        super(props)

        this.state = {
            
            isLoading:true,
            userInfo:"",
            name:props.navigation.getParam('name'),
            phoneNumber:props.navigation.getParam('phoneNumber'),
            imageSource:"",
            imageData:null,
            image:null,
            userToken:[]
            
        }
  
       
    }
    
    componentWillReceiveProps(props){
        this.setState({
            name:props.navigation.getParam('name'),
            phoneNumber:props.navigation.getParam('phoneNumber'),
            image:props.navigation.getParam('image')
        })
    }
    
    logoutHandler =() =>{
        let token = "";

        this.props.saveUserDetailsAction({

            token,
            loggedIn:false

        });
        this.props.navigation.navigate('Login')
    }

    componentDidMount() {
        console.log('mount');
        let loggedInStatus = this.props.user.loggedIn;
        if(loggedInStatus == false){
            this.props.navigation.navigate('Login');
        }
        let user = this.props.user
        

        fetch(apiUrl+'profile',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization':user.token
            }
            
        })
        .then(response => {
                                
            return response.json();      
        })
        
        .then((contents)=>{

            console.log(contents);
            
            
            this.setState({

                userInfo:contents.data,
                name:contents.data.name,
                phoneNumber:contents.data.phoneNumber,
                isLoading:false,
                image:contents.data.image

            });
        })
        .catch((error)=>{
            
            this.errorInConnection();
        })
        
    }

    errorInConnection = () => {
        this.hideLoader();

        Toast.show({
            text:'Ops!! Connection Problem',
            buttonText:'Okay',
            style:{backgroundColor:'red'}
            
        })
    }
    showLoader = () => {
        this.setState({isLoading:true})
    }

    hideLoader = () =>{
        this.setState({isLoading:false})
    }

    profileUpdateHandler =()=>
    {
        let state = this.state;
        let user = this.props.user;
        if(state.phoneNumber !="" && state.name !="")
        {
            this.showLoader();

            fetch(apiUrl+'profile/update',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization':user.token
            },
            body: JSON.stringify({
                    
                name: state.name,
                phoneNumber: state.phoneNumber,
                
            })
            
            })
            .then(response => {
                                    
                return response.json();      
            })
            
            .then((contents)=>{
                
                
                this.setState({

                    userInfo:contents.data,
                    name:contents.data.name,
                    phoneNumber:contents.data.phoneNumber,
                    isLoading:false,
                    image:contents.data.image

                });

                Toast.show({
                    text:'success',
                    buttonText:'Okay',
                    style:{backgroundColor:'green'}
                    
                })
            })
            .catch((error)=>{
                
                this.errorInConnection();
            })
        }
    }
    

    selectPhoto = async() =>
    {
        ImagePicker.showImagePicker({noData:true,mediaType:'photo'}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }else {
                let source ={uri:response.uri}
                this.showLoader()
                this.uploadImage(response)
              
                // RNFetchBlob.fetch('POST', "https://canadianwealthapp.herokuapp.com/profile/upload", {
                //     // Authorization : "Bearer access-token",
                //     Authorization:this.props.user.token,
                //    }, [
            
                //     { name : 'profileImage', filename :'hj.png', data: RNFetchBlob.wrap(response.path)},
                //     // { name : 'profileImage', filename :"imageo.png", data:response.data},
                    
                    
                // ]).then((resp) => {
                //     this.hideLoader();
                //     console.log('upload data  : ' +resp.text())
                   
                //     Toast.show({
                //         text:'success',
                //         buttonText:'Okay',
                //         style:{backgroundColor:'green'}
                        
                //     });

                    

                //     this.setState({
                //         imageSource: response.uri,
                //         image:resp.data.image
                //     });
                //     // ...
                // }).catch((err) => {
                //     console.log('error: ' + err)
                // })
            }
        });
    }

    uploadImage = async (response) =>{
        
        const baseUrl = apiUrl +'profile/upload';
        const uploadData = new FormData();
        uploadData.append('profileImage',{type:response.type, uri:response.uri,name:response.fileName})
        fetch(baseUrl, {
            method:'post',
            headers: {
                Authorization:this.props.user.token,  
            },
            body:uploadData
            
        })
        .then(response => {
            return response.json();
        })   
        .then((contents)=>{

            console.log('Response :' + contents)
            
            this.hideLoader()
            
            this.setState({

                userInfo:contents.data,
                name:contents.data.name,
                phoneNumber:contents.data.phoneNumber,
                isLoading:false,
                image:contents.data.image

            });

            Toast.show({
                text:'success',
                buttonText:'Okay',
                style:{backgroundColor:'green'}
                
            })
        })
        .catch((error)=>{ 
            this.errorInConnection();
        })
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
                    <Container style={{backgroundColor:'#fff'}}>
                    <MyStatusBar backgroundColor="#0F1C44" barStyle="light-content" />
                    <Content>
                        <View style={{backgroundColor:'#0F1C44',width:'100%',height:200}}>
                       
                            <Button transparent onPress={()=>this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{color:'#fff'}}/>
                            </Button>
                        
                            <View style={{width:'100%',alignItems:'center',marginTop:20}}>
                                <Thumbnail
                                    source = {this.state.image != null ? {uri:apiUrl+this.state.image}:
                                         require('../assets/noImage.png')}
                                    scaleX={2} scaleY={2}
                                    style={{width:50, height:50, borderRadius:50/2}}      
                                />
                                <TouchableOpacity onPress={()=>this.selectPhoto()}>
                                    <Text style={{marginTop:40,color:'#fff',fontSize:20}}>Change Profile Picture</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                            <View style={{marginTop:20,width:'100%',alignItems:'center'}}> 
                                <Text style={{fontSize:18}}>Profile Information</Text>
                            </View>

                            <Card style={{marginTop:20}}>
                                <CardItem>
                                    <Icon active name="man" style={{color:'#00CCFF'}}/>
                                    <Input value={this.state.name} onChangeText={(name)=>this.setState({name})}/>
                                </CardItem>
                            </Card>

                            <Card style={{marginTop:20}}>
                                <CardItem>
                                    <Icon active name="phone-portrait" style={{color:'#00CCFF'}}/>
                                    <Input value={this.state.phoneNumber} onChangeText={(phoneNumber)=>this.setState({phoneNumber})}/>
                                    
                                </CardItem>
                            </Card>

                            <View style={{marginTop:50}}>
                                <Button rounded primary onPress={this.profileUpdateHandler} style={{width:'100%',backgroundColor:'#00CCFF'}}>
                                    <Text style={{width: '100%',textAlign: 'center',color:'#fff',fontSize:20}}>Update</Text>
                                </Button>
                            </View>
                        
                    </Content>

                    <Footer>
                        <FooterTab  style={{backgroundColor:'#0F1C44'}}>
                            <Button vertical>
                                <Icon name="person" />
                                <Text style={{color:'#fff'}}>Profile</Text>
                            </Button>
                            
                            <Button vertical onPress={this.logoutHandler}>
                                <Icon name="log-out" />
                                <Text style={{color:'#fff'}}>Logout</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
                </Root>
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


export default connect(mapStateToProp,mapActionstoProps)(Profile);