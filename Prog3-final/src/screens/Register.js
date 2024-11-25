import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import FormularioRegister from '../components/FormularioRegister';

export default class Register extends Component {
    constructor(props) {
      super(props);
    }

    irAlLogin() {
      this.props.navigation.navigate('login');
    }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Registro</Text>
          <FormularioRegister navigation={this.props.navigation} />
          <TouchableOpacity
            style={styles.loginRedirectButton}
            onPress={() => this.irAlLogin()}
          >
            <Text style={styles.loginRedirectText}>
              Ya tengo una cuenta existente, ¡Quiero iniciar sesión!
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  loginRedirectButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loginRedirectText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
