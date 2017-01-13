//
// Dashboard scene

import React, { Component } from 'react';

// Components
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import {
  TextButton,
  Queuer,
  HiddenRow
} from '../../components';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

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
    this.queuerItemsRef = Data.DB.ref('queuers');
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      queueData: []
    };
  }

  componentDidMount() {
    this.listenForItems(this.queuerItemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      let queuerItems = [];
      snap.forEach((child) => {
        queuerItems.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        queueData: this.ds.cloneWithRows(queuerItems)
      });
    });
  }

  addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Add',
          onPress: (text) => {
            this.queuerItemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }

  // Individual row function
  row(data) {
    return (
      <Queuer
        data={data.title}
        onPress={() => {Common.log('Queuer Pressed')}} />
    );
  }

  // Individual hidden row function
  hiddenRow(data, secId, rowId, rowMap) {
    return (
      <HiddenRow
        textPress={() => {Common.log('Text Pressed')}}
        deletePress={() => {Common.log('Delete Pressed')}} />
    );
  }

  render() {
    return (
      <Grid>

        <Col style={styles.navMenu}>
          <View style={Layout.container}>
            <TextButton
              styles = {styles.logOutButton}
              font = {Fonts.content}
              size= {80}
              text = {'Q'}
              press = {Actions.SignInRoute} />
          </View>
        </Col>

        <Col style={styles.actionArea}>
          <View style={Layout.container}>
          </View>
        </Col>

        <Col style={styles.queueList}>
          <View style={styles.listContainer}>
            <SwipeListView
              dataSource = {this.ds.cloneWithRows(this.state.queueData)}
              renderRow = {this.row.bind(this)}
              renderHiddenRow = {this.hiddenRow.bind(this)}
              rightOpenValue = {-150} />
          </View>
          <TouchableHighlight
            style={styles.addButton}
            onPress={this.addItem.bind(this)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableHighlight>
        </Col>

      </Grid>
    );
  }
};
