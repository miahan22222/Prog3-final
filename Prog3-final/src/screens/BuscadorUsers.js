import { Text, View , StyleSheet} from 'react-native'
import React, { Component } from 'react'

export default class BuscadorUsers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BuscadorUsers</Text>
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
    }
  })