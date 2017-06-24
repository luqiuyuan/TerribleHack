/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import TerribleSlider from './terrible_slider';

export default class TerribleHack extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TerribleSlider
          ref = 'terrible_slider'
          style = {styles.terrible_slider} />
        <TouchableOpacity
          style = {{width:150, height:50, backgroundColor:'#CE3E3E'}}
          onPress = {()=>{this.refs.terrible_slider.drop()}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  terrible_slider: {
    alignSelf: 'stretch'
  }
});

AppRegistry.registerComponent('TerribleHack', () => TerribleHack);
