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

import Field from '../Field';

import styles from './styles';

// Common libraries
import Common from '../../lib/common';
import Colors from '../../lib/colors';
import Data from '../../lib/data';

// grid system
import { Grid, Row, Col } from 'react-native-easy-grid';

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
              />
              <Field
                type={'textarea'}
                label={'Notes'}
                value={this.props.notes}
                onChangeText={this.props.notesChange}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Grid>
                <Row>
                  <Col style={{
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      marginBottom: 8,
                      backgroundColor: Colors.info
                  }}>
                    <TouchableHighlight
                      underlayColor={Colors.blue4}
                      onPress={() => {Common.logLess('Cool')}}>
                      <Text style={styles.buttonText}>Text</Text>
                    </TouchableHighlight>
                  </Col>
                </Row>
                <Row>
                  <Col style={{
                      backgroundColor: Colors.success,
                      borderBottomLeftRadius: 2,
                      marginTop: 4,
                      marginRight: 8
                  }}>
                    <TouchableHighlight
                      underlayColor={Colors.green4}
                      onPress={() => {Common.logLess('Cool')}}>
                      <Text style={styles.buttonText}>Seat</Text>
                    </TouchableHighlight>
                  </Col>
                  <Col style={{
                    backgroundColor: Colors.error,
                    borderBottomRightRadius: 2,
                    marginTop: 4,
                    marginLeft: 8
                  }}>
                    <TouchableHighlight
                      underlayColor={Colors.red4}
                      onPress={this.props.remove}>
                      <Text style={styles.buttonText}>Remove</Text>
                    </TouchableHighlight>
                  </Col>
                </Row>
              </Grid>
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
