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
  Alert,
  FlatList
} from 'react-native';

// custom components
import {
  TextButton,
  Queuer,
  HiddenRow,
  InputModal,
  ModalWrap,
  QueuerPage,
  NavButton,
  Settings,
  Dropdown
} from '../../components';

// grid system
//import { Grid, Col } from 'react-native-easy-grid';
import {Column as Col, Row} from 'react-native-responsive-grid';

// swipe list view
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// Spinner loader
import Spinner from 'react-native-loading-spinner-overlay';

// dropdown alerts
import DropdownAlert from 'react-native-dropdownalert';

// timers
import Timer from 'react-native-timer';

// router actions
import { Actions } from 'react-native-router-flux'

// Lib and common functions
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
    this.queuerItemsRef = Data.DB.ref(`queuers`);

    // current user
    this.user = Data.Auth.user();

    // local state
    this.state = {
      // data
      queuerData: [],
      selectedKey: '', // the selected queuers key
      loaded: false,

      // fields
      nameInput: '', // name input
      partyInput: '', // party size input
      phoneInput: '', // phone number input
      editName: '', // editable name for the queuer page text field
      editParty: '', // editable party size for the queuer page text field
      editPhone: '', // editable phone number for the queuer page text field
      editNotes: '', // editable notes for the queuer page text field
      emailInput: '', // email input
      orgInput: '', // organization input

      // visual
      spinner: true, // determines loading spinner
      modalVisible: false, // determines visibility of modal
      nameVisible: false, // determines visibility of name field
      partyVisible: false, // determines visibility of party size field
      phoneVisible: false, // determines visibility of phone number field
      homeVisible: true, // determines visibilty of home on dashboard
      settingsVisible: false, // determines visibility of settings on dashboard
      editPhoneCheck: false,
      phoneInputCheck: false
    };
  }

  // listen for data when the component mounts
  componentDidMount() {
    // wait for user data
    Data.Auth.authChange((user) => {
      if (user) {
        this.user = Data.Auth.user();
        this.queuerItemsRef = Data.DB.ref(`queuers/${Data.Auth.user().uid}`);
        this.queuerItemsRef.orderByChild('createdAt');
        this.listenForItems(this.queuerItemsRef);
        this.setState({
          emailInput: Data.Auth.user().email,
          orgInput: Data.Auth.user().displayName,
          loaded: true
        });
      } else {
        console.log('Not logged in');
        Actions.SignInRoute();
      }
    });
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
          key: child.key,
          name: child.val().name,
          partySize: child.val().partySize,
          phoneNumber: child.val().phoneNumber,
          createdAt: child.val().createdAt,
          notes: child.val().notes,
          activity: {
            selected: child.val().activity.selected,
            opened: child.val().activity.opened
          }
        });
      });

      // set initial selected queuer
      for (let i = 0; i < queuerItems.length; i++) {
        if (queuerItems[i].activity.selected) {
          this.setState({
            selectedKey: queuerItems[i].key,
            editName: queuerItems[i].name,
            editParty: queuerItems[i].partySize,
            editPhone: queuerItems[i].phoneNumber,
            editNotes: queuerItems[i].notes
          });
        }
      }

      // fill state with data and turn spinner off
      this.setState({
        queuerData: queuerItems,
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

  // show input group based on state
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
          label={'Size of Party'}
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

  // shows nav contexts
  showNavItems() {
    if (this.state.homeVisible) {
      return (
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
          text={() => {console.log('Text')}}
          seat={this.seatQueuer.bind(this)}
          remove={this.removeQueuer.bind(this)}
        />
      );
    } else if (this.state.settingsVisible) {
      return (
        <Settings
          email={this.state.emailInput}
          organization={this.state.orgInput}
          onChangeEmail={(text) => this.setState({emailInput: text})}
          onChangeOrg={(text) => this.setState({orgInput: text})}
          savePress={this.saveProfile.bind(this)}
        />
      );
    } else {}
  }

  // set the settings visible
  setSettingsVisible() {
    this.setState({
      homeVisible: false,
      settingsVisible: true
    });
  }

  // set the home visible
  setHomeVisible() {
    this.setState({
      homeVisible: true,
      settingsVisible: false
    });
  }

  // save user profile
  saveProfile() {
    this.user.updateProfile({
      displayName: this.state.orgInput
    }).then(() => {
      Common.dismissKeyboard();
      this.dropdown.showDropdown('success', 'Success', 'Profile has been updated');
      console.log('Profile Updated');
    }, (error) => {
      this.dropdown.showDropdown('error', 'Error', `Error on pdating profile: ${error}`);
      console.log('Profile Update ERROR');
    });
  }

  // sign out
  signOut() {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          Data.Auth.signOut().then(() => {
            Actions.SignInRoute();
          }, (error) => {
            Common.error(error.code, error.message)
          });
        }}
      ]
    );
  }

  // set the selected queuer
  setSelectedQueuer(item) {

    // make sure your on home
    this.setHomeVisible();

    // set selected queuer
    let data = this.state.queuerData;
    for (let i = 0; i < data.length; i++) {
      let key = data[i].key;
      if (key === item.key) {
        Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
          activity: { selected: true }
        });
      } else {
        Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
          activity: { selected: false }
        });
      }
    }

    // set current item
    this.setState({
      selectedKey: item.key,
      editName: item.name,
      editParty: item.partySize,
      editPhone: item.phoneNumber,
      editNotes: item.notes
    });
  }

  // individual row function
  row({item, index}) {

    // place in queue
    let place = index + 1;

    return (
      <Queuer
        _key={item.key}
        place={place}
        name={item.name}
        isSelected={item.activity.selected}
        isOpen={item.activity.opened}
        createdAt={item.createdAt}
        partySize={item.partySize}
        onPress={this.setSelectedQueuer.bind(this, item)}
        onOpen={this.setOpenQueuer.bind(this, item)}
        onRemovePress={this.removeQueuer.bind(this, item)}
        onSeatPress={this.seatQueuer.bind(this, item)}
      />
    );
  }

  // sets the opened swipeout for each queuer - can only open one in the lsit
  setOpenQueuer(item) {
    let queuers = this.state.queuerData;
    for (let i = 0; i < queuers.length; i++) {
      let queuerKey = queuers[i].key;
      if (queuerKey === item.key) {
        Data.DB.ref(`queuers/${this.user.uid}/${queuerKey}`).update({
          activity: {
            selected: queuers[i].activity.selected,
            opened: true
          }
        });
      } else {
        Data.DB.ref(`queuers/${this.user.uid}/${queuerKey}`).update({
          activity: {
            selected: queuers[i].activity.selected,
            opened: false
          }
        });
      }
    }
  }

  // special remove with touch context
  removeQueuer(item) {
    let name = item.name || this.state.editName,
        key = item.key || this.state.selectedKey;

    Alert.alert(
      `Remove ${name}`,
      `Are you sure you want to remove ${name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          Data.DB.delete(`queuers/${this.user.uid}/${key}`);
          if (key === this.state.selectedKey) {
            this.dropdown.showDropdown('warning', 'Warning', `${name} was removed from queue`);
            this.setState({
              selectedKey: '',
              editName: '',
              editParty: '',
              editPhone: '',
              editNotes: ''
            });
          }
        }}
      ]
    );
  }

  // seat the queuer
  seatQueuer(item) {
    let name = item.name || this.state.editName,
        key = item.key || this.state.selectedKey;

    Alert.alert(
      `Seat ${name}`,
      `Are you sure you want to seat ${name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          Data.DB.delete(`queuers/${this.user.uid}/${key}`);
          if (key === this.state.selectedKey) {
            this.dropdown.showDropdown('success', 'Success', `${name} has been seated`);
            this.setState({
              selectedKey: '',
              editName: '',
              editParty: '',
              editPhone: '',
              editNotes: ''
            });
          }
        }}
      ]
    );
  }

  // compute when submitting a queuer and check phone input
  addQueuer() {
    Data.DB.addQueuer(this.queuerItemsRef,
      this.state.nameInput,
      this.state.partyInput,
      this.state.phoneInput
    );

    this.setState({
      modalVisible: false,
      nameInput: '',
      partyInput: '',
      phoneInput: ''
    });
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

  // edits and saves to the databse as typeing for NAME
  changeAndSaveName(text) {
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editName: text});
    Data.DB.ref(ref).update({
      name: text
    });
  }

  // edits and saves to the databse as typeing for PARTY SIZE
  changeAndSaveParty(text) {
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editParty: text});
    Data.DB.ref(ref).update({
      partySize: text
    });
  }

  // edits and saves to the databse as typeing for PHONE NUMBER
  changeAndSavePhone(text) {
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editPhone: text});
    Data.DB.ref(ref).update({
      phoneNumber: text
    });
  }

  // edits and saves to the databse as typeing for NOTES
  changeAndSaveNotes(editNotes) {
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editNotes});
    Data.DB.ref(ref).update({notes: editNotes});
  }

  // checks name input in modal
  checkNameInput() {
    if (this.state.nameInput !== '') {
      this.setState({nameVisible: false, partyVisible: true});
    } else {
      Common.error('Error', 'Enter a Name');
    }
  }

  // checks the party size input
  checkPartyInput() {
    if (this.state.partyInput !== '') {
      this.setState({partyVisible: false, phoneVisible: true});
    } else {
      Common.error('Error', 'Enter the Party Size');
    }
  }

  // render the entire dashboard
  render() {
    return (
      <Row fullHeight>

        <Spinner
          visible={this.state.spinner}
        />

        <Col size={11} style={styles.navMenu}>
          <View style={[Layout.container, {paddingLeft: 0, paddingRight: 0}]}>
            <View style={{marginTop: 14}}>
              <TextButton
                styles={styles.brand}
                font={Fonts.brand}
                size={70}
                text={'Q'}
                press={() => {console.log(this.state.selectedKey)}}
              />
            </View>
          </View>
          <View style={{
            marginTop: -20,
            width: '100%',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <NavButton
              symbol={'ios-home'}
              isSelected={this.state.homeVisible}
              onPress={this.setHomeVisible.bind(this)}
            />
            {/*<NavButton
              symbol={'ios-list-box'}
              isSelected={false}
              onPress={() => {console.log('cool')}}
            />*/}
            <NavButton
              symbol={'ios-settings'}
              isSelected={this.state.settingsVisible}
              onPress={this.setSettingsVisible.bind(this)}
            />
            <NavButton
              symbol={'ios-exit'}
              isSelected={false}
              onPress={this.signOut.bind(this)}
            />
          </View>
        </Col>

        <Col size={49} style={styles.actionArea}>
          <View style={Layout.container}>
            {this.showNavItems()}
          </View>
        </Col>

        <Col size={40} style={styles.queueList}>
          <View style={[styles.listContainer, {flex: 1}]}>
            <FlatList
              data={this.state.queuerData}
              renderItem={this.row.bind(this)}
            />
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

        <Dropdown
          ref={ref => this.dropdown = ref}
          speed={500}
        />

      </Row>
    );
  }
};
