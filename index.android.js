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
  View
} from 'react-native';
import TerribleSlider from './terrible_slider';

export default class TerribleHack extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TerribleSlider
          style = {styles.terrible_slider} />
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
    marginLeft: 50,
    width: 150
  }
});

AppRegistry.registerComponent('TerribleHack', () => TerribleHack);
