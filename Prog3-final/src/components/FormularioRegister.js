import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class FormularioRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            error: ''
        };
    }

    submit(email, username, password){
        if(email === '') {
            this.setState({ error: 'Complete el campo EMAIL' });
        return}

        if(username === '') {
        this.setState({ error: 'Complete el campo USERNAME' })
        return}

        if(password.length === 0) {
            this.setState({ error: 'Complete el campo PASSWORD' })
            return}

        // if (!email.includes('@') ){
        //     this.setState({ error: 'Ingrese un formato de email valido' });
        //     return;
        // }
    
        // if (username.length < 2) {
        //     this.setState({ error: 'Ingrese un username más largo' });
        //     return;
        // }
    
        // if (password.length < 5) {
        //     this.setState({ error: 'Ingrese una password con minimo 5 digitos' });
        //     return;
        // }
    
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Cuando el usuario se crea con éxito, lo desconectamos inmediatamente xq sino entiende que se logueo 
                //en firebase y no funciona, solo se registra no deberia entender como que se logueo
                // recien lei en slack que a todos les pasa lo mimso y que esta bien si lleva directo a home ya que firebase identifica una sesion abierta
                auth.signOut().then(() => {
                    // Navegar al login después de que el usuario haya sido creado
                    this.props.navigation.navigate('login');
                });
    
                // Guardamos el usuario en Firestore
                return db.collection('users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    username: username,
                });
            })
            .catch(err => {
                if (err.code) {
                    this.setState({ error: err.code});
                // } else {
                //     console.error(err);
                //     this.setState({ error: 'Hubo un problema al crear la cuenta. Intenta nuevamente.' });
                 }
            });
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
                    style={styles.input}
                    placeholder="Ingrese su username"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ username: text, error: '' })}
                    value={this.state.username}
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
                            this.state.username,
                            this.state.password
                        )
                    }
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                       Registrarse
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

