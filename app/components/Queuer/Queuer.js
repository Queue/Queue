//
// Queuer list item component

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

import Colors from '../../lib/colors';
import Common from '../../lib/common';

// grid system
import { Grid, Col } from 'react-native-easy-grid';

// import Icon from 'react-native-vector-icons/FontAwesome.tff';
import Timer from 'react-native-timer';

export default class Queuer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitTime: 0
    }
  }

  componentDidMount() {
    this.calculateWaitTime();
    Timer.setInterval(this, `waitTimer_${this.props.key}`, () => {
      this.calculateWaitTime();
    }, 60000);
  }

  calculateWaitTime() {
    let createdAt = new Date(this.props.createdAt),
        now = new Date();
    let diff = Math.abs(now - createdAt);
    let min = Math.floor((diff/1000)/60);
    Common.log(min);

    this.setState({waitTime: min});
  }

  componentWillUnmount() {
    Timer.clearInterval(this, `waitTimer_${this.props.key}`);
  }

  render() {
    return (
      <TouchableHighlight
        onPress = {this.props.onPress}
        style = {styles.rowFront}
        underlayColor = {Colors.primaryBackground}>
        <Grid style={{justifyContent: 'center'}}>
          <Col style={{
              maxWidth: 30,
              marginRight: 5,
              marginLeft: -10,
              alignItems: 'center'}}>
            <Text style={[styles.text, {color: 'gray'}]}>{this.props.place}</Text>
          </Col>
          <Col style={{width: 215, paddingLeft: 8}}>
            <Text style={styles.text}>{this.props.name}</Text>
          </Col>
          <Col style={{alignItems: 'center'}}>
            <Text style={[styles.text, {color: 'gray'}]}>{this.state.waitTime}'</Text>
          </Col>
          <Col style={{
              maxWidth: 50,
              alignItems: 'center',
              borderLeftWidth: 1,
              borderColor: Colors.primaryBackground,
              paddingLeft: 15}}>
            <Text style={[styles.text, {color: 'gray'}]}>{this.props.partySize}</Text>
          </Col>
        </Grid>
      </TouchableHighlight>
    );
  }
}
