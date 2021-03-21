import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No hay actividades</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#CBCBCB',
  },
});

export default EmptyList;
