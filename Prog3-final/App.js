import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavegacionPrincipal from './src/navigation/NavegacionPrincipal';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import FormularioRegister from './src/components/FormularioRegister';
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View style= {StyleSheet.container}>
    <NavigationContainer>
      <NavegacionPrincipal />  
      <Stack.Navigator>
        <Stack.Screen
        options= {{ headerShown: false}}
        name= "Register"
        component ={FormularioRegister}
        />
        <Stack.Screen
        options= {{ headerShown: false}}
        name= "Login"
        component ={Login}
        />
         <Stack.Screen
        options= {{ headerShown: false}}
        name= "Home"
        component ={Home}
        />
        </Stack.Navigator> 
    </NavigationContainer>
    </View>
  );
}

const styles= StyleSheet.create({})