import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import FormularioLogin from '../components/FormularioLogin';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props de la screen', this.props);
  }

  irARegister() {
    this.props.navigation.navigate('register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <FormularioLogin navigation={this.props.navigation} />
        <TouchableOpacity
          style={styles.registerRedirectButton}
          onPress={() => this.irARegister()}
        >
          <Text style={styles.registerRedirectText}>
            No tengo cuenta, ¡Me quiero registrar!
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
  registerRedirectButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  registerRedirectText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});
