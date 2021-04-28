import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

import {useNavigation} from '@react-navigation/native';
import {favsStore} from '../../providers/favsStore';
import {tasksStore} from '../../providers/tasksStore';

const Header = () => {
  const navigation = useNavigation();
  const {favs, setFavs} = useContext(favsStore);
  const {tasks} = useContext(tasksStore);

  const [visible, setVisible] = useState(false);

  const handleFav = () => {
    setVisible(true);
  };

  const isFav = () => {
    if (favs) {
      let res = favs.map((_fav) => _fav.data).indexOf(tasks);
      return res !== -1;
    }
  };

  const delFav = () => {
    let newFavs = favs.filter((fav) => {
      return JSON.stringify(fav.data) !== JSON.stringify(tasks);
    });
    setFavs(newFavs);
  };

  return (
    <View style={styles.container}>
      {console.log('is fav is:', isFav())}
      <Pressable
        style={styles.favCont}
        onPress={isFav() ? delFav : handleFav}
        onLongPress={() => {
          navigation.navigate('Favoritos', {favs});
        }}>
        {isFav() ? (
          <Image
            source={require('../../assets/images/fav-fav.png')}
            style={styles.imFav}
          />
        ) : (
          <Image
            source={require('../../assets/images/fav.png')}
            style={styles.imFav}
          />
        )}
        <Text style={styles.favText}>Favoritos</Text>
      </Pressable>
      <Pressable style={styles.resCont}>
        <Image
          source={require('../../assets/images/return.png')}
          style={styles.imReload}
        />
      </Pressable>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        favs={favs}
        tasks={tasks}
        setFavs={setFavs}
      />
    </View>
  );
};

const CustomModal = (props) => {
  const [name, setName] = useState('');
  return (
    <Modal isVisible={props.visible}>
      <View style={modal.container}>
        <Text>Nombre de favorito:</Text>
        <View style={modal.inputCont}>
          <TextInput
            style={modal.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Nombre"
          />
        </View>
        <View style={modal.inline}>
          <Pressable
            style={modal.pressCancel}
            onPress={() => {
              props.setVisible(false);
            }}>
            <Text>Cancelar</Text>
          </Pressable>
          <Pressable
            style={modal.pressSave}
            onPress={() => {
              props.setFavs([...props.favs, {name: name, data: props.tasks}]);
              props.setVisible(false);
            }}>
            <Text>Guardar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const modal = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'stretch',
    minWidth: 240,
  },
  input: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  inline: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressCancel: {
    backgroundColor: '#d65a5a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  pressSave: {
    backgroundColor: '#65C161',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
});

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
  },
  favCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: '#0070CE',
    borderRadius: 12,
  },
  resCont: {
    width: 45,
    marginLeft: 5,
    backgroundColor: '#d65a5a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imFav: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  imReload: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  favText: {
    fontSize: 16,
    color: '#fff',
  },
});
export default Header;
