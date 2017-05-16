//
// Dropdown component

import React, {Component} from 'react';
import { View, Text, Animated, Dimensions, StatusBar } from 'react-native'
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';

export default class Dropdown extends Component {
  static defaultProps = {
    duration: 2000,
    speed: 100
  }

  static propTypes = {
    duration: React.PropTypes.number,
    speed: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      y: new Animated.Value(-22),
      hide: false,
      title: '',
      message: '',
      type: ''
    };
  }

  showDropdown(type, title, message) {
    this.setState({
      hide: true,
      type,
      title,
      message
    });
    Animated.timing(this.state.y, {
      toValue: 0,
      duration: this.props.speed
    }).start(() => {
      setTimeout(() => {
        this.hideDropdown();
        this.setState({hide: false});
      }, this.props.duration);
    });
  }

  hideDropdown() {
    Animated.timing(this.state.y, {
      toValue: -22,
      duration: this.props.speed
    }).start();
  }

  render() {
    if (this.state.type === 'success') {
      return (
        <Animated.View style={{
          height: 22,
          width: Dimensions.get('window').width,
          backgroundColor: Colors.success,
          position: 'absolute',
          top: this.state.y
        }}>
          <StatusBar
            hidden={this.state.hide}
            animated={true}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontFamily: Fonts.content, color: 'white', fontWeight: '900'}}>{this.state.title}</Text>
            <Text style={{fontFamily: Fonts.content, color: 'white', paddingLeft: 10}}>{this.state.message}</Text>
          </View>
        </Animated.View>
      );
    } else if (this.state.type === 'error') {
       return (
        <Animated.View style={{
          height: 22,
          width: Dimensions.get('window').width,
          backgroundColor: Colors.error,
          position: 'absolute',
          top: this.state.y
        }}>
          <StatusBar
            hidden={this.state.hide}
            animated={true}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontFamily: Fonts.content, color: 'white', fontWeight: '900'}}>{this.state.title}</Text>
            <Text style={{fontFamily: Fonts.content, color: 'white', paddingLeft: 10}}>{this.state.message}</Text>
          </View>
        </Animated.View>
      );
    } else if (this.state.type === 'warning') {
       return (
        <Animated.View style={{
          height: 22,
          width: Dimensions.get('window').width,
          backgroundColor: Colors.warning,
          position: 'absolute',
          top: this.state.y
        }}>
          <StatusBar
            hidden={this.state.hide}
            animated={true}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{fontFamily: Fonts.content, color: 'white', fontWeight: '900'}}>{this.state.title}</Text>
            <Text style={{fontFamily: Fonts.content, color: 'white', paddingLeft: 10}}>{this.state.message}</Text>
          </View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}
