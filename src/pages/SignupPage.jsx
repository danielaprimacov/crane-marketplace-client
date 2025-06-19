import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleName = (event) => setName(event.target.value);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { email, password, name };

    try {
      await axios.post(`${API_URL}/auth/signup`, requestBody);
      navigate("/login");
    } catch (error) {
      // Safely grab the API’s error message, or fall back to a generic one
      const errorDescription =
        error?.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSignupSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />
        <button type="submit">Signup</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      <p>Have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default SignupPage;
