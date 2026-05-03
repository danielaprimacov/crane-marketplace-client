import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../../context/auth.context";
import { slugify } from "../../../utils/helpers";

const API_URL = import.meta.env.VITE_API_URL;

function getCranesTargetPath(cranes) {
  const safeCranes = Array.isArray(cranes) ? cranes : [];

  const producers = Array.from(
    new Set(safeCranes.map((crane) => crane?.producer?.trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  const firstProducer = producers[0];

  if (!firstProducer) {
    return "/cranes";
  }

  return `/cranes/producers/${encodeURIComponent(slugify(firstProducer))}`;
}

function LoginForm({ onSuccess, onSwitchToSignup, formRef }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const requestBody = {
        email: email.trim(),
        password,
      };

      // send credentials
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      const { authToken } = response.data;

      if (!authToken) throw new Error("No auth token received!");

      // save & verify
      storeToken(authToken);
      await authenticateUser();

      // redirect all cranes
      const { data } = await axios.get(`${API_URL}/cranes`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const targetPath = getCranesTargetPath(data);

      onSuccess?.();

      navigate(targetPath, { replace: true });
    } catch (error) {
      // grab API message or fallback
      const errorDescription =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      setErrorMessage(errorDescription);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[40rem] flex-col px-4 pb-5 sm:px-6">
      <h1 className="my-8 text-2xl uppercase font-semibold text-gray-900 sm:my-10">
        Login
      </h1>
      <form
        ref={formRef}
        onSubmit={handleLoginSubmit}
        className="flex flex-col"
      >
        <div className="relative">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder=" "
            autoComplete="email"
            className="peer mb-10 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="email"
            className="absolute left-0 -top-8 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Your email address
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder=" "
            autoComplete="current-password"
            className="peer mb-10 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="password"
            className="absolute left-0 -top-8 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Your password
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white py-2 mb-4 rounded uppercase transition duration-300 ease-in hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in…" : "Login"}
        </button>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between items-center mt-4">
          <p className="text-sm text-gray-700">Don't have an account?</p>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="bg-orange-300 text-black/70 px-4 py-2 rounded-sm hover:bg-orange-400 transition duration-300 ease-in"
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
