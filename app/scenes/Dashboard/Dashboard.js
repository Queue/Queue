//
// Dashboard scene

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { TextButton, QueueList } from '../../components';
import { Actions } from 'react-native-router-flux'
import Data from '../../lib/data';
import Common from '../../lib/common';
import Layout from '../../lib/layout';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';
import styles from './styles';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {num: 0};
  }

  // test purposes only
  ping() {
    Actions.SignInRoute;
  }

  render() {
    return (
      <Grid>

        <Col style={styles.navMenu}>
          <View style={Layout.container}>
            <TextButton
              styles = {styles.logOutButton}
              font = {Fonts.content}
              size={80}
              text = {'Q'}
              press = {this.ping.bind(this)} />
          </View>
        </Col>

        <Col style={styles.actionArea}>
          <View style={Layout.container}>
          </View>
        </Col>

        <Col style={styles.queueList}>
          <QueueList />
          <TouchableHighlight
            style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableHighlight>
        </Col>

      </Grid>
    );
  }
};
