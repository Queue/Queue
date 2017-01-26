//
// Dashboard scene

import React, { Component } from 'react';

// RN components
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

// Custom components
import {
  TextButton,
  Queuer,
  HiddenRow,
  InputModal,
  ModalWrap
} from '../../components';

// grid system
import { Grid, Col } from 'react-native-easy-grid';

// swipe list view
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// Spinner loader
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

    // queuers data reference
    this.queuerItemsRef = Data.DB.ref('queuers');

    // data source for the listview
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    // local state
    this.state = {
      queueData: this.ds.cloneWithRows([]), // holds the queuer data
      spinner: true, // determines loading spinner
      nameInput: '', // name input
      partyInput: '', // party size input
      phoneInput: '', // phone number input
      modalVisible: false, // determines visibility of modal
      nameVisible: false, // determines visibility of name field
      partyVisible: false, // determines visibility of party size field
      phoneVisible: false // determines visibility of phone number field
    };
  }

  // listen for data when the component mounts
  componentDidMount() {
    this.listenForItems(this.queuerItemsRef);
  }

  // Listen for all queuers in the database
  // Triggers a rerender when new data is added
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // Get children as an array
      let queuerItems = [];

      // Iterate over snapshot
      snap.forEach((child) => {
        queuerItems.push({
          name: child.val().name,
          _key: child.key
        });
      });

      // fill state with data and turn spinner off
      this.setState({
        queueData: this.ds.cloneWithRows(queuerItems),
        spinner: false
      });
    });
  }

  // open the modal
  openModal() {
    this.setState({
      modalVisible: true,
      nameVisible: true
    });
  }

  // compute when submitting a queuer
  addQueuer() {
    let queuer = `Name: ${this.state.nameInput}\nSize: ${this.state.partyInput}\nNumber: ${this.state.phoneInput}`;
    Common.log('Success', queuer);
    this.queuerItemsRef.push({name: this.state.nameInput});
    this.setState({modalVisible: false});
  }

  // Show input group based on state
  showInput() {
    if (this.state.nameVisible) {

      // return name input field
      return (
        <InputModal
          label={'Name'}
          buttonText={'→'}
          onChangeText={(text) => {this.setState({nameInput: text})}}
          value={this.state.nameInput}
          onPress={() => { this.setState({nameVisible: false, partyVisible: true}) }} />
      );

    } else if (this.state.partyVisible) {

      // return party size input field
      return (
        <InputModal
          label={'Size Of Party'}
          buttonText={'→'}
          onChangeText={(text) => {this.setState({partyInput: text})}}
          value={this.state.partyInput}
          onPress={() => { this.setState({partyVisible: false, phoneVisible: true}) }} />
      );

    } else if (this.state.phoneVisible) {

      // return phone number input field
      return (
        <InputModal
          label={'Phone Number (optional)'}
          buttonText={'Submit'}
          onChangeText={(text) => {this.setState({phoneInput: text})}}
          value={this.state.phoneInput}
          onPress={this.addQueuer.bind(this)} />
      );

    } else {
      return (<Text>Done</Text>);
    }
  }

  // Individual row function
  row(data) {
    return (
      <Queuer
        name={data.name}
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
