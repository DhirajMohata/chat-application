const API_URL = 'https://chat-app-backend-11ku.onrender.com';
import { toast } from 'react-toastify';

interface LoginResponse {
  token: string;
  username: string;
  userId: string;
}

interface SignupResponse {
  message: string;
  token: string;
  userId: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      toast.warning('Login failed. Please check your credentials.');
      throw new Error('Login failed');
    }

    const data = await response.json();
    toast.success(`Welcome to EASE!`);
    return data;
  } catch (error) {
    console.log(error);
    toast.warning('Something Went Wrong');
    throw error;
  }
};

export const signup = async (username: string, email: string, password: string): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      toast.error('Signup failed. Please try again.');
      throw new Error('Signup failed');
    }

    const data = await response.json();
    toast.success('Signup successful! Welcome to EASE.');
    localStorage.setItem('user', username);
    return data;
  } catch (error) {
    toast.error('An error occurred during signup');
    throw error;
  }
};
