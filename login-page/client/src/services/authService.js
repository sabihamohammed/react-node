const REACT_APP_API_URL = 'http://localhost:8001';

const login = async (email, password) => {
  try {
    const response = await fetch(`${REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Login failed');
    }

    const responseData = await response.json();

    // Process and return the response data as needed
    return responseData;
  } catch (error) {
    // Re-throw the error to be caught by the caller
    throw error;
  }
};

export const authService = {
    login
    
  };