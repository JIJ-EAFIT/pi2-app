import React from 'react';
import {Pressable, Text, Image, StyleSheet} from 'react-native';

const SyringeButton = ({syringe, setSyringe, config}) => {
  const [j1, j2] = config.syringesMax;
  const getNextSyringe = () => {
    if (syringe === j1) {
      return j2;
    } else {
      return j1;
    }
  };

  const handleSyringe = () => {
    let nextSyringe = getNextSyringe();
    setSyringe(nextSyringe);
  };

  return (
    <Pressable
      onPress={handleSyringe}
      style={({pressed}) => [
        styles.changeSyringe,
        {backgroundColor: pressed ? '#D6D254' : '#ECE75D'},
      ]}>
      <Image
        style={styles.syringeImage}
        source={require('inyector/src/assets/images/jeringa.png')}
        resizeMode="contain"
      />
      <Text style={styles.changeSyringeText}>{`${syringe} mL`}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  changeSyringe: {
    flexDirection: 'row',
    backgroundColor: '#ECE75D',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4,
  },
  changeSyringeText: {
    color: '#3B374E',
    fontSize: 12,
    fontFamily: 'light',
  },
  syringeImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default SyringeButton;
