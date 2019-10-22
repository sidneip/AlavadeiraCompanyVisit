const data = {
  getToken: async () => {
    try {
      const value = await AsyncStorage.getItem('@driver/token');
      if (value !== null) {
        return value
      }
    } catch (error) {
        console.log(value);
      // Error retrieving data
    }
  }
}

export default data;