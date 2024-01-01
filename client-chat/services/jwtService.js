export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};



// Check if the token is expired
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    return true; // Token is considered expired if it's not present
  }

  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return decodedToken.exp < currentTime;
  } catch (error) {
    // Handle decoding errors (e.g., invalid token format)
    return true;
  }
};
