import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esLikeado: false,
      likes: this.props.item.data.likesCount || 0, // Iniciar con likesCount en 0 si no tiene CHEQUEAR
    };
  }

  componentDidMount() {
    const userEmail = auth.currentUser ? auth.currentUser.email : null;
    const { arrLikes, likesCount } = this.props.item.data;

    if (arrLikes && arrLikes.includes(userEmail)) {
      this.setState({ esLikeado: true });
    }

    if (likesCount !== undefined) {
      this.setState({ likes: likesCount });
    }
  }

  actualizarLike(idDocumento) {
    db.collection('posts')
      .doc(idDocumento)
      .update({
        arrLikes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
        likesCount: firebase.firestore.FieldValue.increment(1),
      })
      .then(() => {
        this.setState({
          esLikeado: true,
          likes: this.state.likes + 1, 
        });
      });
  }

  noLike(idDocumento) {
    // Eliminamos el like del post en la base de datos
    db.collection('posts')
      .doc(idDocumento)
      .update({
        arrLikes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email), 
        likesCount: firebase.firestore.FieldValue.increment(-1)
      })
      .then(() => {
        this.setState({
          esLikeado: false,
          likes: this.state.likes - 1, 
        });
      });
  }

  render() {
    return (
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Text style={styles.owner}>{this.props.item.data.owner}</Text>
        </View>
        <Text style={styles.postContent}>{this.props.item.data.post}</Text>
        <Text style={styles.likesCount}>Likes: {this.state.likes}</Text>

        {this.state.esLikeado ? (
          <TouchableOpacity
            onPress={() => this.noLike(this.props.item.id)}
            style={styles.btnUnlike}
          >
            <Text style={styles.btnText}>No me gusta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this.actualizarLike(this.props.item.id)}
            style={styles.btnLike}
          >
            <Text style={styles.btnText}>Me gusta</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    paddingBottom: 5,
  },
  owner: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#555',
    marginVertical: 10,
  },
  likesCount: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  btnLike: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  btnUnlike: {
    padding: 10,
    backgroundColor: '#F44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
