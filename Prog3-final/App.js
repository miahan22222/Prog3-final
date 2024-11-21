import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavegacionPrincipal from './src/navigation/NavegacionPrincipal';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <NavegacionPrincipal />  
      <Stack.Navigator>
        <Stack.Screen
        options= {{ headerShown: false}}
        name= "register"
        component ={Register}
        />
        <Stack.Screen
        options= {{ headerShown: false}}
        name= "login"
        component ={Login}
        />
         <Stack.Screen
        options= {{ headerShown: false}}
        name= "home"
        component ={Home}
        />
        </Stack.Navigator> 
    </NavigationContainer>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f5f5f5', 
  },
})