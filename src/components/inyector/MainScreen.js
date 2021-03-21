import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  LogBox,
} from 'react-native';
import RunButton from './RunButton';
import SyringeButton from './SyringeButton';
import EmptyList from './EmptyList';
import Task from './Task';
import {useNavigation} from '@react-navigation/native';
import onSend from './functions/onSend';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const MainScreen = ({config}) => {
  const navigation = useNavigation();

  const initialTasks = [{from: 0, to: 2, quantity: 0}];

  const [syringe, setSyringe] = useState(config.syringesMax[0]);
  const [tasks, setTasks] = useState(initialTasks);
  const [exec, setExec] = useState(false);
  const [btLoading, setbtLoading] = useState(false);
  const [btConnected, setbtConnected] = useState(false);

  const handleBluetoothPress = () => {
    if (btConnected) {
      setbtConnected(false);
    } else {
      setbtLoading(true);
      setTimeout(() => {
        setbtLoading(false);
        setbtConnected(true);
      }, 1500);
    }
  };

  const handleEdit = (task, index) => {
    navigation.navigate('Editar actividad', {
      task,
      tasks,
      setTasks,
      syringe,
      index,
    });
  };

  const handleAdd = () => {
    navigation.navigate('Añadir actividad', {tasks, setTasks, syringe});
  };

  const handleDelete = (index) => {
    let copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  };

  const handleRun = () => {
    setExec(true);
    onSend(tasks, syringe, config);
    setExec(false);
  };

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.processWrapper}>
        <View style={styles.processOptions}>
          <RunButton
            handleRun={handleRun /*() => onSend(tasks, syringe, config)*/}
            exec={exec}
            tasks={tasks}
          />
          <SyringeButton
            syringe={syringe}
            setSyringe={setSyringe}
            config={config}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.tasksContainer}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyList}
          data={tasks}
          renderItem={({item, index, sep}) => (
            <Task
              item={item}
              index={index}
              handleEdit={() => handleEdit(item, index)}
              handleDelete={() => handleDelete(index)}
            />
          )}
        />
        <Pressable
          style={styles.addButton}
          onPress={handleAdd}
          android_ripple={{color: '#180866'}}>
          <Text style={styles.addButtonText}>Añadir otra</Text>
        </Pressable>
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
  processWrapper: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 12,
  },
  processOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    alignItems: 'stretch',
    marginBottom: 10,
  },
  tasksContainer: {
    flex: 1,
  },
  addButton: {
    height: 40,
    backgroundColor: '#1E0B7E',
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MainScreen;
