//USEAUTH.JS

import { ref, computed } from 'vue';
import AuthService from '@/services/AuthService';

const accessToken = ref(localStorage.getItem('accessToken'));
const userData = ref(JSON.parse(localStorage.getItem('userData')));

export function useAuth() {
  const isAuthenticated = computed(() => !!accessToken.value);

  const login = async (credentials) => {
    const userDataResponse = await AuthService.login(credentials);
    console.log(userDataResponse);
    accessToken.value = userDataResponse.access_token;
    console.log('Access token in useAuth.js:', accessToken.value);
    userData.value = {
      username: userDataResponse.username,
      email: userDataResponse.email,
    };
    // localStorage.setItem('accessToken', accessToken.value);
    return userDataResponse;
  };

  const logout = () => {
    AuthService.logout();
    accessToken.value = null;
    userData.value = null;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
  };

  const refreshToken = async () => {
    try {
      const newTokenData = await AuthService.refreshToken();
      accessToken.value = newTokenData.accessToken;
      localStorage.setItem('accessToken', accessToken.value);
      return newTokenData;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };

  return {
    accessToken,
    userData,
    isAuthenticated,
    login,
    logout,
    refreshToken,
  };
}
