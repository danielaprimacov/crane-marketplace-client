import { useState, useEffect, createContext } from "react";
import { authApi } from "../services/authApi";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const authenticateUser = async () => {
    // Get stored token from localStorage
    const storedToken = localStorage.getItem("authToken");

    // If there's no token, clear user state immediately
    if (!storedToken) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      return;
    }

    try {
      // Attempt verification
      const profile = await authApi.verify();

      // On success, update state
      setIsLoggedIn(true);
      setUser(profile);
    } catch (error) {
      // On any error, treat as unauthenticated
      console.error("Token verification failed:", error);

      removeToken();
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
