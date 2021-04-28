import React, {createContext, useState, useEffect} from 'react';
import persistingStore from 'react-native-simple-store';

const initialFavs = [];

const favsStore = createContext(initialFavs);
const {Provider} = favsStore;

const FavsProvider = ({children}) => {
  const [favs, setFavs] = useState(initialFavs);

  useEffect(() => {
    persistingStore.get('favs').then((loaded) => {
      typeof loaded !== 'object' && setFavs(loaded);
    });
  }, []);

  useEffect(() => {
    console.log('favs: ', favs);
    Array.isArray(favs) && persistingStore.update('favs', favs);
  }, [favs]);

  return <Provider value={{favs, setFavs}}>{children}</Provider>;
};

export {favsStore, FavsProvider};
