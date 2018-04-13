import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Action
} from 'react-native-router-flux';

class Home extends React.Component {
  state = {
    name: ''
  };
  render() {
    return(
      <View>
        <Text style={styles.title}>
          Enter your name:
        </Text>
        <TextInput 
          style={styles.nameInput}
          placeholder='John Snow'
          onChangeText={(text) => {
            this.setState({
              name:text,
            });
          }}
          value={this.state.name}
        />
        <TouchableOpacity
          onPress={() => {
            //navigation to next screen and pass it the name
            Actions.chat({
              name: this.state.name,
            });
          }}
          >
          <Text style={styles.buttonText}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 25,
  },
  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20,
  }
});

export default Home;