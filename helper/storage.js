import * as SecureStore from 'expo-secure-store';


module.exports._storeData = async (key, value) => {

    await SecureStore.setItemAsync(key, value)

};

module.exports._retrieveData = async (key) => {

    return await SecureStore.getItemAsync(key)

};

