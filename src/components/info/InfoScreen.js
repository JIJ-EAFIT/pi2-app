/* eslint-disable prettier/prettier */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.view}>
      <Text>Vista de información</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default InfoScreen;
