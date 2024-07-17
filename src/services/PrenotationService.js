import axios from '@/api';
import Decimal from 'decimal.js';

const PrenotationService = {
  async createAndConfirmPrenotation(idUser, idConcert, qta, paymentType) {
    try {
      const response = await axios.post(
        `prenotations/user/${idUser}/${idConcert}/${qta}`,
        { paymentType }
      );
      console.log('PrenotationService: Received response', response.data);

      // Converti il prezzo in Decimal
      if (response.data.data.price) {
        response.data.data.price = new Decimal(response.data.data.price);
        console.log(response.data.data.price);
      }

      return response.data.data;
    } catch (error) {
      console.error(
        'PrenotationService: Error creating prenotation',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  async getPrenotations(idUser) {
    try {
      const response = await axios.get(`/prenotations/user/${idUser}`);
      console.log('PrenotationService: Received response', response.data);
      return response.data.data;
    } catch (error) {
      console.error('PrenotationService: Error getting prenotations', error);
      throw error;
    }
  },
};

export default PrenotationService;
