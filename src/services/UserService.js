import axios from '@/api';

const UserService = {
  async getUser() {
    try {
      // console.log('UserService: Attempting to get user data');
      const response = await axios.get('/user/');
      console.log('UserService: Received response', response.data);
      return response.data.data; // Restituisce direttamente i dati
    } catch (error) {
      console.error('UserService: Error getting user data', error);
      throw error;
    }
  },
};

export default UserService;
