import React, {createContext, useState, useEffect} from 'react';
import persistingStore from 'react-native-simple-store';

const initialFavs = [];

const favsStore = createContext(initialFavs);
const {Provider} = favsStore;

const FavsProvider = ({children}) => {
  const [favs, setFavs] = useState(initialFavs);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    persistingStore
      .get('favs')
      .then((_loaded) => _loaded && setFavs(_loaded))
      .then(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      persistingStore
        .save('favs', favs)
        .then(() => persistingStore.get('favs'))
        .then((_loaded) =>
          console.log(`favs stored: ${JSON.stringify(_loaded)}`),
        );
    }
  }, [favs, loaded]);

  return <Provider value={{favs, setFavs}}>{children}</Provider>;
};

export {favsStore, FavsProvider};
