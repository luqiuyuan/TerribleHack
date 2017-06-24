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
      spring_broken: false
    };

    this.DIMENSION = 20;
    this.BAR_LENGTH = 263;
    this.MAX_PRICE = 100;

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
        outputRange: [10, 110]
      })
    });

    this.state.pan.addListener((value) => {
      let ratio_origin = value.x / this.BAR_LENGTH;
      let ratio = ratio_origin < 1? ratio_origin : 1;
      ratio = ratio > 0? ratio : 0;
      let price = Math.round(ratio * this.MAX_PRICE);
      this.setState({price:price});

      // break the spring
      if (ratio_origin > 0.9) {
        if (!this.state.spring_broken) {
          this.setState({spring_broken:true, pan_spring:new Animated.Value(150)}, () => {
            Animated.spring(
              this.state.pan_spring,
              {
                toValue: 10,
                tension: 100,
                friction: 7
              }
            ).start();
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
            style = {{position:'absolute', left:0}}>
            <Animated.Image
              source = {require('./spring.png')}
              style = {{width:this.state.pan_spring, height:this.DIMENSION, resizeMode:'stretch'}} />
          </Animated.View>
          <Animated.View
            {...this.panResponder.panHandlers}
            style = {[this.state.pan.getLayout(), {position:'absolute', marginLeft:10, width:this.DIMENSION, height:this.DIMENSION, borderRadius:10, backgroundColor:'orange'}]} />
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
