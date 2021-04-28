import React, {createContext, useReducer, useEffect} from 'react';
import persistingStore from 'react-native-simple-store';

const initialState = {
  webserverUrl: 'http://192.168.4.1/',
  syringesMax: [2, 3],
  syringesSetPoint: [20, 0],
  delay: 3000,
  stepsPerCm: {x: 15, y: 35, z: 35},
};

const configStore = createContext(initialState);
const {Provider} = configStore;

const ConfigProvider = ({children}) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'CHANGE_CONFIG':
        let newState = {...prevState, ...action.payload};
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  useEffect(() => {
    persistingStore
      .get('config')
      .then((res) => res && dispatch({type: 'CHANGE_CONFIG', payload: res}));
  }, []);

  useEffect(() => {
    console.log('config changed');
    persistingStore.update('config', state);
  }, [state]);

  return <Provider value={{config: state, dispatch}}>{children}</Provider>;
};

export {configStore, ConfigProvider};
