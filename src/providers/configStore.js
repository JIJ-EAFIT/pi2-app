import React, {createContext, useReducer, useEffect} from 'react';
import persistingStore from 'react-native-simple-store';

const initialState = {
  webserverUrl: 'http://192.168.4.1',
  syringesMax: [2, 3],
  stepsPerMl: 81,
  yOffset: -680,
  xSteps: 146,
  xDelay: 2000,
  yDelay: 2000,
  zDelay: 3500,
  temperature: 22,
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

  // useEffect(() => {
  //   persistingStore
  //     .get('config')
  //     .then((res) => res && dispatch({type: 'CHANGE_CONFIG', payload: res}));
  // }, []);

  useEffect(() => {
    console.log('config changed');
    persistingStore.update('config', state);
  }, [state]);

  return <Provider value={{config: state, dispatch}}>{children}</Provider>;
};

export {configStore, ConfigProvider};
