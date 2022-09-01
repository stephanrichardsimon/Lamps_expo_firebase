import React, { useEffect, useRef, useState } from "react";
import { Box, FlatList, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, Button } from "native-base";
import firestore from "@react-native-firebase/firestore"
import { firebase } from "@react-native-firebase/auth";
import Nav from "../../components/Nav";

const Import = () => {
  const [records, setRecords] = useState([])
  const [user, setUser] = useState('')
  const [data, setData] = useState([])
  const componentMounted = useRef(true);

  useEffect(() => {
    let userx = firebase.auth().currentUser;
    setUser(userx.uid)
  }, [])

  let obj = []

  useEffect(() => {
    if (data.length < 1) {
      const subscribe = firestore()
        .collection('pressureRecords')
        .onSnapshot(querySnapshot => {
          if (componentMounted.current) {
            const data = querySnapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc
              }
            })
            setRecords(data)
          }
        })
    }
    records.map((record, index) => {
      let time = {
        seconds: record.data._data.created_at.seconds,
        nanoseconds: record.data._data.created_at.nanoseconds,
      }
      const fireBaseTime = new Date(
        time.seconds * 1000 + time.nanoseconds / 1000000,
      );
      const date = fireBaseTime.toDateString();
      const atTime = fireBaseTime.toLocaleTimeString();

      if (record.data._data.userId === user) {
        obj.push({
          id: index,
          systolic: record.data._data.systolic,
          diastolic: record.data._data.diastolic,
          userId: record.data._data.userId,
          date: date,
          time: atTime
        })
      }
      setData(obj)
      return () => subscribe();
    })
    return () => { componentMounted.current = false; };
  }, [records])

  return <Box bg="white" w="100%" h="100%">
    {
      data &&
      <FlatList mb='60' data={data} renderItem={({
        item
      }) => <Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
      }} borderColor="coolGray.200" pl="4" pr="5" py="2">
          <HStack space={3} justifyContent="space-between">
            <VStack>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.date}
              </Text>
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                Sistólica: {item.systolic}
              </Text>
              <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }}>
                Diastólica: {item.diastolic}
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" alignSelf="flex-start">
              {item.time}
            </Text>
          </HStack>
        </Box>} keyExtractor={item => item.id} />
    }
  </Box>;
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Nav>
          <Import />
        </Nav>
      </Center>
    </NativeBaseProvider>
  );
};