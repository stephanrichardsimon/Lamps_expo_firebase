import React, { useEffect, useState } from "react";
import { Center, NativeBaseProvider, Button, Input, FormControl, View } from "native-base";
import Nav from "../../components/Nav";
import { StyleSheet } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Alert } from "react-native";

const Settings = () => {
  const [saveMessage, setSaveMessage] = useState(false)
  const [thisUser, setUser] = useState([])
  const validator = require('validator');
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('')

  useEffect(() => {
    let userx = firebase.auth().currentUser;
    setUser(userx)
  }, [])

  const reauthenticate = (currentPassword) => {
    console.log(currentPassword)
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  const changeEmail = (newEmail, currentPassword) => {
    if (currentPassword === '') {
      Alert.alert("Por favor informe sua senha!")
    } else {
      reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updateEmail(newEmail).then(() => {
          // console.log("Email atualizado!");
          Alert.alert("Email atualizado!")
        }).catch(() => { Alert.alert("Senha inválida!") });
      }).catch(() => { Alert.alert("Senha inválida!") });
    }
  }

  const styles = StyleSheet.create({
    form: {
      width: '90%',
      margin: '5%'
    },
    btn: {
      marginTop: 5,
      width: 150,
      color: '#fff'
    }
  })

  const handleSave = () => {
    // POST
    if (validator.isEmail(email)) {
      setSaveMessage(!saveMessage)
    } else {
      Alert.alert('Por favor, insira e-mail válido!')
    }
  }

  const handleForgotPassword = () => {
    auth()
      .sendPasswordResetEmail(thisUser.email)
      .then(() => Alert.alert('Enviamos um e-mail para você!'))
      .catch(error => console.log(error))
  }

  return <Center w="100%">
    <FormControl style={styles.form}>
      <FormControl.Label>E-mail</FormControl.Label>
      <Input
        onChangeText={e => setUser({ ...thisUser, email: e })}
        value={thisUser.email}
      />
    </FormControl>
    <FormControl style={styles.form}>
      <FormControl.Label>Para alterar o e-mail, insira sua senha!</FormControl.Label>
      <Input
        onChangeText={e => setCurrentPassword(e)}
        value={currentPassword}
        secureTextEntry
      />
    </FormControl>
    <View style={{ marginTop: 20 }}>
      <Button
        onPress={() => changeEmail(thisUser.email, currentPassword)}
        style={styles.btn}
        variant="outline"
      >
        Salvar
      </Button>
      <Button
        onPress={handleForgotPassword}
        style={styles.btn}
        variant="outline"
      >
        Alterar senha
      </Button>
      <Button
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}
        variant="outline"
      >
        Sair
      </Button>
      <AwesomeAlert
        show={saveMessage}
        showProgress={false}
        title="Salvo com sucesso!"
        // message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        // cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#0094FF"
        // onCancelPressed={() => {
        //   this.hideAlert();
        // }}
        onConfirmPressed={() => handleSave()}
      />
    </View>
  </Center>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Nav>
          <Settings />
        </Nav>
      </Center>
    </NativeBaseProvider>
  );
};
