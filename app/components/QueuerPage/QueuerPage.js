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

import styles from './styles';

// Common libraries
import Common from '../../lib/common';
import Colors from '../../lib/colors';

// grid system
import { Grid, Row, Col } from 'react-native-easy-grid';

// keyboard scroll view
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class QueuerPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.row); 
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
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={this.props.nameChange}
                  value={this.props.name}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Party Size</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={this.props.partyChange}
                  value={this.props.partySize}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={this.props.phoneChange}
                  value={this.props.phoneNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textareaInput}
                  onChangeText={this.props.notesChange}
                  value={this.props.notes}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Grid>
                <Row>
                  <Col style={{marginBottom: 8}}>
                    <TouchableHighlight
                      style={{backgroundColor: Colors.info}}
                      underlayColor={Colors.blue4}
                      onPress={() => {Common.logLess('Cool')}}>
                      <Text style={styles.buttonText}>Text</Text>
                    </TouchableHighlight>
                  </Col>
                </Row>
                <Row>
                  <Col style={{marginTop: 8, marginRight: 8}}>
                    <TouchableHighlight
                      style={{backgroundColor: Colors.success}}
                      underlayColor={Colors.green4}
                      onPress={() => {Common.logLess('Cool')}}>
                      <Text style={styles.buttonText}>Seat</Text>
                    </TouchableHighlight>
                  </Col>
                  <Col style={{marginTop: 8, marginLeft: 8}}>
                    <TouchableHighlight
                      style={{backgroundColor: Colors.error}}
                      underlayColor={Colors.red4}
                      onPress={() => {Common.logLess('Cool')}}>
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
