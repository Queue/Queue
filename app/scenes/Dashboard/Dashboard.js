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
  ModalWrap,
  QueuerPage
} from '../../components';

// grid system
import { Grid, Col } from 'react-native-easy-grid';

// swipe list view
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// Spinner loader
import Spinner from 'react-native-loading-spinner-overlay';

// timers
import Timer from 'react-native-timer';

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
      phoneVisible: false, // determines visibility of phone number field
      waitTime: 0,
      selectedQueuer: {} // the selected queuer and its properties
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
          _key: child.key,
          name: child.val().name,
          partySize: child.val().partySize,
          phoneNumber: child.val().phoneNumber,
          createdAt: child.val().createdAt
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

  // compute when submitting a queuer and check phone input
  addQueuer() {
    this.queuerItemsRef.push({
      name: this.state.nameInput,
      partySize: this.state.partyInput,
      phoneNumber: this.state.phoneInput,
      createdAt: Date()
    });

    this.setState({
      modalVisible: false,
      nameInput: '',
      partyInput: '',
      phoneInput: ''
    });
  }

  checkNameInput() {
    if (this.state.nameInput !== '') {
      this.setState({nameVisible: false, partyVisible: true});
    } else {
      Common.error('Error', 'Enter a Name');
    }
  }

  checkPartyInput() {
    if (this.state.partyInput !== '') {
      this.setState({partyVisible: false, phoneVisible: true});
    } else {
      Common.error('Error', 'Enter the Party Size');
    }
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
          onPress={this.checkNameInput.bind(this)} />
      );

    } else if (this.state.partyVisible) {

      // return party size input field
      return (
        <InputModal
          label={'Size Of Party'}
          buttonText={'→'}
          onChangeText={(text) => {this.setState({partyInput: text})}}
          value={this.state.partyInput}
          onPress={this.checkPartyInput.bind(this)} />
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
  row(data, secId, rowId) {
    // place in queue
    let place = Number(rowId) + 1;

    // set the selected queuer to show its page
    let setSelectedQueuer = () => {
      this.setState({
        selectedQueuer: {
          key: data._key,
          name: data.name,
          partySize: data.partySize,
          phoneNumber: data.phoneNumber
        }
      });
    }

    return (
      <Queuer
        key={data._key}
        place={place}
        name={data.name}
        createdAt={data.createdAt}
        partySize={data.partySize}
        onPress={setSelectedQueuer} />
    );
  }

  // Individual hidden row function
  hiddenRow(data, secId, rowId, rowMap) {
    let deletePress = () => {
      // needed to close row
      rowMap[`${secId}${rowId}`].closeRow();
      Data.DB.delete(`queuers/${data._key}`);
      if (rowId === this.state.selectedQueuer.rowNum) {
        this.setState({selectedQueuer: {}});
      }
    }

    return (
      <HiddenRow
        textPress={() => {Common.logLess(data.createdAt)}}
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
            {Object.keys(this.state.selectedQueuer).length ? (
              <View>
                <QueuerPage queuer={this.state.selectedQueuer}/>
              </View>
            ) : (
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 250,
                maxWidth: 400}}>
                  <Text style={{fontSize: 30, color: Colors.primaryBackground}}>
                    Select a person in queue to edit their values.
                  </Text>
              </View>
            )}
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
            underlayColor={Colors.green4}
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
