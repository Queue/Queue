//
// NavButton component

import React , { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './styles';
import Colors from '../../lib/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavButton extends Component {
  static defaultProps = {
    text: 'Title'
  }

  constructor(props) {
    super(props);
  }

  render() {
    let isSelectedBackground = this.props.isSelected ? Colors.primaryBackground : 'white';
    let isSelectedForeground = this.props.isSelected ? Colors.green0 : 'grey';

    return (
      <View style={styles.highlight}>
        <TouchableHighlight
          style={{width: '100%'}}
          onPress={this.props.onPress}
          underlayColor={Colors.primaryBackground}
        >
          <View style={{backgroundColor: isSelectedBackground, height: 110}}>
            <Icon style={[styles.text, {color: isSelectedForeground}]} name={this.props.symbol} size={30} />
            <Text style={[styles.type, {color: isSelectedForeground}]}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
