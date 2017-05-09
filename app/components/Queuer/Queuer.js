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
import Data from '../../lib/data';

// grid system
//import { Row, Col } from 'react-native-easy-grid';
import {Column as Col, Row} from 'react-native-responsive-grid';

import Icon from 'react-native-vector-icons/EvilIcons';
import Timer from 'react-native-timer';

export default class Queuer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waitTime: 0
    }
  }

  // calculate the wait time when the component mounts
  componentDidMount() {
    //console.log(this.props.row);
    this.calculateWaitTime();
    Timer.setInterval(this, `waitTimer_${this.props.key}`, () => {
      this.calculateWaitTime();
    }, 60000);
  }

  // clear the wait time
  componentWillUnmount() {
    Timer.clearInterval(this, `waitTimer_${this.props.key}`);
  }

  // calculate wait time
  calculateWaitTime() {
    // cant go beyond 999
    if (this.state.waitTime <= 999) {
      let createdAt = new Date(this.props.createdAt),
          now = new Date();

      let diff = Math.abs(now - createdAt);
      let min = Math.floor((diff/1000)/60);

      this.setState({waitTime: min});
    } else {
      // clear timer if above 999
      Timer.clearInterval(this, `waitTimer_${this.props.key}`);
    }
  }

  render() {
    let isSelected = () => {
      if (this.props.queuerKey === this.props.selectedKey && this.props.home) {
        return Colors.info;
      } else {
        return 'white';
      }
    }

    let name = this.props.name || '<Name>',
        partySize = this.props.partySize || '0',
        selected = isSelected();

    return (
      <View>
        <TouchableHighlight
          onPress = {this.props.onPress}
          style = {styles.rowFront}
          underlayColor = {'white'}>
          <Row>
            <Col size={3}>
              <View style={{backgroundColor: selected, width: 10, height: '100%', marginLeft: -20}}></View>
            </Col>
            <Col size={4}>
              <View style={{width: '100%', marginLeft: -10}}>
                <Text style={[styles.text, {color: 'gray', textAlign: 'center'}]}>{this.props.place}</Text>
              </View>
            </Col>
            <Col size={57}>
              <View style={{paddingLeft: 8}}>
                <Text style={styles.text}>{name}</Text>
              </View>
            </Col>
            <Col size={20}>
              <View style={{width: '100%'}}>
                <Text style={[styles.text, {color: 'gray', textAlign: 'center'}]}>
                  {this.state.waitTime + ' '}
                  <Icon name="clock" size={20} color="grey" />
                </Text>
              </View>
            </Col>
            <Col size={16}>
              <View style={{
                alignItems: 'center',
                width: '100%',
                borderLeftWidth: 1,
                borderColor: Colors.primaryBackground,
              }}>
                <Text style={[styles.text, {color: 'gray', textAlign: 'center'}]}>{partySize}</Text>
              </View>
            </Col>
          </Row>
        </TouchableHighlight>
      </View>
    );
  }
}
