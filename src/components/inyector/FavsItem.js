import React, {useContext} from 'react';
import {Text, View, Pressable, StyleSheet, Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {tasksStore} from '../../providers/tasksStore';
import {favsStore} from '../../providers/favsStore';

const FavsItem = ({data}) => {
  const navigation = useNavigation();

  const {setTasks} = useContext(tasksStore);
  const {setFavs, favs} = useContext(favsStore);

  const {item} = data;

  const handleDelete = (index) => {
    let newFavs = [...favs];
    newFavs.splice(index, 1);
    setFavs(newFavs);
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setTasks(item.data);
        navigation.goBack();
      }}>
      <View style={styles.stack}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.secondaryText}>Nombre</Text>
      </View>
      <View style={styles.inline}>
        <View style={[styles.stack, styles.end]}>
          <Text style={styles.nameText}>{item.data.length}</Text>
          <Text style={styles.secondaryText}>Actividades</Text>
        </View>
        <Pressable
          style={styles.closeContainer}
          onPress={() => handleDelete(data.index)}>
          <Image
            source={require('../../assets/images/unsuccess.png')}
            style={styles.cross}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginVertical: 3,
    backgroundColor: '#CBCBCB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stack: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  secondaryText: {
    fontSize: 14,
    color: '#919191',
  },
  inline: {
    flexDirection: 'row',
  },
  closeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 5,
    marginLeft: 4,
  },
  end: {
    alignItems: 'flex-end',
  },
  cross: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
});

export default FavsItem;
