import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FormularioHome from '../components/FormularioHome'
export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>Home</Text>
        <FormularioHome />
      </View>
    )
  }
}