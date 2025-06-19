import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { email, password };

    try {
      // send credentials
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      const { authToken } = response.data;

      // save & verify
      storeToken(authToken);
      await authenticateUser();

      // redirect home
      navigate("/");
    } catch (error) {
      // grab API message or fallback
      const errorDescription =
        error?.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" onChange={handleEmail} />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePassword}
        />
        <button type="submit">Login</button>

        {errorMessage && <p>{errorMessage}</p>}

        <p>Dont have an account?</p>
        <Link to="/signup">Signup</Link>
      </form>
    </div>
  );
}

export default LoginPage;
