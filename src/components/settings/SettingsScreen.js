import React, {useState, useContext} from 'react';
import Commands from './Commands';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import Slider from '@react-native-community/slider';
import {configStore} from '../../providers/configStore';

const SettingsScreen = ({setConfig}) => {
  const {config, dispatch} = useContext(configStore);
  const [changes, setChanges] = useState({...config});

  const verifyChange = () => {
    return shallowEqual(config, changes);
  };

  const applyChanges = () => {
    dispatch({type: 'CHANGE_CONFIG', payload: changes});
  };

  const updateChanges = (payload) => {
    setChanges({...changes, ...payload});
  };

  const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  };

  const speedZ = 500000 / (changes.zDelay * changes.stepsPerMl);

  return (
    <>
      <ScrollView style={styles.mainWrapper}>
        <View style={styles.sectionItem}>
          <View style={[styles.sectionTitle, styles.sectionTitleCommand]}>
            <Text style={styles.titleText}>Envío de comandos</Text>
          </View>
          <View style={styles.sectionBody}>
            <Commands config={config} />
          </View>
        </View>
        <View style={styles.sectionItem}>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Aplicación</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.subHeader}>Tamaño jeringas (mL)</Text>
            <View style={styles.confInline}>
              <TextInput
                disabled
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Max. mL"
                value={config.syringesMax[0].toString()}
                editable={false}
              />
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                placeholder="Max. mL"
                value={config.syringesMax[1].toString()}
                editable={false}
              />
            </View>
            <Text style={styles.subHeader}>Dirección del servidor web</Text>
            <TextInput
              style={styles.textInput}
              value={changes.webserverUrl}
              keyboardType="default"
              editable={false}
            />
          </View>
        </View>
        <View style={styles.sectionItem}>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Calibración del inyector</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.subHeader}>Eje X (pasos/delay)</Text>
            <View style={styles.confInline}>
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Pasos por vial"
                value={changes.xSteps.toString()}
                onChangeText={(text) => {
                  let payload = parseInt(text, 10);
                  if (isNaN(payload)) {
                    payload = '';
                  }
                  updateChanges({
                    xSteps: payload,
                  });
                }}
              />
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Delay en X"
                value={changes.xDelay.toString()}
                onChangeText={(text) => {
                  let payload = parseInt(text, 10);
                  if (isNaN(payload)) {
                    payload = '';
                    if (isNaN(payload)) {
                      payload = '';
                    }
                  }
                  updateChanges({
                    xDelay: payload,
                  });
                }}
              />
            </View>
            <Text style={styles.subHeader}>Eje Y (offset/delay)</Text>
            <View style={styles.confInline}>
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Pasos por vial en x"
                value={changes.yOffset.toString()}
                onChangeText={(text) => {
                  let payload = parseInt(text, 10);
                  if (isNaN(payload)) {
                    payload = '';
                  }
                  updateChanges({
                    yOffset: payload,
                  });
                }}
              />
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Pasos por vial en x"
                value={changes.yDelay.toString()}
                onChangeText={(text) => {
                  let payload = parseInt(text, 10);
                  if (isNaN(payload)) {
                    payload = '';
                  }
                  updateChanges({
                    yDelay: payload,
                  });
                }}
              />
            </View>
            <Text style={styles.subHeader}>Eje Z (pasos por mL)</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType="decimal-pad"
              placeholder="pasos/mL"
              value={changes.stepsPerMl.toString()}
              onChangeText={(text) => {
                let payload = parseInt(text, 10);
                if (isNaN(payload)) {
                  payload = '';
                }
                updateChanges({
                  stepsPerMl: payload,
                });
              }}
            />
            <View style={styles.sliderInline}>
              <Text style={styles.subHeader}>Dosificación</Text>
              <Text style={styles.sliderValue}>{speedZ.toFixed(1)} mL / s</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2}
              minimumTrackTintColor="#030067"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#030067"
              value={speedZ}
              step={0.1}
              onValueChange={(value) => {
                let newDelay = Math.round(
                  500000 / (changes.stepsPerMl * value),
                );
                updateChanges({
                  zDelay: newDelay,
                });
                console.log(newDelay);
              }}
            />
          </View>
        </View>
      </ScrollView>
      {!verifyChange() && (
        <Pressable onPress={applyChanges} style={styles.applyButton}>
          <Image
            style={styles.tick}
            source={require('inyector/src/assets/images/tick.png')}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingBottom: 50,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  sectionItem: {
    paddingBottom: 12,
    elevation: 2,
  },
  sectionTitle: {
    minWidth: 180,
    color: 'white',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#1E0B7E',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionTitleCommand: {backgroundColor: '#65C161'},
  titleText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  sectionBody: {
    backgroundColor: '#ededed',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  confInline: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#f7f7f7',
    marginHorizontal: 5,
    borderRadius: 5,
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
  applyButton: {
    height: 50,
    width: 50,
    bottom: 25,
    right: 25,
    borderRadius: 25,
    position: 'absolute',
    backgroundColor: '#65C161',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  tick: {
    width: 25,
    height: 25,
  },
  slider: {
    marginBottom: 40,
  },
  sliderInline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderValue: {
    marginVertical: 8,
    marginLeft: 5,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
});

export default SettingsScreen;
