// ShooterButton

import React, { Component } from 'react';
import {
  Dimensions,
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  LayoutAnimation,
  Easing,
} from 'react-native';

const window = Dimensions.get('window');

export default class ShooterButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      left: new Animated.Value(window.width/2-5),
      top: new Animated.Value(window.height/2-5),
    }
  }

  render() {
    const _left = this.state.left;
    let _top = this.state.top;

    return (
      <View style={[styles.container, this.props.container_style]}>

        <Animated.View />

        <Animated.View style={[styles.button_wrapper, {position: 'absolute', left: _left, top: _top}]} >
          <TouchableOpacity
            onPress={this.onPress.bind(this)}
            style={[styles.ratio_button]} />
          <Text style={{marginLeft: 5, color: 'grey'}} >
            {(() => {
              if(this.props.text) {
                return this.props.text
              } else {
                return 'Check Me'
              }
            })()}
          </Text>
        </Animated.View>
      </View>
    )
  }

  onPress() {
    Animated.timing(
      this.state.left,
      {
        toValue: this._random(0, window.width-80),
        duration: 100,
        easing: Easing.quad.inOut
      }
    ).start();

    Animated.timing(
      this.state.top,
      {
        toValue: this._random(0, window.height-80),
        duration: 100,
        easing: Easing.quad.inOut
      }
    ).start();
  }

  _random(min, max) {
    return Math.random() * (max - min) + min;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', 
    width: window.width, 
    flex: 1
  },
  ratio_button: {
    backgroundColor: 'transparent', 
    borderColor: 'grey',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10
  },
  button_wrapper: {
    backgroundColor: 'transparent', 
    flexDirection: 'row'
  }
});