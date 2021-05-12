import React, {createContext, useState} from 'react';

const initialState = [];

const tasksStore = createContext(initialState);
const {Provider} = tasksStore;

const TasksProvider = ({children}) => {
  const [tasks, setTasks] = useState(initialState);

  return <Provider value={{tasks, setTasks}}>{children}</Provider>;
};

export {tasksStore, TasksProvider};
