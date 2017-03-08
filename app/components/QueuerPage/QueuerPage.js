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

// Common librarys
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

  render() {
    let name = this.props.name === '' ? '<Add Name>' : this.props.name;
    return (
      <View style={styles.container}>
        {this.props.queuerKey !== '' ? (
          <KeyboardAwareScrollView>
            <Text style={styles.header}>
              {name}
            </Text>
            <View style={{marginTop: 20}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={this.props.nameChange}
                  value={this.props.name}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.label}>Party Size</Text>
                <TextInput
                  style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={this.props.partyChange}
                  value={this.props.partySize}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={{paddingLeft: 15, height: 45, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={this.props.phoneChange}
                  value={this.props.phoneNumber}
                />
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={{paddingTop: 7, paddingLeft: 15, fontSize: 17, height: 140, borderColor: Colors.primaryBackground, borderWidth: 1}}
                  onChangeText={this.props.notesChange}
                  value={this.props.notes}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Grid>
                <Row>
                  {/*<Col style={{marginBottom: 8, marginRight: 8}}>
                    <TouchableHighlight
                      style={{backgroundColor: Colors.success}}
                      underlayColor={Colors.green4}
                      onPress={this.props.save}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                  </Col>*/}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 13
  },
  header: {
    fontSize: 55,
    fontWeight: '100',
    letterSpacing: 2
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 15,
    letterSpacing: 1
  },
  col: {
    margin: 5
  },
  label: {
    letterSpacing: 1,
    marginBottom: 5,
    color: 'grey'
  }
});
