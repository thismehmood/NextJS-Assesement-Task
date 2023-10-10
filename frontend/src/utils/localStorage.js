export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
    // Handle error, e.g., show a user-friendly message
  }
};

export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    // Handle error, e.g., show a user-friendly message
    return null;
  }
};
