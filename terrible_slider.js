import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Image,
  Text
} from 'react-native';

export default class TerribleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pan: new Animated.ValueXY()
    };

    this.DIMENSION = 20;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x
        }
      ]),
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.pan,
          {
            toValue: 0,
            tension: 100,
            friction: 7
          }
        ).start();
      }
    });
  }

  render() {
    let pan_spring = this.state.pan.x.interpolate({
      inputRange: [0, 100],
      outputRange: [10, 120]
    });

    return (
      <View
        style = {[{flexDirection:'row', alignItems:'center'}, this.props.style]}
        onLayout = {(e) => {this.setState({width:e.nativeEvent.layout.width})}}>
        {this.state.width
        ? <Text>
            {this.state.width}
          </Text>
        : null
        }
        <View style={{flex:1, flexDirection:'row', alignItems:'center', height:this.DIMENSION}}>
          <View
            style = {{flex:1, borderBottomWidth:2, borderBottomColor:'gray'}} />
          <Animated.View
            style = {{position:'absolute', left:0}}>
            <Animated.Image
              source = {require('./spring.png')}
              style = {{width:pan_spring, height:this.DIMENSION, resizeMode:'stretch'}} />
          </Animated.View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style = {[this.state.pan.getLayout(), {position:'absolute', width:this.DIMENSION, height:this.DIMENSION, borderRadius:10, backgroundColor:'orange', marginLeft:10}]} />
        </View>
      </View>
    );
  }
}
