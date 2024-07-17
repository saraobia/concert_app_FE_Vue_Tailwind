import axios from '@/api';

const ConcertService = {
  async getConcerts() {
    try {
      const response = await axios.get('/concerts/');
      console.log('UserService: Received response', response.data);
      return response.data.data;
    } catch (error) {
      console.error('UserService: Error getting user data', error);
      throw error;
    }
  },

  async getConcert(id) {
    try {
      const response = await axios.get(`/concerts/detail/${id}`);
      console.log('UserService: Received response', response.data);
      return response.data.data;
    } catch (error) {
      console.error('UserService: Error getting user data', error);
      throw error;
    }
  },
};

export default ConcertService;
