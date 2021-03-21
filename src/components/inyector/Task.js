import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

const Task = ({item, index, handleEdit, handleDelete}) => {
  return (
    <Pressable onPress={handleEdit} style={styles.TaskContainer}>
      <View styles={styles.left}>
        <Text>{`Desde: ${item.from}`}</Text>
        <Text>{`Hasta: ${item.to}`}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.content}>{`${item.quantity} mL`}</Text>
        <View style={styles.deleteTask}>
          <Pressable onPress={handleDelete} style={styles.deletePress}>
            <Text style={styles.deleteCross}>x</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  TaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CBCBCB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 10,
    marginVertical: 4,
    elevation: 1,
  },
  left: {},
  content: {
    fontSize: 25,
    marginLeft: 10,
  },
  right: {
    flexDirection: 'row',
  },
  deleteTask: {
    bottom: 10,
    left: 5,
    paddingHorizontal: 3,
  },
  deletePress: {
    paddingHorizontal: 3,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteCross: {
    color: '#9a0808',
  },
});

export default Task;
