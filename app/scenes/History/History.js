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

  del(item) {
    Alert.alert(
      `Remove ${item.name}`,
      `Are you sure you want to remove ${item.name} for good?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          Data.DB.ref(`queuers/${this.props.uid}/${item.key}`).remove();
        }}
      ]
    );
  }

  undo(item) {
    Alert.alert(
      `Undo ${item.name}`,
      `Are you sure you want to undo ${item.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {
          Data.DB.ref(`queuers/${this.props.uid}/${item.key}`).update({
            seated: false,
            removed: false
          });
        }}
      ]
    );
  }

  renderItem({item, index}) {
    return (
      <View style={[styles.itemContainer, {borderColor: item.removed ? Colors.error : Colors.success}]}>
        <Row>
          <Col size={1}>
            <View style={{marginLeft: -35, backgroundColor: 'transparent'}}>
              <Text style={[styles.text, {color: 'white', textAlign: 'center'}]}>{index + 1}.</Text>
            </View>
          </Col>
          <Col size={32}>
            <Text style={styles.text}>{item.name}</Text>
          </Col>
          <Col size={40}>
            <Text style={styles.text}>{moment(new Date(item.createdAt)).format('MMM Do, h:mma')}</Text>
          </Col>
          <Col size={12}>
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={this.del.bind(this, item)}
            >
              <Text style={[styles.text, {color: Colors.error}]}>DEL</Text>
            </TouchableHighlight>
          </Col>
          <Col size={15}>
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
        <View style={{marginTop: 30}}>
        <FlatList
          data={this.props.data}
          renderItem={this.renderItem.bind(this)}
        />
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
  },
  itemContainer: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderLeftWidth: 40
  }
});
