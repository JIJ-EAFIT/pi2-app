import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';

const TaskAdd = (props) => {
  const {syringe, tasks, setTasks} = props.route.params;
  const [state, setState] = useState({
    from: '',
    to: '',
    quantity: '',
  });

  const handleFrom = (number) => {
    setState({...state, from: number});
    console.log(`from: ${number}`);
  };

  const handleTo = (number) => {
    setState({...state, to: number});
    console.log(`to: ${number}`);
  };

  const handleQuantity = (number) => {
    setState({...state, quantity: number});
    console.log(`quantity: ${number}`);
  };

  const isValid = () => {
    let limits = [0, 10];

    if (state.from >= limits[0] && state.from <= limits[1]) {
      if (state.to >= limits[0] && state.to <= limits[1]) {
        if (state.quantity <= syringe && state.quantity > 0) {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  };

  const handleSubmit = () => {
    let copy = [...tasks];
    let newObj = {
      from: parseInt(state.from, 10),
      to: parseInt(state.to, 10),
      quantity: parseFloat(state.quantity, 10),
    };
    copy.push(newObj);
    setTasks(copy);
    props.navigation.goBack();
  };

  return (
    <View style={styles.mainWrapper}>
      <Pressable
        style={({disabled}) => [
          styles.saveButton,
          {backgroundColor: disabled ? '#4a4a4a' : '#1E0B7E'},
        ]}
        onPress={handleSubmit}
        disabled={!isValid()}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </Pressable>
      <View style={styles.processWrapper}>
        <Text style={styles.titleText}>Nueva actividad</Text>
        <View style={styles.fieldsSection}>
          <View style={styles.left}>
            <View style={styles.inLine}>
              <Text style={styles.helperText}>Desde:</Text>
              <TextInput
                style={styles.textInputStyle}
                keyboardType="numeric"
                onChangeText={handleFrom}
                value={state.from.toString()}
                placeholder="N° recipiente"
                autoFocus={true}
              />
            </View>
            <Text style={styles.helperText}>Hasta:</Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              onChangeText={handleTo}
              value={state.to.toString()}
              placeholder="N° recipiente"
            />
          </View>
          <View style={[styles.inLine, styles.right]}>
            <Text style={styles.helperText}>mL: </Text>
            <TextInput
              style={styles.textInputStyle}
              keyboardType="numeric"
              onChangeText={handleQuantity}
              value={state.quantity.toString()}
              placeholder="Cantidad"
            />
          </View>
        </View>
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
});

export default TaskAdd;
