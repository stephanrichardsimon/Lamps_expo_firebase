import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Fontisto, Feather } from '@expo/vector-icons';

const Nav = props => {

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 1,
      flex: 1,
      width: '107%',
      minHeight: '100%',
      maxHeight: '100%'
    },
    children: {
      flex: 1,
      minHeight: '90%',
      maxHeight: '90%'
    },
    btns: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      backgroundColor: '#0094FF'
    },
    btn: {
      width: '20%',
      height: '80%',
      marginTop: 5,
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.children}>{props.children}</View>
      <View style={styles.btns}
      >
        <Button
          onPress={() => navigation.navigate('Home')}
          style={styles.btn}
          variant="link"
        >
          <Ionicons name="home-outline" size={30} color="white" />
        </Button>
        <Button
          onPress={() => navigation.navigate('Import')}
          style={styles.btn}
          variant="link"
        >
          <Fontisto name="import" size={30} color="white" />
        </Button>
        <Button
          onPress={() => navigation.navigate('Settings')}
          style={styles.btn}
          variant="link"
        >
          <Feather name="settings" size={30} color="white" />
        </Button>
      </View>
    </View>
  )
}

export default Nav;


