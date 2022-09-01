// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { firebaseConfig } from './Config';
import { initializeApp } from "firebase/app";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Routes} from './routes'

export default function App() {
  
  const app = initializeApp(firebaseConfig);
  const Stack = createNativeStackNavigator();

  // console.log(app)
  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.js to start working on your teste!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );

  return <Routes />
}