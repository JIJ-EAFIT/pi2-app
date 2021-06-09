import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Image,
  View,
  Alert,
} from 'react-native';

const Commands = ({config}) => {
  const [coord, setCoord] = useState('x');
  const [steps, setSteps] = useState('');

  const sendCommands = () => {
    console.log('sending...');
    if (!isNaN(steps)) {
      let parsedSteps = parseInt(steps, 10);
      if (parsedSteps < -32000 || parsedSteps > 32000) {
        Alert.alert(
          'Valor fuera de los límites',
          'El valor de pasos tiene que estar entre -32000 y 32000',
          [
            {
              text: 'OK',
              onPress: () => {
                setSteps('');
              },
            },
          ],
        );
      }
    }
    let sendUrl = `${config.webserverUrl}/${coord}/${steps}/3000`;
    console.log(sendUrl);
    fetch(sendUrl);
  };

  const handleSteps = (text) => {
    if (text.match(/^-?([0-9]+)?$/)) {
      setSteps(text);
    }
  };

  useEffect(() => {
    console.log(steps);
  }, [steps]);

  return (
    <>
      <View style={styles.confInline}>
        <Text style={styles.subHeader}>Coordenada</Text>
        <Text style={styles.subHeader}>N° pasos</Text>
      </View>
      <View style={styles.confInline}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={coord}
            onValueChange={(itemValue, itemIndex) => setCoord(itemValue)}>
            <Picker.Item label="x" value="x" />
            <Picker.Item label="y" value="y" />
            <Picker.Item label="z" value="z" />
          </Picker>
        </View>
        <TextInput
          value={steps}
          style={styles.textInput}
          keyboardType="decimal-pad"
          onChangeText={handleSteps}
          placeholder="Pasos"
        />
      </View>
      <View style={styles.sendContainer}>
        <Pressable
          style={styles.sendButton}
          android_ripple={{
            color: '#4a7a48',
            borderless: false,
            radius: 150,
          }}
          onPress={sendCommands}>
          <Image
            style={styles.sendImage}
            resizeMode="contain"
            source={require('inyector/src/assets/images/send-arrow.png')}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  confInline: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  commandCoord: {
    flex: 1,
  },
  pickerContainer: {
    width: '50%',
  },
  textInput: {
    backgroundColor: '#f7f7f7',
    marginHorizontal: 5,
    borderRadius: 10,
    flex: 1,
    height: 35,
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
  subHeader: {
    marginVertical: 8,
    marginLeft: 5,
    fontSize: 14,
  },
  switcher: {flex: 1},
  switcherOption: {
    marginBottom: 5,
  },
  sendButton: {
    backgroundColor: '#65C161',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    flexDirection: 'row',
    elevation: 1,
    borderColor: '#65C161',
  },
  sendImage: {
    width: 30,
    height: 80,
    resizeMode: 'contain',
  },

  sendContainer: {
    marginTop: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    borderColor: '#65C161',
  },
});

export default Commands;
