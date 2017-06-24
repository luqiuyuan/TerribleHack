import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Image,
  Text,
  Easing
} from 'react-native';

export default class TerribleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      spring_broken: false,
      spring_rotate_value: new Animated.Value(0)
    };

    this.DIMENSION = 20;
    this.BAR_LENGTH = 263;
    this.MAX_PRICE = 100;
    this.SPRING_LENGTH = 30

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
        if (!this.state.spring_broken) {
          Animated.spring(
            this.state.pan,
            {
              toValue: 0,
              tension: 100,
              friction: 7
            }
          ).start();
        }
      }
    });
  }

  componentWillMount() {
    this.setState({
      pan_spring: this.state.pan.x.interpolate({
        inputRange: [0, 100],
        outputRange: [this.SPRING_LENGTH, 100+this.SPRING_LENGTH]
      }),
      pan_spring_parent: this.state.pan.x.interpolate({
        inputRange: [0, 100],
        outputRange: [-this.SPRING_LENGTH, -100-this.SPRING_LENGTH]
      }),
      spring_rotate: this.state.spring_rotate_value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    });

    this.state.pan.addListener((value) => {
      let ratio_origin = value.x / this.BAR_LENGTH;
      let ratio = ratio_origin < 1? ratio_origin : 1;
      ratio = ratio > 0? ratio : 0;
      let price = Math.round(ratio * this.MAX_PRICE);
      this.setState({price:price});

      // break the spring
      if (ratio_origin > 0.8) {
        if (!this.state.spring_broken) {
          this.setState({spring_broken:true, pan_spring:new Animated.Value(150), pan_spring_parent:-this.SPRING_LENGTH}, () => {
            Animated.parallel([
              Animated.spring(
                this.state.pan_spring,
                {
                  toValue: this.SPRING_LENGTH,
                  tension: 30,
                  friction: 3
                }
              ),
              Animated.spring(
                this.state.spring_rotate_value,
                {
                  toValue: 0.25,
                  tension: 10,
                  friction: 1
                }
              )
            ]).start();
          });
        }
      }
    });
  }

  render() {
    return (
      <View
        style = {[{flexDirection:'row', alignItems:'center'}, this.props.style]}>
        <Text
          style = {{width: 40, alignItems:'center'}}>
          $ {this.state.price? this.state.price : 0}
        </Text>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', height:this.DIMENSION}}>
          <View
            style = {{borderBottomWidth:2, borderBottomColor:'gray', width:this.BAR_LENGTH}} />
          <Animated.View
            style = {{
              position:'absolute',
              left:this.state.pan_spring_parent,
              flexDirection:'row',
              transform: [
                {rotate: this.state.spring_rotate}
              ]
            }}>
            <Animated.View
              style = {{width:this.state.pan_spring, height:this.DIMENSION}}/>
            <Animated.Image
              source = {require('./spring.png')}
              style = {{width:this.state.pan_spring, height:this.DIMENSION, resizeMode:'stretch'}} />
          </Animated.View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style = {[this.state.pan.getLayout(), {position:'absolute', marginLeft:this.SPRING_LENGTH, width:this.DIMENSION, height:this.DIMENSION, borderRadius:10, backgroundColor:'orange'}]} />
        </View>
      </View>
    );
  }

  drop() {
    Animated.sequence([
      Animated.decay(
        this.state.pan,
        {
          velocity: {x:0, y:-0.5},
          deceleration: 0.992
        }
      ),
      Animated.timing(
        this.state.pan,
        {
          toValue: {x:this.state.pan.x._value, y:1000},
          easing: Easing.quad
        }
      )
    ]).start();
  }
}
