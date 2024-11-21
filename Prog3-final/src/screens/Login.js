import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import {auth} from "../firebase/config"

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('props de la screen', this.props)
    }

    irARegister(){
        this.props.navigation.navigate('register')
    }

  render() {
    return (
      <View>
        <Text>Estamos en el login</Text>
        <TouchableOpacity
            onPress={() => this.irARegister()}
        >
            <Text>Vamos al register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}