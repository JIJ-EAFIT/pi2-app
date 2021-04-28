import React, {useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {favsStore} from '../../providers/favsStore';

import FavsItem from './FavsItem';

const FavsScreen = (props) => {
  const {favs} = useContext(favsStore);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={favs}
        renderItem={(data) => <FavsItem data={data} />}
        keyExtractor={(item, key) => key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E2E2E2',
    borderRadius: 12,
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default FavsScreen;
