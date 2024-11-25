import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userInfo: null, 
        posteos: [],    
        };
    }

    componentDidMount() {
        db.collection('users')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot((docs) => {
            let arrDocs = null;
            docs.forEach((doc) => {
            arrDocs = { id: doc.id, data: doc.data() };
            });

            this.setState({ userInfo:arrDocs });
        });

        db.collection('posts')
        .where('owner', '==', auth.currentUser.email)
        .onSnapshot((docs) => {
            let arrPosteos = [];
            docs.forEach((doc) => {
            arrPosteos.push({ id: doc.id, data: doc.data() });
            });

            this.setState({ posteos: arrPosteos });
        });
    }

    borrarPost(id) {
        db.collection('posts')
        .doc(id)
        .delete()
        .then(() => console.log(`Post ${id} eliminado`))
        .catch((err) => console.log(err));
    }

    logout() {
        auth
        .signOut()
        .then(() => this.props.navigation.navigate('login'))
        .catch((err) => console.log(err));
    }
    irACrear(){
    
        this.props.navigation.navigate('crear');
        
    }

    render() {
        const { userInfo, posteos } = this.state;

        return (
        <View style={styles.container}>
            <Text style={styles.header}>Mi perfil</Text>

            {userInfo ? (
            <View style={styles.userInfo}>
                <Text>Nombre de usuario: {userInfo.data.username}</Text>
                <Text>Email: {userInfo.data.owner}</Text>
                <Text>Total de posteos: {posteos.length}</Text>
            </View>
            ) : (
            <Text>Cargando información del usuario...</Text>
            )}

            {posteos.length === 0
            ?
            (
                <TouchableOpacity
                onPress={() => this.irACrear()}
                >
                    <Text style={styles.nohay}>¡Haz tu primer posteo!</Text>
                </TouchableOpacity>
            )
        :
        (
            <FlatList
            data={posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.post}>
                <Text>{item.data.post}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.borrarPost(item.id)}
                >
                    <Text style={styles.deleteButtonText}>Borrar</Text>
                </TouchableOpacity>
                </View>
            )}
            />
        )}
            

            <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
            <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
        );
    }
    }

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nohay: {
    fontSize: 14,
    color: '#1E88E5',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 20,
  },
  post: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
