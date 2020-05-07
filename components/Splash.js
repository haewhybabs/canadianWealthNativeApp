import React,{Component} from 'react';
import { 
  StyleSheet,
  Image,
  Text
   } from 'react-native';
import {  Container,Header,Body,CheckBox,Title,Card,
    CardItem,Left,Right,Content,Grid,
    Col,Button,Icon, Subtitle,Form, Item, Input,Label,Row,Toast,Root,Thumbnail,
    Picker} from 'native-base';
    import Login from './Login';

class Splash extends Component{
    
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
        await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
        })
        this.setState({ loading: false })
        setTimeout( () => {
            this.setTimePassed();
        },2000);
    }



    setTimePassed() {
        this.setState({timePassed: true});
    }

    
    
  
    render(){

        if (!this.state.timePassed) {
            return (  
                <Container style={{backgroundColor:'#007bff'}}>
                    <Body>
                        <Text>Hell</Text>

                        
                    </Body>
                
                </Container>
            );

        } else {
            return <Login route={this.props.navigation.navigate}/>;
        }

        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});

export default Splash;