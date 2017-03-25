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

  componentWillUpdate(nextProps) {
    //console.log(`${nextProps.selectedRow} : ${this.props.row}`);
  }

  // calculate wait time
  calculateWaitTime() {
    let createdAt = new Date(this.props.createdAt),
        now = new Date();

    let diff = Math.abs(now - createdAt);
    let min = Math.floor((diff/1000)/60);

    this.setState({waitTime: min});
  }

  render() {
    let isSelected = () => {
      if (this.props.queuerKey === this.props.selectedKey) {
        return Colors.info;
      } else {
        return 'white';
      }
    }

    let name = this.props.name || '<Name>',
        partySize = this.props.partySize || '0',
        selected = isSelected();

    return (
      <TouchableHighlight
        onPress = {this.props.onPress}
        style = {styles.rowFront}
        underlayColor = {'white'}>
        <Grid style={{justifyContent: 'center'}}>
          <Col style={{width: 10, backgroundColor: selected, marginLeft: -20}}></Col>
          <Col
            style={{
              maxWidth: 30,
              marginRight: 5,
              marginLeft: 5,
              alignItems: 'center'}}>
            <Text style={[styles.text, {color: 'gray'}]}>{this.props.place}</Text>
          </Col>
          <Col style={{width: 215, paddingLeft: 8}}>
            <Text style={styles.text}>{name}</Text>
          </Col>
          <Col style={{alignItems: 'center'}}>
            <Text style={[styles.text, {color: 'gray'}]}>
              {this.state.waitTime + ' '}
              <Icon name="clock" size={20} color="grey" />
            </Text>
          </Col>
          <Col style={{
              maxWidth: 40,
              alignItems: 'center',
              borderLeftWidth: 1,
              borderColor: Colors.primaryBackground,
              paddingLeft: 15,
              marginRight: -12}}>
            <Text style={[styles.text, {color: 'gray'}]}>{partySize}</Text>
          </Col>
        </Grid>
      </TouchableHighlight>
    );
  }
}
