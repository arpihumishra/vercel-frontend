import { useEffect, useReducer } from 'react';
import { AuthContext } from './auth';
import { authService } from '../services/authService';
import { localStorage as storage } from '../utils/localStorage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    console.log('AuthContext: Checking stored auth data...');
    const token = storage.getItem('token');
    const user = storage.getJSON('user');
    
    console.log('AuthContext: Stored token:', token ? 'exists' : 'null');
    console.log('AuthContext: Stored user:', user);

    if (token && user) {
      console.log('AuthContext: Restoring authentication state');
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user }
      });
    } else {
      console.log('AuthContext: No stored auth data, setting loading false');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      console.log('AuthContext: Starting login...');
      const response = await authService.login(email, password);
      console.log('AuthContext: Login API response:', response);
      
      storage.setItem('token', response.token);
      storage.setJSON('user', response.user);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user }
      });
      
      console.log('AuthContext: Login success dispatched');
      return response;
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Login failed'
      });
      throw error;
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await mockAuthService.register(userData);
      storage.setItem('token', response.token);
      storage.setJSON('user', response.user);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user }
      });
      return response;
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response?.data?.message || 'Registration failed'
      });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};