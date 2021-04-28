import React from 'react';
import {Text, View, Pressable, StyleSheet, Image} from 'react-native';

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
            <Image
              style={styles.deleteCross}
              source={require('../../assets/images/unsuccess.png')}
            />
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
    marginVertical: 3,
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
    paddingHorizontal: 2,
  },
  deletePress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  deleteCross: {
    resizeMode: 'contain',
    height: 10,
    width: 10,
  },
});

export default Task;
