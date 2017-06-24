// ShooterButton

import React, { Component } from 'react';
import {
  Dimensions,
  Animated,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  LayoutAnimation,
  Easing,
} from 'react-native';

const window = Dimensions.get('window');
var spinning = true;

var spin;

export default class ShooterButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      left: new Animated.Value(50),
      top: new Animated.Value(30),

      arrow_left: new Animated.Value(40),
      arrow_top: new Animated.Value(40),

      opacity: new Animated.Value(0),
      spinValue: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.state.spinValue.addListener(({value}) => this.spin_deg = value);
  }

  fadeIn() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.linear
      }
    ).start(() => this.spin());
  }

  spin() {
    if(spinning) {
      let spinning_duration = Math.random() * (2000 - 700) + 700;
      this.state.spinValue.setValue(0);
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: spinning_duration,
          easing: Easing.linear
        }
      ).start(() => this.spin());
    }
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  arrowOnPress() {
    spinning = false;
    let spin_deg;

    this.state.spinValue.stopAnimation((deg) => spin_deg = deg*360-45);

    spin_deg = this.toRadians(spin_deg);

    y_offset = (window.height-45)*(Math.cos(spin_deg))+45;
    x_offset = (window.width-45)*(Math.sin(spin_deg))+45;

    this.fire(x_offset, -y_offset);
  }

  fire(x, y) {
    this.state.spinValue.setValue(this.spin_deg);
    Animated.timing(
      this.state.arrow_left,
      {
        toValue: x,
        duration: 700,
        easing: Easing.quad.inOut
      }
    ).start();

    Animated.timing(
      this.state.arrow_top,
      {
        toValue: y,
        duration: 700,
        easing: Easing.quad.inOut
      }
    ).start();
  }

  render() {
    const _left = this.state.left;
    const _top = this.state.top;

    const arrow_left = this.state.arrow_left;
    const arrow_top = this.state.arrow_top;

    const opacity = this.state.opacity;
    spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={[styles.container, this.props.container_style]}>

        <Animated.View
          style={[styles.arrow_wrapper, {opacity: this.state.opacity, left: arrow_left, top: arrow_top}]}>
          <TouchableWithoutFeedback
            style={styles.arrow_wrapper}
            onPress={this.arrowOnPress.bind(this)}>
            <Animated.Image
              source={require('./assets/shooter.png')}
              style={[{width: 50, height: 50}, {
                  transform: [{rotate: spin}]
                }]}
              resizeMode='contain'
            />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={[styles.button_wrapper, {position: 'absolute', left: _left, top: _top}]} >
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={this.onPress.bind(this)}
            style={[styles.ratio_button]} />
          <Text style={{marginLeft: 5, color: 'grey'}} >
            {(() => {
              if(this.props.text) {
                return this.props.text
              } else {
                return 'Pay Online'
              }
            })()}
          </Text>
        </Animated.View>
      </View>
    )
  }

  onPress() {
    this.setState({disabled: true});

    this.fadeIn();

    Animated.timing(
      this.state.left,
      {
        toValue: this._random(0, 300),
        duration: 100,
        easing: Easing.quad.inOut
      }
    ).start();

    Animated.timing(
      this.state.top,
      {
        toValue: this._random(20, 250),
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
  },
  arrow_wrapper: {
    position: 'absolute',
    width: 71,
    height: 71,
    borderRadius: 35.5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
