import AsyncStorage from '@react-native-async-storage/async-storage';

class Storing {
  async getItem(key) {
    try {
      console.log('obteniendo item...');
      const jsonValue = await AsyncStorage.getItem(key);
      let returned;

      if (jsonValue) {
        returned = await JSON.parse(jsonValue);
        console.log('returning parsed');
      } else {
        returned = null;
        console.log('retuning null');
      }

      return returned;
    } catch (e) {
      throw new Error('Error en lecturaF ' + e);
    }
  }

  async setItem(key, value) {
    try {
      const returned = await AsyncStorage.setItem(key, JSON.stringify(value));
      return returned;
    } catch (e) {
      throw new Error('Error en escritura ' + e);
    }
  }
}

export default Storing;
