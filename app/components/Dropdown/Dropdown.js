//
// Dropdown component

import React, {Component} from 'react';
import { View, Text, Animated } from 'react-native'

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(-10)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.y, {
      toValue: 40,
      duration: 1000
    }).start();
  }

  render() {
    return (
      <Animated.View style={{
        height: 20,
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'red',
        position: 'absolute',
        top: this.state.y
      }}>
          <Text style={{alignSelf: 'stretch'}}>Cool</Text>
      </Animated.View>
    );
  }
}
