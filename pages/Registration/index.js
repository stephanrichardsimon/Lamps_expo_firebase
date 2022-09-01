import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider, Image } from "native-base";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import firestore from "@react-native-firebase/firestore";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Alert } from 'react-native';

const Registation = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadin, setIsLoadin] = useState(false);
  const navigation = useNavigation();
  const [saveMessage, setSaveMessage] = useState(false)

  const handleNewAccount = () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Por favor, preencha todos os campos!')
    } else {
      setIsLoadin(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
      firestore()
        .collection('users')
        .add({
          name,
          email,
        })
        .then(() => {
          setSaveMessage(true)
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoadin(false))
    }
  }

  return <Center bg={'white'} w="105%" h={"105%"}>
    <Image source={require("../../public/logo.png")} alt="logo" w="90%" />
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Cadastrar
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Nome</FormControl.Label>
          <Input placeholder="Nome" onChangeText={setName} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input placeholder="E-mail" onChangeText={setEmail} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
        </FormControl>
        <Button mt="2" colorScheme="blue"
          onPress={handleNewAccount}
          isLoading={isLoadin}
        >
          Cadastrar
        </Button>
        <Button mt="2" colorScheme="blue"
          onPress={() => navigation.navigate('Login')}
        >
          Cancelar
        </Button>
      </VStack>
    </Box>
    <AwesomeAlert
      show={saveMessage}
      showProgress={false}
      title="Cadastro efetuado com sucesso!"
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
      onConfirmPressed={() => navigation.navigate('Login')}
    />
  </Center>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Registation />
      </Center>
    </NativeBaseProvider>
  );
};
