// Utility functions for safe localStorage operations
export const localStorage = {
  getItem: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      console.error(`Error getting localStorage item '${key}':`, error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage item '${key}':`, error);
    }
  },

  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage item '${key}':`, error);
    }
  },

  getJSON: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item || item === 'undefined' || item === 'null') {
        return null;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing JSON from localStorage item '${key}':`, error);
      // Clean up corrupted data
      window.localStorage.removeItem(key);
      return null;
    }
  },

  setJSON: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting JSON to localStorage item '${key}':`, error);
    }
  }
};