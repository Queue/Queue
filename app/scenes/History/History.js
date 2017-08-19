// History Scene

import React, { Component } from 'react';

import {
View,
FlatList,
Text,
StyleSheet,
ScrollView,
TouchableHighlight,
Alert
} from 'react-native';

import {Column as Col, Row} from 'react-native-responsive-grid';

import Colors from '../../lib/colors';

import Data from '../../lib/data';
import moment from 'moment';

export default class History extends Component {
  constructor(props) {
    super(props);
  }

  // delete an item from the database
  del(item) {
    Alert.alert(
      `Remove ${item.name}`,
      `Are you sure you want to remove ${item.name} for good?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.props.dropdown.showDropdown('success', 'Success', `${item.name} removed from database`)
          Data.DB.removeQueuer(this.props.uid, item.key);
        }}
      ]
    );
  }

  // undo an item and return it back to the list
  undo(item) {
    Alert.alert(
      `Undo ${item.name}`,
      `Are you sure you want to undo ${item.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          this.props.dropdown.showDropdown('success', 'Success', `${item.name} moved back to queue`)
          Data.DB.ref(`queuers/private/${this.props.uid}/${item.key}`).update({
            seated: false,
            removed: false
          });
          Data.DB.ref(`queuers/public/${this.props.uid}/${item.key}`).update({
            seated: false,
            removed: false
          });
        }}
      ]
    );
  }

  // clear all removed and seated in the database
  clear() {
    if (this.props.data.length) {
      Alert.alert(
        `Clear All`,
        `Are you sure you want to clear and remove all queuers from the database?`,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => {
            let data = this.props.data;
            for (let i = 0; i < data.length; i++) {
              let key = data[i].key;
              Data.DB.removeQueuer(this.props.uid, key);
            }
            this.props.dropdown.showDropdown('success', 'Success', 'All queuers removed from database')
          }}
        ]
      );
    } else {
      this.props.dropdown.showDropdown('error', 'Error', 'No queuers to remove');
    }
  }

  renderItem({item, index}) {
    return (
      <View style={[styles.itemContainer, {borderColor: item.removed ? Colors.error : Colors.success}]}>
        <Row>
          <Col size={6}>
            <View style={{backgroundColor: 'transparent'}}>
              <Text style={[styles.text, {textAlign: 'center'}]}>{index + 1}.</Text>
            </View>
          </Col>
          <Col size={30}>
            <Text style={styles.text}>{item.name}</Text>
          </Col>
          <Col size={29}>
            <Text style={styles.text}>{moment(new Date(item.createdAt)).format('h:mma')}</Text>
          </Col>
          <Col size={16}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={this.del.bind(this, item)}
            >
              <Text style={[styles.text, {color: Colors.error}]}>DEL</Text>
            </TouchableHighlight>
          </Col>
          <Col size={19}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={this.undo.bind(this, item)}
            >
              <Text style={[styles.text, {color: Colors.success}]}>UNDO</Text>
            </TouchableHighlight>
          </Col>
        </Row>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>History</Text>
        <Text style={styles.text}>Queuers will be kept in history for 8 hours.</Text>
          <Row style={{marginTop: 20}}>
            <Col size={50}>
              <View style={{width: '100%', borderLeftWidth: 10, borderColor: Colors.success}}>
                <Text style={[styles.text, {padding: 10}]}>Seated</Text>
              </View>
            </Col>
            <Col size={50}>
              <View style={{width: '100%', borderLeftWidth: 10, borderColor: Colors.error}}>
                <Text style={[styles.text, {padding: 10}]}>Removed</Text>
              </View>
            </Col>
          </Row>
        <View style={{marginTop: 20}}>
          <FlatList
            data={this.props.data}
            renderItem={this.renderItem.bind(this)}
          />
          <TouchableHighlight
            onPress={this.clear.bind(this)}
            underlayColor={Colors.red4}
            style={{backgroundColor: Colors.error, width: '100%', marginTop: 10, borderRadius: 2}}
          >
            <Text style={[styles.text, {textAlign: 'center', color: 'white', padding: 10, fontSize: 20}]}>Clear</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 13,
  },
  header: {
    fontSize: 55,
    fontWeight: '100',
    fontFamily: Fonts.content,
    letterSpacing: 2
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.content
  },
  itemContainer: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderLeftWidth: 10
  }
});
