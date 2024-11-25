import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Usuario logueado:", user.email);
                this.props.navigation.navigate('anidada');
            } else {
                console.log("No hay usuario logueado.");
            }
        });
    }
    
    submit(email, password){

        auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=> this.props.navigation.navigate('anidada' ))
        .catch(err => {
          
                this.setState({error: 'Email o contraseña incorrectos. Inténtalo de nuevo.' });
            
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese su correo"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text, error: '' })}
                    value={this.state.email}
                />
                
                <TextInput
                    value={this.state.password}
                    style={styles.input}
                    placeholder="Ingrese su contraseña"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ password: text, error: '' })}
                    secureTextEntry={true}
                />
                {this.state.error !== '' && (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                )}
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                        this.submit(
                            this.state.email,
                            this.state.password
                        )
                    }
                >
                    
                    
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                       Loguearse
                        </Text>
                   
                </TouchableOpacity>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5
    },
    btn: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    }
});

