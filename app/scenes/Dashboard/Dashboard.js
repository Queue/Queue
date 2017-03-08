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
  QueuerPage,
  NavButton
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
      // data
      queueData: this.ds.cloneWithRows([]), // holds the queuer data
      selectedKey: '', // the selected queuers key

      // fields
      nameInput: '', // name input
      partyInput: '', // party size input
      phoneInput: '', // phone number input
      editName: '', // editable name for the queuer page text field
      editParty: '', // editable party size for the queuer page text field
      editPhone: '', // editable phone number for the queuer page text field
      editNotes: '', // editable notes for the queuer page text field

      // visual
      spinner: true, // determines loading spinner
      modalVisible: false, // determines visibility of modal
      nameVisible: false, // determines visibility of name field
      partyVisible: false, // determines visibility of party size field
      phoneVisible: false // determines visibility of phone number field
    };
  }

  // listen for data when the component mounts
  componentDidMount() {
    this.queuerItemsRef.orderByChild('createdAt');
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
          createdAt: child.val().createdAt,
          notes: child.val().notes
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
      createdAt: Date(),
      notes: ''
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
        selectedKey: data._key,
        editName: data.name,
        editParty: data.partySize,
        editPhone: data.phoneNumber,
        editNotes: data.notes
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
      if (data._key === this.state.selectedKey) {
        this.setState({
          selectedKey: '',
          editName: '',
          editParty: '',
          editPhone: '',
          editNotes: ''
        });
      }
    }

    return (
      <HiddenRow
        textPress={() => {Common.logLess(data.createdAt)}}
        deletePress={deletePress} />
    );
  }

  // save queuer on its edit page
  saveQueuer() {
    Data.DB.ref(`queuers/${this.state.selectedKey}`).update({
      name: this.state.editName,
      partySize: this.state.editParty,
      phoneNumber: this.state.editPhone,
      notes: this.state.editNotes
    });
  }

  changeAndSaveName(text) {
    this.setState({editName: text});
    Data.DB.ref(`queuers/${this.state.selectedKey}`).update({
      name: text
    });
  }

  changeAndSaveParty(text) {
    this.setState({editParty: text});
    Data.DB.ref(`queuers/${this.state.selectedKey}`).update({
      partySize: text
    });
  }

  changeAndSavePhone(text) {
    this.setState({editPhone: text});
    Data.DB.ref(`queuers/${this.state.selectedKey}`).update({
      phoneNumber: text
    });
  }

  changeAndSaveNotes(text) {
    this.setState({editNotes: text});
    Data.DB.ref(`queuers/${this.state.selectedKey}`).update({
      notes: text
    });
  }

  render() {
    return (
      <Grid>

        <Spinner
          visible={this.state.spinner}
        />

        <Col style={styles.navMenu}>
          <View style={Layout.container}>
            <TextButton
              styles={styles.logOutButton}
              font={Fonts.content}
              size={80}
              text={'Q'}
              press={Actions.SignInRoute}
            />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}}>
            <NavButton
              symbol={'H'}
              onPress={() => {console.log('cool')}}
            />
            <NavButton
              symbol={'Q'}
              onPress={() => {console.log('cool')}}
            />
            <NavButton
              symbol={'U'}
              onPress={() => {console.log('cool')}}
            />
            <NavButton
              symbol={'L'}
              onPress={() => {console.log('cool')}}
            />
          </View>
        </Col>

        <Col style={styles.actionArea}>
          <View style={Layout.container}>
            <QueuerPage
              queuerKey={this.state.selectedKey}
              queuer={this.state.selectedQueuer}
              name={this.state.editName}
              partySize={this.state.editParty}
              phoneNumber={this.state.editPhone}
              notes={this.state.editNotes}
              nameChange={this.changeAndSaveName.bind(this)}
              partyChange={this.changeAndSaveParty.bind(this)}
              phoneChange={this.changeAndSavePhone.bind(this)}
              notesChange={this.changeAndSaveNotes.bind(this)}
              save={this.saveQueuer.bind(this)}
              text={''}
              seat={''}
              remove={''}
            />
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
