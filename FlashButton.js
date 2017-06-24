import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';


export default class FlashButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginLeft:0,
      marginTop:0,
      isShown:true
    };
  }
  componentDidMount(){
    setInterval(this._changeLocation.bind(this), 300);
  }
  _changeLocation(){
    //console.warn(this.state.marginLeft);
    //this.state.marginLeft +=50;
    this.setState({
                  marginLeft:Math.random()*(this.props.style.width-75),
                  marginTop:Math.random()*(this.props.style.height-50),
                  isShown: Math.random()>0.5
                })
  }
  render() {
    let tmp=(
      <TouchableOpacity
      onPress = {this._click.bind(this)}
      style={[styles.button,{
        marginLeft:this.state.marginLeft,
        marginTop:this.state.marginTop
      }]}>
        <Text style={styles.text}>
          Save
        </Text>
      </TouchableOpacity>)
    let button=this.state.isShown ? tmp : null
    return (
        <View style={[styles.buttonContainer,this.props.style]}>
        { button
        }
        </View>
    );
  }
  _click() {
    // this.setState({isShown:true});
    Alert.alert(
      'Congraulations',
      null,
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }
}

const styles = StyleSheet.create({

  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  button: {
    borderRadius:7,
    width: 75,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CE3E3E'
  },
  text:{
    color:'white'
  }
});
