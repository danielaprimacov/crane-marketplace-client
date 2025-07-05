import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

import { slugify } from "../utils/helpers";

const API_URL = "http://localhost:5005";

function LoginForm({ onSuccess, onSwitchToSignup }, formRef) {
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

      onSuccess();

      // redirect all cranes
      const { data: allCranes } = await axios.get(`${API_URL}/cranes`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const producers = Array.from(
        new Set(allCranes.map((c) => c.producer).filter(Boolean))
      );
      if (producers.length > 0) {
        const firstSlug = slugify(producers[0]);
        navigate(`/cranes/producers/${encodeURIComponent(firstSlug)}`);
      } else {
        // fallback if no producers
        navigate("/cranes");
      }
    } catch (error) {
      // grab API message or fallback
      const errorDescription =
        error?.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="w-[40rem] flex flex-col m-auto pb-5">
      <h1 className="my-10 text-2xl uppercase">Login</h1>
      <form
        ref={formRef}
        onSubmit={handleLoginSubmit}
        className="flex flex-col"
      >
        {[
          {
            id: "email",
            type: "email",
            label: "Your email address",
            handler: handleEmail,
          },
          {
            id: "password",
            type: "password",
            label: "Your password",
            handler: handlePassword,
          },
        ].map(({ id, type, label, handler }) => (
          <div key={id} className="relative">
            <input
              type={type}
              name={id}
              id={id}
              onChange={handler}
              placeholder=" "
              className="border-b border-b-black/20 mb-10 h-10 peer block w-full focus:outline-none focus:border-black bg-transparent"
            />
            <label
              htmlFor={id}
              className="absolute left-0 -top-8 h-10 flex items-center text-gray-500 text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
            >
              {label}
            </label>
          </div>
        ))}

        <button
          type="submit"
          className="bg-black text-white py-2 mb-4 rounded cursor-pointer uppercase hover:bg-orange-400 transition duration-300 ease-in"
        >
          Login
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex justify-between items-center mt-4">
          <p>Don't have an account?</p>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="bg-orange-300 text-black/70 px-4 py-1 rounded-sm cursor-pointer hover:bg-orange-400 transition duration-300 ease-in"
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
