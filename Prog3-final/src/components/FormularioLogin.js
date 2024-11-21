import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class FormularioLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            login: false,
            error: ''
        };
    }

    componentDidMount(){
        auth.onAuthStateChanged(user=> console.log("El usuario es: ", JSON.stringify(user,null,4)))
    }
    submit(email, password){

        auth.signInWithWithEmailAndPassword(email, password)
        .then((user) => { this.setState({logued: true})
        .then(()=> this.props.navigation.navigate("home"))
           
        })
        .catch(err => {
          
                this.setState({error: 'Fallo login'})
            
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
                    <TouchableOpacity
                         onPress={()=> this.props.navigation.navigate("home")}>
                    
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                       Loguearse
                        </Text>
                        </TouchableOpacity>
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

