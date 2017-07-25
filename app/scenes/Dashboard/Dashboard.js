//
// Dashboard scene

// {# imports
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
  Dropdown,
} from '../../components';

// scenes
import History from '../History';
import Payment from '../Payment';

import Icon from 'react-native-vector-icons/Ionicons';

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
import BackgroundTimer from 'react-native-background-timer';

// router actions
import { Actions } from 'react-native-router-flux'

// Lib and common functions
import Data from '../../lib/data';
import Common from '../../lib/common';
import Layout from '../../lib/layout';
import Colors from '../../lib/colors';
import Fonts from '../../lib/fonts';
import styles from './styles';
import Twilio from '../../lib/twilio';
// #}

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
      filteredData: [],
      selectedKey: '', // the selected queuers key
      loaded: false,
      textsSent: 0,

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
      modalItemVisible: 'NAME', // determines visibility of name field
      navVisible: 'HOME' // change nav menu
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
        Data.DB.ref(`users/${this.user.uid}`).once('value').then(snap => {
          this.setState({textsSent: snap.val().texts});
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
      let queuerItems = [],
          filteredQueuerItems = [];

      // Iterate over snapshot
      snap.forEach((child) => {
        let data = child.val();
        if (data.removed || data.seated) {
          // remove queuer if its been seated for 8+ hours
          if (data.seatedAt !== '') {
            let now = new Date(),
                seatedAt = new Date(data.seatedAt);
            let hoursDiff = Math.floor(now - seatedAt) / 36e5;

            if (hoursDiff >= 8) {
              Data.DB.ref(`queuers/${this.user.uid}/${child.key}`).remove();
            }
          }
          // remove queuer if its been seated for 8+ hours
          if (data.removedAt !== '') {
            let now = new Date(),
                removedAt = new Date(data.removedAt);
            let hoursDiff = Math.floor(now - removedAt) / 36e5;

            if (hoursDiff >= 8) {
              Data.DB.ref(`queuers/${this.user.uid}/${child.key}`).remove();
            }
          }
          filteredQueuerItems.push({
            ...data,
            key: child.key
          });
        } else {
          queuerItems.push({
            ...data,
            key: child.key,
          });
        }
      });

      // set initial selected queuer
      for (let i = 0; i < queuerItems.length; i++) {
        if (queuerItems[i].selected) {
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
        filteredData: filteredQueuerItems,
        spinner: false
      });
    });
  }

  // open the modal
  openModal() {
    this.setState({
      modalVisible: true,
      modalItemVisible: 'NAME'
    });
  }

  // show input group based on state
  showInput() {
    switch (this.state.modalItemVisible) {

      case 'NAME':
        // return name input field
        return (
          <InputModal
            label={'Name'}
            buttonText={'→'}
            onChangeText={(text) => {this.setState({nameInput: text})}}
            value={this.state.nameInput}
            onPress={this.checkNameInput.bind(this)}
          />
        );
        break;

      case 'PARTY':
        // return party size input field
        return (
          <InputModal
            label={'Size of Party'}
            buttonText={'→'}
            onChangeText={(text) => {this.setState({partyInput: text})}}
            value={this.state.partyInput}
            onPress={this.checkPartyInput.bind(this)} />
        );
        break;

      case 'NUMBER':
        // return phone number input field
        return (
          <InputModal
            label={'Phone Number (optional)'}
            buttonText={'Submit'}
            onChangeText={this.changePhoneInput.bind(this)}
            value={this.state.phoneInput}
            onPress={this.addQueuer.bind(this)} />
        );
        break;

      case 'ABOUT':
        // return text about Q
        return (
          <Text style={{color: 'white', fontSize: 35, lineHeight: 55, maxWidth: 600}}>
            Queue was created by Chris Wahlfeldt in Champaign IL. USA
          </Text>
        );

      default:
        return (<Text>None</Text>);
        break;
    }
  }

  changePhoneInput(text) {
    //if (isNaN(text)) return;

    let phoneNum = text.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let newNum = !phoneNum[2] ? phoneNum[1] : `(${phoneNum[1]}) ${phoneNum[2]}${phoneNum[3] ? '-' + phoneNum[3] : ''}`;

    this.setState({phoneInput: newNum});
  }

  // checks name input in modal
  checkNameInput() {
    if (this.state.nameInput !== '') {
      this.setState({modalItemVisible: 'PARTY'});
    } else {
      Common.error('Error', 'Enter a Name');
    }
  }

  // checks the party size input
  checkPartyInput() {
    if (this.state.partyInput !== '') {
      this.setState({modalItemVisible: 'NUMBER'});
    } else {
      Common.error('Error', 'Enter the Party Size');
    }
  }

  // shows nav contexts
  showNavItems() {

    switch (this.state.navVisible) {

      case 'HOME':
        // return home
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
            text={this.textQueuer.bind(this)}
            seat={this.seatQueuer.bind(this)}
            remove={this.removeQueuer.bind(this)}
          />
        );
        break;

      case 'SETTINGS':
        return (
          <Settings
            user={this.user}
            email={this.state.emailInput}
            organization={this.state.orgInput}
            textsSent={this.state.textsSent}
            onChangeEmail={(text) => this.setState({emailInput: text})}
            onChangeOrg={(text) => this.setState({orgInput: text})}
            savePress={this.saveProfile.bind(this)}
            paymentPress={() => this.setState({navVisible: "PAYMENT"})}
          />
        );
        break;

      case 'HISTORY':
        return (
          <History
            data={this.state.filteredData}
            uid={this.user.uid}
            dropdown={this.dropdown}
          />
        );

      case 'PAYMENT':
        return (
          <Payment
            backPress = {() => this.setState({navVisible: "SETTINGS"})}
          />
        );

      default:
        return (<Text>No nav item</Text>)
        break;
    }
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
      this.dropdown.showDropdown('error', 'Error', `Error on updating profile: ${error}`);
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
    // set selected queuer
    let data = this.state.queuerData;
    for (let i = 0; i < data.length; i++) {
      let key = data[i].key;
      if (key === item.key) {
        Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
          selected: true
        });
      } else {
        Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
          selected: false
        });
      }
    }

    // set current item
    this.setState({
      selectedKey: item.key,
      editName: item.name,
      editParty: item.partySize,
      editPhone: item.phoneNumber,
      editNotes: item.notes,
      navVisible: 'HOME'
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
        isSelected={item.selected}
        isOpen={item.opened}
        createdAt={item.createdAt}
        partySize={item.partySize}
        onPress={this.setSelectedQueuer.bind(this, item)}
        onOpen={this.setOpenQueuer.bind(this, item)}
        onRemovePress={this.removeQueuer.bind(this, item)}
        onSeatPress={this.seatQueuer.bind(this, item)}
        onTextPress={this.textQueuer.bind(this, item)}
      />
    );
  }

  // text the queuer
  textQueuer(item) {
    let number = item.phoneNumber || this.state.editPhone,
        name = item.name || this.state.editName;
    let message = `Your table is ready! Please see the host for more details.\n\nText 'Cancel' to remove yourself from Queue.`;

    if (number !== '' && Common.validatePhoneNumber(number)) {
      Alert.alert(
        `Text ${name}`,
        `Are you sure you want to text ${name}?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => {
            Twilio.text(number, message).then(response => {
              this.incrementTexts();
              this.dropdown.showDropdown('success', 'Success', `Texted ${name}`);
              console.log(response);
            }).catch(error => {
              this.dropdown.showDropdown('error', 'Error', error);
              console.log(error);
            });
          }}
        ]
      );
    } else {
      this.dropdown.showDropdown('error', 'Error', 'Incorrect phone number provided');
    }
  }

  // sets the opened swipeout for each queuer - can only open one in the lsit
  setOpenQueuer(item) {
    let queuers = this.state.queuerData;
    for (let i = 0; i < queuers.length; i++) {
      let queuerKey = queuers[i].key;
      if (queuerKey === item.key) {
        Data.DB.ref(`queuers/${this.user.uid}/${queuerKey}`).update({
          selected: queuers[i].selected,
          opened: true
        });
      } else {
        Data.DB.ref(`queuers/${this.user.uid}/${queuerKey}`).update({
          selected: queuers[i].selected,
          opened: false
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
          Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
            removed: true,
            selected: false,
            removedAt: Date(),
          });
          BackgroundTimer.setTimeout(() => {
            Data.DB.ref(`queuers/${this.user.uid}/${key}`).remove();
          }, (3600000 * 8));
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
          Data.DB.ref(`queuers/${this.user.uid}/${key}`).update({
            seated: true,
            selected: false,
            seatedAt: Date(),
          });
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

  incrementTexts() {
    this.setState({textsSent: this.state.textsSent + 1});
    Data.DB.ref(`users/${this.user.uid}`).set({
      texts: this.state.textsSent
    }).catch(error => {
      console.log(error)
    });
  }

  // compute when submitting a queuer and check phone input
  addQueuer() {
    // init text to customer
    if (this.state.phoneInput !== '') {
      if (Common.validatePhoneNumber(this.state.phoneInput)) {
        let message = `Thanks ${this.state.nameInput}, your table will be ready soon.\n\nText 'Cancel' to remove yourself from Queue.`;
        Twilio.text(this.state.phoneInput, message).then(response => {
          this.incrementTexts();
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
      } else {
        return this.dropdown.showDropdown('error', 'Error', 'Invalid phone number');
      }
    }
    // show dropdown
    this.dropdown.showDropdown('success', 'Queuer Added', `${this.state.nameInput} has been added to Queue`);
    // add the queuer
    Data.DB.addQueuer(this.queuerItemsRef,
      this.state.nameInput,
      this.state.partyInput,
      this.state.phoneInput
    );
    this.setState({
      modalVisible: false,
      modalItemVisible: 'NAME',
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
    if (isNaN(text)) {
      return;
    }
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editParty: text});
    Data.DB.ref(ref).update({
      partySize: text
    });
  }

  // edits and saves to the databse as typeing for PHONE NUMBER
  changeAndSavePhone(text) {
    //if (isNaN(text)) return;

    let phoneNum = text.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    let newNum = !phoneNum[2] ? phoneNum[1] : `(${phoneNum[1]}) ${phoneNum[2]}${phoneNum[3] ? '-' + phoneNum[3] : ''}`;

    this.setState({editPhone: newNum});

    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    Data.DB.ref(ref).update({
      phoneNumber: newNum,
    });
  }

  // edits and saves to the databse as typeing for NAME
  changeAndSaveNotes(text) {
    let ref = `queuers/${this.user.uid}/${this.state.selectedKey}`;
    this.setState({editNotes: text});
    Data.DB.ref(ref).update({
      notes: text
    });
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
                press={() => {this.setState({modalVisible: true, modalItemVisible: 'ABOUT'})}}
              />
            </View>
          </View>
          <View style={{
            marginTop: -21,
            width: '100%',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
            <NavButton
              text={'Home'}
              symbol={'ios-home-outline'}
              isSelected={this.state.navVisible === 'HOME'}
              onPress={() => {this.setState({navVisible: 'HOME'})}}
            />
            <NavButton
              text={'History'}
              symbol={'ios-list-box-outline'}
              isSelected={this.state.navVisible === 'HISTORY'}
              onPress={() => {this.setState({navVisible: 'HISTORY'})}}
            />
            {/*<NavButton
              text={'Self Host'}
              symbol={'ios-unlock'}
              isSelected={false}
              onPress={() => {console.log('alright')}}
            />*/}
            <NavButton
              text={'Settings'}
              symbol={'ios-settings-outline'}
              isSelected={this.state.navVisible === 'SETTINGS'}
              onPress={() => {this.setState({navVisible: 'SETTINGS'})}}
            />
            <NavButton
              text={'Logout'}
              symbol={'ios-exit-outline'}
              isSelected={false}
              onPress={this.signOut.bind(this)}
            />
          </View>
        </Col>

        <Col size={49} style={styles.actionArea}>
          <View style={[Layout.container, {height: '100%'}]}>
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
            <Icon style={{textAlign: 'center'}} name={'ios-add-outline'} size={60} color={'white'} />
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
