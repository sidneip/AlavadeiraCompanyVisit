import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {persistor} from '../../store'
import AsyncStorage from '@react-native-community/async-storage';
export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    persistor.purge()
    persistor.flush()
    AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View>
        <Text> index </Text>
      </View>
    );
  }
}
