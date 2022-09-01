import * as React from "react";
import { Heading, Center, NativeBaseProvider } from "native-base";
import Sliders from "../../components/Slider";
import Nav from "../../components/Nav";

const Home = () => {

  return <Center bg="white" w="100%" h="100%">
    <Sliders />
  </Center>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Nav>
          <Home />
        </Nav>
      </Center>
    </NativeBaseProvider>
  );
};
