import React, {createContext, useState} from 'react';

const initialState = [
  {from: 0, to: 2, quantity: 1.4},
  {from: 0, to: 2, quantity: 1.4},
];

const tasksStore = createContext(initialState);
const {Provider} = tasksStore;

const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState(initialState);

  return <Provider value={{tasks, setTasks}}>{children}</Provider>;
};

export {tasksStore, TasksProvider};
