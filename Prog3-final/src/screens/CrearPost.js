import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
export default class CrearPost extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            post: '',
            error: ""
        }
        
        
    }
   
    enviarPost(){
        if(
            this.state.post !== '' && this.state.post.length >0
        ){
            
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                post: this.state.post,
                likesCount: 0,
                
                
            })
            .then(
                () => this.props.navigation.navigate( 'home' )
            )
            .catch(err => {
                console.log(err)
            })
            
        }
            
            
    }
    

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crear un Post</Text>
        
            
            <TextInput
                style={styles.input}
                keyboardType='default'
                placeholder='Que quieres postear?'
                onChangeText={(texto) => this.setState({ post: texto}) }
                value={this.state.post}
            />
            <TouchableOpacity
            style={styles.btn}
                onPress={() => this.enviarPost()}
            >
                <Text style={styles.btntext}>
                    Postear
                </Text>
            </TouchableOpacity>
        
      </View>
    )
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
      input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    btn: {
        marginTop: 20,
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
      },
    btntext: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
   
  }})