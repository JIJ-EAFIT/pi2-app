import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Pressable,
  Image,
} from 'react-native';

const Commands = ({config}) => {
  const [coords, setCoords] = useState({x: NaN, y: NaN, z: NaN});
  const [cent, setCent] = useState(false);

  const getUnit = (coord) => (cent ? 'cm' : 'Pasos');
  const getCoord = (coord) => {
    if (isNaN(coords[coord])) {
      return '';
    } else {
      return coords[coord].toString();
    }
  };

  const handleCoord = (text, coord) => {
    console.log(text);
    let tempCoords = {...coords};

    if (cent) {
      tempCoords[coord] = text;
    } else {
      tempCoords[coord] = parseInt(text, 10);
    }
    setCoords(tempCoords);
  };

  const handleUnitSwitch = () => {
    let newCoords = {...coords};
    if (cent) {
      for (const coord in newCoords) {
        let centValue = parseFloat(newCoords[coord]);
        newCoords[coord] = Math.round(centValue * config.stepsPerCm[coord]);
      }
    } else {
      for (const coord in newCoords) {
        newCoords[coord] = (
          newCoords[coord] / config.stepsPerCm[coord]
        ).toFixed(2);
      }
    }
    setCoords(newCoords);
    setCent(!cent);
  };

  const sendCommands = () => {};

  return (
    <>
      <View style={[styles.confInline, styles.switcherOption]}>
        <Text style={styles.subHeader}>Medidas en centímetros</Text>
        <Switch
          style={styles.switcher}
          value={cent}
          onValueChange={handleUnitSwitch}
        />
      </View>
      <View style={styles.confInline}>
        <View style={styles.commandCoord}>
          <TextInput
            value={getCoord('x')}
            style={styles.textInput}
            placeholder={`X (${getUnit()})`}
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              handleCoord(text, 'x');
            }}
          />
        </View>
        <View style={styles.commandCoord}>
          <TextInput
            value={getCoord('y')}
            style={styles.textInput}
            placeholder={`Y (${getUnit()})`}
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              handleCoord(text, 'y');
            }}
          />
        </View>
        <View style={styles.commandCoord}>
          <TextInput
            value={getCoord('z')}
            style={styles.textInput}
            placeholder={`Z (${getUnit()})`}
            keyboardType="decimal-pad"
            onChangeText={(text) => {
              handleCoord(text, 'z');
            }}
          />
        </View>
      </View>
      <Pressable
        style={({pressed}) => [
          styles.sendButton,
          {backgroundColor: pressed ? '#5db359' : '#65C161'},
        ]}
        onPress={sendCommands}>
        <Image
          style={styles.sendImage}
          resizeMode="contain"
          source={require('inyector/src/assets/images/send-arrow.png')}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  confInline: {
    flexDirection: 'row',
  },
  commandCoord: {
    flex: 1,
  },
  coordText: {
    textAlign: 'center',
    marginBottom: 8,
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
    marginTop: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    flexDirection: 'row',
    elevation: 1,
  },
  sendImage: {
    width: 30,
    height: 80,
    resizeMode: 'contain',
  },
});

export default Commands;
