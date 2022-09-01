import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Button, HStack, Center, NativeBaseProvider, Image } from "native-base";
import { useNavigation } from '@react-navigation/native';
import { Alert } from "react-native";
import { auth } from "../../firebase";

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoadin, setIsLoadin] = React.useState(false);
  const navigation = useNavigation();

  const handleSingIn = () => {
    setIsLoadin(true)
    if (email !== '') {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setIsLoadin(false)
          navigation.navigate('Home')
        })
        .catch(() => {
          Alert.alert('Credenciais inválidas!')
          setIsLoadin(false)
        })
        .catch(error => console.log(error))
    } else {
      Alert.alert('Por favor, insira seu e-mail')
      setIsLoadin(false)
    }
  }

  const handleForgotPassword = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Enviamos um e-mail para você!'))
        .catch(error => console.log(error))
    } else {
      Alert.alert('Por favor, insira seu e-mail')
    }
  }

  return <Center bg={'white'} w="105%" h={"105%"}>
    <Image source={require("../../public/logo.png")} alt="logo" w="90%" />
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
        Bem vindo (a)
      </Heading>
      <Heading _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
        Faça login para continuar!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input placeholder="E-mail" onChangeText={setEmail} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Senha</FormControl.Label>
          <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
          <Button variant="link" mt={6} onPress={handleForgotPassword}>
            Esqueceu sua senha?
          </Button>
        </FormControl>
        <Button mt="2" colorScheme="blue" onPress={handleSingIn} isLoading={isLoadin}>
          Entrar
        </Button>
        <HStack mt="10" display="flex" justifyContent="space-around" alignContent="center">
          <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200",
          }}>
            Ainda não tenho conta.{" "}
          </Text>
          <Button variant="outline" colorScheme="secondary" onPress={() => navigation.navigate('Registration')}>
            Criar conta
          </Button>
        </HStack>
      </VStack>
    </Box>
  </Center>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Login />
      </Center>
    </NativeBaseProvider>
  );
};
