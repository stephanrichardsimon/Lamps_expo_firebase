import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';
import { Button } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';


const Sliders = () => {
  const [values, setValues] = useState({
    systolic: 0,
    diastolic: 0,
  });
  const [user, setUser] = useState('')
  const [saveMessage, setSaveMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    let userx = firebase.auth().currentUser;
    setUser(userx.uid)
  },[])

  const styles = StyleSheet.create({
    contentView: {
      padding: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    verticalContent: {
      padding: 20,
      flex: 1,
      flexDirection: 'row',
      height: 500,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    subHeader: {
      fontSize: 20,
      color: "#2089dc",
      textAlign: "center",
      paddingVertical: 5,
      marginBottom: 10
    }
  });

  const handleSave = () => {
    let prevState = { systolic: 0, diastolic: 0 }
    setIsLoading(true)
    firestore()
      .collection('pressureRecords')
      .add({
        systolic: values.systolic,
        diastolic: values.diastolic,
        created_at: firestore.FieldValue.serverTimestamp(),
        userId: user
      })
      .then(() => {
        setSaveMessage(true)
        setValues(prevState)
      })
      .catch(() => Alert.alert("Ocorreu um problema ao salvar, tente novamente!"))
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Text style={styles.subHeader}>Como você está hoje?</Text>
      <View style={[styles.contentView]}>
        <Slider
          value={values.systolic}
          onValueChange={e => setValues({ ...values, systolic: e })}
          maximumValue={30}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#0094FF"
              />
            ),
          }}
        />
        <Text style={{ paddingTop: 20 }}>Sistólica: {values.systolic}</Text>
      </View>
      <View style={[styles.contentView]}>
        <Slider
          value={values.diastolic}
          onValueChange={e => setValues({ ...values, diastolic: e })}
          maximumValue={30}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#0094FF"
              />
            ),
          }}
        />
        <Text style={{ paddingTop: 20 }}>Diastólica: {values.diastolic}</Text>
      </View>
      <View>
        <Text style={{ paddingTop: 50, paddingBottom: 50 }}>Pressão: {values.systolic}mmHg / {values.diastolic}mmHg</Text>
        <Button isLoading={isLoading} onPress={() => handleSave()} variant="outline">
          Salvar
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
          onConfirmPressed={() => navigation.navigate('Import')}
        />
      </View>
    </>
  );
};

export default Sliders;