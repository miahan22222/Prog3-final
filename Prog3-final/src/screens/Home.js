import { Text, View ,FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import FormularioHome from '../components/FormularioHome'

class Home extends Component {
  constructor(props){
    super(props);
    this.state={

    };
  }
  render() {
    return (
      <View>
        <Text>Home</Text>
        <FormularioHome />
        <Posts/>
      </View>
    )
  }
}
export default Home;