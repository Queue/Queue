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
import {
  TextButton,
  Queuer,
  HiddenRow,
  InputModal,
  ModalWrap
} from '../../components';
import { Grid, Col } from 'react-native-easy-grid';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Spinner from 'react-native-loading-spinner-overlay';

// Lib and common functions
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
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      queueData: this.ds.cloneWithRows([]),
      spinner: false,
      nameInput: '',
      partyInput: 1,
      phoneInput: '',
      modalVisible: false,
      nameVisible: false,
      partyVisible: false,
      phoneVisible: false
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
        queueData: this.ds.cloneWithRows(queuerItems),
        spinner: false
      });
    });
  }

  openModal() {
    this.setState({
      modalVisible: true,
      nameVisible: true
    });
  }

  // compute when submitting a queuer
  submitQueuer() {
    let queuer = `Name: ${this.state.nameInput}\nSize: ${this.state.partyInput}\nNumber: ${this.state.phoneInput}`;
    Common.log(queuer);
  }

  // Show input group based on state
  showInput() {
    if (this.state.nameVisible) {
      return (
        <InputModal
          label={'Name'}
          buttonText={'→'}
          onPress={() => { this.setState({nameVisible: false, partyVisible: true}) }} />
      );
    } else if (this.state.partyVisible) {
      return (
        <InputModal
          label={'Size Of Party'}
          buttonText={'→'}
          onPress={() => { this.setState({partyVisible: false, phoneVisible: true}) }} />
      );
    } else if (this.state.phoneVisible) {
      return (
        <InputModal
          label={'Phone Number (optional)'}
          buttonText={'Submit'}
          onPress={() => { this.submitQueuer.bind(this) }} />
      );
    } else {
      return (<Text>Done</Text>);
    }
  }

  // Individual row function
  row(data) {
    return (
      <Queuer
        name={data.title}
        onPress={() => {Common.log(data._key)}} />
    );
  }

  // Individual hidden row function
  hiddenRow(data, secId, rowId, rowMap) {
    const deletePress = () => {
      // needed to close row
      rowMap[`${secId}${rowId}`].closeRow();
      Data.DB.delete(`queuers/${data._key}`);
    }

    return (
      <HiddenRow
        textPress={() => {Common.log(data.title)}}
        deletePress={deletePress} />
    );
  }

  render() {
    return (
      <Grid>

        <Spinner
          visible={this.state.spinner} />

        <Col style={styles.navMenu}>
          <View style={Layout.container}>
            <TextButton
              styles={styles.logOutButton}
              font={Fonts.content}
              size={80}
              text={'Q'}
              press={Actions.SignInRoute} />
          </View>
        </Col>

        <Col style={styles.actionArea}>
          <View style={Layout.container}>
          </View>
        </Col>

        <Col style={styles.queueList}>
          <View style={styles.listContainer}>
            <SwipeListView
              dataSource={this.state.queueData}
              enableEmptySections={true}
              renderRow={this.row.bind(this)}
              renderHiddenRow={this.hiddenRow.bind(this)}
              rightOpenValue={-150} />
          </View>
          <TouchableHighlight
            style={styles.addButton}
            onPress={this.openModal.bind(this)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableHighlight>
        </Col>

        <ModalWrap
          modalVisible={this.state.modalVisible}
          close={() => { this.setState({modalVisible: !this.state.modalVisible}) }}>

          {this.showInput()}

        </ModalWrap>

      </Grid>
    );
  }
};
