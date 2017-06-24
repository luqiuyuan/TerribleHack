

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import TerribleTextInput from './terribleTextInput';
import TerribleSlider from './terrible_slider';
import FlashButton from './FlashButton';
export default class TerribleHack extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[{alignSelf:'stretch', height:88, justifyContent:'center', alignItems:'center'}, styles.shadow]}>
          <Text style={{fontSize:18}}>Sell</Text>
        </View>
        <View style={{height:36}} />
        <Text style={{width: 320}}>What to sell?</Text>
        <View style={{height:12}} />
        <TerribleTextInput />
        <View style={{height:25}} />
        <Text style={{width: 320}}>Price?</Text>
        <View style={{height:12}} />
        <TerribleSlider
          style = {{width:303}}/>
        <View style={{height:36}} />
        <FlashButton
          style={{
            width: 200,
            height: 200,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'flex-start'
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  shadow: {
      ...Platform.select({
        ios: {
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 0
          },
          marginTop: 1,
          marginBottom: 5
        },
        android: {
          borderColor: '#c8c8cc',
          elevation: 3,
          marginTop: 1,
          marginBottom: 5
        }
      }),
    }
});

AppRegistry.registerComponent('TerribleHack', () => TerribleHack);
