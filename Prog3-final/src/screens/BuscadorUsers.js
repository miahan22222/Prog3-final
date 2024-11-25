import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import ComponenteControlado from '../components/ComponenteControlado';

export default class BuscadorUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        usuarios: [],
        usuarios2: [],
        mensajeError: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot((docs) => {
        let arrUsers = [];
        docs.forEach((doc) => {
            arrUsers.push({
            id: doc.id,
            data: doc.data(),
            });
        });

        this.setState({
            usuarios: arrUsers,
            usuarios2: arrUsers,
        });
        });
    }

    filtrarUser(user) {
        const userFiltrado = this.state.usuarios2.filter((elm) =>
        elm.data.username.toLowerCase().includes(user.toLowerCase())
        );

        if (userFiltrado.length === 0) {
        this.setState({
            usuarios: [],
            mensajeError: 'El username no existe.',
        });
        } else {
            console.log("filtrado:", userFiltrado)
            this.setState({
            usuarios: userFiltrado,
            mensajeError: '',
        });
        }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Buscador de Usuarios</Text>
        <ComponenteControlado
          filtrarUser={(nombre) => this.filtrarUser(nombre)}
        />
        <Text style={styles.title2}>Todos los usuarios</Text>

        {this.state.mensajeError ? (
          <Text style={styles.errorText}>{this.state.mensajeError}</Text>
        ) : (
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.userText}>
                {item.data.username}
              </Text>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1E88E5',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  userText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
