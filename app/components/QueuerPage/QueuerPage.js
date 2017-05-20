//
// QueuerPage is a higher level component
// for displaying editable features of a single queuer

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';

import PrimaryButton from '../PrimaryButton';

import Field from '../Field';

import styles from './styles';

// Common libraries
import Common from '../../lib/common';
import Colors from '../../lib/colors';
import Data from '../../lib/data';

// grid system
//import { Grid, Row, Col } from 'react-native-easy-grid';
import {Column as Col, Row} from 'react-native-responsive-grid';

// keyboard scroll view
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class QueuerPage extends Component {
  constructor(props) {
    super(props);
  }

  // remove queuer
  removeQueuer() {
    Data.DB.delete();
  }

  render() {
    let name = this.props.name || '<Name>';

    return (
      <View style={styles.container}>
        {this.props.queuerKey !== '' ? (
          <KeyboardAwareScrollView>
            <Text style={styles.header}>
              {name}
            </Text>
            <View style={{marginTop: 20}}>
              <Field
                type={'text'}
                label={'Name'}
                value={this.props.name}
                onChangeText={this.props.nameChange}
              />
              <Field
                type={'text'}
                label={'Party Size'}
                value={this.props.partySize}
                onChangeText={this.props.partyChange}
              />
              <Field
                type={'number'}
                label={'Phone Number'}
                value={this.props.phoneNumber}
                onChangeText={this.props.phoneChange}
                placeholder={'Phone Number'}
              />
              <Field
                type={'textarea'}
                label={'Notes'}
                value={this.props.notes}
                onChangeText={this.props.notesChange}
                placeholder={'Notes'}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Row>
                <Col size={100}>
                  <View style={{width: '100%'}}>
                    <PrimaryButton
                      name={'Text'}
                      buttonColor={Colors.info}
                      press={this.props.text}
                    />
                  </View>
                </Col>
              </Row>
              <Row>
                <Col size={50}>
                  <View style={{width: '100%'}}>
                    <PrimaryButton
                      name={'Seat'}
                      buttonColor={Colors.success}
                      press={this.props.seat}
                    />
                  </View>
                </Col>
                <Col size={50}>
                   <View style={{width: '100%'}}>
                    <PrimaryButton
                      name={'Remove'}
                      buttonColor={Colors.error}
                      press={this.props.remove}
                    />
                  </View>
                </Col>
              </Row>
            </View>
          </KeyboardAwareScrollView>
        ) : (
          <View style={styles.unselectedContainer}>
            <Text style={styles.unselectedText}>
              Select a person in queue to edit their values.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
