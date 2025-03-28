import axios from 'axios';

const BASE_URL = 'https://reqres.in/api';

const getStoredUsers = () => {
  try {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

const setStoredUsers = (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { email, password });
    if (!response.data.token) {
      throw new Error('No token received');
    }
    return response.data.token;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data?.error || 'Registration failed';
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    
    const storedUsers = getStoredUsers() || [];
    const newUser = {
      ...response.data,
      id: storedUsers.length > 0 ? Math.max(...storedUsers.map(u => u.id)) + 1 : 1
    };
    storedUsers.push(newUser);
    setStoredUsers(storedUsers);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error.response?.data?.error || 'Failed to create user';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    if (!response.data.token) {
      throw new Error('No token received');
    }
    return response.data.token;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data?.error || 'Login failed';
  }
};

export const getUsers = async (page = 1) => {
  try {
    const storedUsers = getStoredUsers();
    if (storedUsers) {
      const perPage = 6;
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return {
        data: storedUsers.slice(start, end),
        total_pages: Math.ceil(storedUsers.length / perPage),
        page: page,
        per_page: perPage,
        total: storedUsers.length
      };
    }

    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    const allUsers = page === 1 ? response.data.data : [];
    
    if (page === 1) {
      try {
        const page2 = await axios.get(`${BASE_URL}/users?page=2`);
        allUsers.push(...page2.data.data);
        setStoredUsers(allUsers);
      } catch (error) {
        console.error('Error fetching page 2:', error);
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error.response?.data?.error || 'Failed to fetch users';
  }
};

export const getUser = async (userId) => {
  try {
    const storedUsers = getStoredUsers();
    if (storedUsers) {
      const user = storedUsers.find(u => u.id === parseInt(userId));
      if (user) return user;
    }

    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error.response?.data?.error || 'Failed to fetch user';
  }
};

export const updateUser = async (userId, userData) => {
  try {
    await axios.put(`${BASE_URL}/users/${userId}`, userData);
    
    const storedUsers = getStoredUsers();
    if (storedUsers) {
      const updatedUsers = storedUsers.map(user =>
        user.id === parseInt(userId) ? { ...user, ...userData } : user
      );
      setStoredUsers(updatedUsers);
    }
    return userData;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error.response?.data?.error || 'Update failed';
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`);
    
    const storedUsers = getStoredUsers();
    if (storedUsers) {
      const updatedUsers = storedUsers.filter(user => user.id !== parseInt(userId));
      setStoredUsers(updatedUsers);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error.response?.data?.error || 'Delete failed';
  }
};