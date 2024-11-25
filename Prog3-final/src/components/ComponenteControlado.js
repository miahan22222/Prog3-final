import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class ComponenteControlado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valorInput1: '',
    };
  }

  controlarInputs(text) {
    this.setState(
      {
        valorInput1: text,
      },
      () => this.props.filtrarUser(this.state.valorInput1)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="¿Qué quieres buscar?"
          keyboardType="default"
          onChangeText={(text) => this.controlarInputs(text)}
          value={this.state.valorInput1}
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
