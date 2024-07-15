// AUTH.SERVICE.JS
// CENTRALIZZAZIONE DELL'AUTENTICAZIONE SULLE CHIAMATE
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(data) {
    try {
      const response = await axios.post(API_URL + 'login', data);
      const accessToken = response.data.date.access_token;
      const refreshToken = response.data.date.refresh_token;

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
      } else {
        throw new Error('Access token or refresh token missing in response');
      }

      return response.data.date; // Puoi restituire l'intera risposta se necessario
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  async refreshToken(refreshToken) {
    try {
      console.log('Sending refresh token:', refreshToken);
      const response = await axios.post(
        API_URL + 'refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Refresh token response:', response.data);
      const newAccessToken = response.data.date.access_token;
      this.setAccessToken(newAccessToken);
      return { accessToken: newAccessToken };
    } catch (error) {
      console.error('Refresh token failed:', error);
      throw error;
    }
  }

  authHeader(tokenType = 'access') {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && tokenType === 'access') {
      console.log('AuthService: Access token found in localStorage');
      return { Authorization: 'Bearer ' + accessToken };
    } else if (refreshToken && tokenType === 'refresh') {
      console.log('AuthService: Refresh token found in localStorage');
      return { Authorization: 'Bearer ' + refreshToken };
    } else {
      console.log('AuthService: Token NOT found in localStorage');
      return {};
    }
  }
}

export default new AuthService();
