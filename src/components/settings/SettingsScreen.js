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

import {configStore} from '../../providers/configStore';

const SettingsScreen = ({setConfig}) => {
  const {config, dispatch} = useContext(configStore);
  const [changes, setChanges] = useState({...config});

  const verifyChange = () => {
    return JSON.stringify(changes) === JSON.stringify(config) ? true : false;
  };

  const applyChanges = () => {
    setConfig(changes);
  };

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
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Max. mL"
              />
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                placeholder="Max. mL"
              />
            </View>
            <Text style={styles.subHeader}>Dirección del servidor web</Text>
            <TextInput
              style={styles.textInput}
              value={changes.webserverUrl}
              keyboardType="default"
            />
          </View>
        </View>
        <View style={styles.sectionItem}>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Calibración del inyector</Text>
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.subHeader}>Setpoint del émbolo (pasos)</Text>
            <View style={styles.confInline}>
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="Setpoint (steps)"
              />
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                placeholder="Setpoint (steps)"
              />
            </View>
            <Text style={styles.subHeader}>Pasos por centímetro:</Text>
            <View style={styles.confInline}>
              <TextInput
                style={[styles.textInput]}
                keyboardType="decimal-pad"
                placeholder="steps/cm [X]"
              />
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                placeholder="steps/cm [Y]"
              />
              <TextInput
                style={styles.textInput}
                keyboardType="decimal-pad"
                placeholder="steps/cm [Z]"
              />
            </View>
            <Text style={styles.subHeader}>Delay pulsos (μs)</Text>
            <TextInput
              style={[styles.textInput]}
              keyboardType="decimal-pad"
              placeholder="Número de contenedores"
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
    paddingBottom: 20,
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
});

export default SettingsScreen;
