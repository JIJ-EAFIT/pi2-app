/* eslint-disable prettier/prettier */

import React from 'react';
import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const BluetoothButton = ({loading, connected, handlePress}) => {
  if (connected) {
    return <BluetoothButtonConnected handlePress={handlePress} />;
  } else {
    return (
      <BluetoothButtonNotConnected
        handlePress={handlePress}
        loading={loading}
      />
    );
  }
};

const BluetoothButtonConnected = ({handlePress}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [
        styles.bluetoothButton,
        {backgroundColor: '#65C161'},
      ]}
      android_ripple={{
        color: '#5db359',
      }}>
      <Text style={styles.bluetoothText}>WiFi conectado</Text>
      <Image
        style={styles.tickImage}
        source={require('inyector/src/assets/images/tick.png')}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const BluetoothButtonNotConnected = ({loading, handlePress}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={styles.bluetoothButton}
      android_ripple={{
        color: '#d65a5a',
      }}>
      <Text style={styles.bluetoothText}>WiFi desconectado</Text>
      {loading ? (
        <ActivityIndicator color="#9a0808" />
      ) : (
        <Image
          style={styles.tickImage}
          source={require('inyector/src/assets/images/unsuccess.png')}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bluetoothButton: {
    backgroundColor: '#F26464', //'#65C161',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
    overflow: 'hidden',
  },
  bluetoothText: {fontSize: 16, color: '#2E2E2E'},
  tickImage: {
    height: 20,
    width: 29,
  },
  unsuccessImage: {
    height: 20,
  },
});

export default BluetoothButton;
