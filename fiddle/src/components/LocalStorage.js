// localStorage.js

// Set an item in localStorage
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value)); // Store as a string
  };
  
  // Get an item from localStorage
  export const getItem = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse the JSON string back into an object
  };
  
  // Remove an item from localStorage
  export const removeItem = (key) => {
    localStorage.removeItem(key);
  };
  
  // Clear all items from localStorage
  export const clear = () => {
    localStorage.clear();
  };
  