import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(`${key}`, data);
  } catch (error) {
    console.log(`Failed to store item with key ${key}`, error);
    throw error;
  }
};

const retrieveData = async (key: string) => {
  try {
    const encryptedValue = await AsyncStorage.getItem(key);
    if (encryptedValue) {
      return encryptedValue;
    }
    return null;
  } catch (error) {
    console.log(`Failed to retrieve item with key ${key}`, error);
    throw error;
  }
};

const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Failed to remove item with key ${key}`, error);
    throw error;
  }
};

export {storeData, retrieveData, removeData};
