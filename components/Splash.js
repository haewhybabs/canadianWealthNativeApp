import React,{Component} from 'react';
import { StyleSheet,Image} from 'react-native';
import {  Container,Body} from 'native-base';
import Login from './Login';

class Splash extends Component{
    
    constructor(){
        super()

        this.state = {
            
            timePassed:false
        }
  
       
    }

    componentDidMount() {
       
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
                <Container style={{backgroundColor:'#0F1C44'}}>
                    <Body>
                        <Image source={require('../assets/canadian-wealth.png')}
                            style={{width:300,height:50,marginTop:300}}
                        />
                        
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