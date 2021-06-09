import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

import Slider from '@react-native-community/slider';
import {RNNumberSelector} from 'react-native-number-selector';

import {tasksStore} from '../../providers/tasksStore';

const TaskAdd = (props) => {
  const {syringe} = props.route.params;
  const viales = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const {setTasks, tasks} = useContext(tasksStore);
  const [from, setFrom] = useState(6);
  const [to, setTo] = useState(7);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log(`tasks ${JSON.stringify(tasks)}`);
  }, [tasks]);

  const handleSubmit = () => {
    let newTasks = [...tasks];
    newTasks.push({from, to, quantity});
    setTasks(newTasks);
    props.navigation.goBack();
  };

  return (
    <View style={styles.mainWrapper}>
      <Pressable
        style={() => [
          styles.saveButton,
          {backgroundColor: from === to ? '#4a4a4a' : '#1E0B7E'},
        ]}
        onPress={handleSubmit}
        disabled={from === to}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </Pressable>
      <View style={styles.processWrapper}>
        <Text style={styles.titleText}>Nueva actividad</Text>
        <Text style={styles.helperText}>Desde:</Text>
        <RNNumberSelector
          style={styles.selector}
          items={viales}
          selectedItem={from}
          highlightedFontSize={25}
          fontSize={20}
          spacing={20}
          textColor="#345345"
          highlightedTextColor="#000000"
          viewAnimation={0}
          dividerColor="#5c5c5c"
          dividerThickness={0.4}
          onChange={(number) => {
            setFrom(number);
            console.log(`from: ${from}`);
          }}
        />
        <Text style={styles.helperText}>Hasta:</Text>
        <RNNumberSelector
          style={styles.selector}
          items={viales}
          selectedItem={to}
          highlightedFontSize={25}
          fontSize={20}
          spacing={20}
          textColor="#345345"
          highlightedTextColor="#000000"
          viewAnimation={0}
          dividerColor="#5c5c5c"
          dividerThickness={0.4}
          onChange={(number) => {
            setTo(number);
            console.log(`to: ${to}`);
          }}
        />
        <View style={styles.inline}>
          <Text style={styles.helperText}>mL: </Text>
          <Text style={styles.quantityText}>{quantity.toFixed(1)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={syringe}
          minimumTrackTintColor="#030067"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="#030067"
          value={tasks.quantity}
          step={0.1}
          onValueChange={(value) => {
            setQuantity(value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  saveButton: {
    width: '40%',
    minWidth: 195,
    backgroundColor: '#1E0B7E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
  },
  processWrapper: {
    backgroundColor: '#E2E2E2',
    paddingHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  titleText: {
    color: '#030067',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fieldsSection: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  left: {
    flex: 1,
    marginRight: 8,
  },
  helperText: {
    fontSize: 16,
    color: '#030067',
    fontWeight: 'bold',
  },
  textInputStyle: {
    backgroundColor: 'white',
    height: 30,
    borderRadius: 12,
    marginBottom: 8,
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  right: {
    marginLeft: 8,
    flex: 1,
  },
  selector: {left: 0, width: '100%', height: 50, marginVertical: 10},
  slider: {
    width: '100%',
    height: 40,
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityText: {
    fontSize: 14,
    color: '#5c5c5c',
    marginRight: 10,
  },
});

export default TaskAdd;
