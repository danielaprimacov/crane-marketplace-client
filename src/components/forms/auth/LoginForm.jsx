import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";
import { authApi } from "../../../services/authApi";
import { craneApi } from "../../../services/craneApi";

import { slugify } from "../../../utils/helpers";

import {
  FloatingInput,
  FloatingPasswordInput,
} from "../../ui/form/FloatingFields";

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

function getErrorMessage(error) {
  const responseData = error?.response?.data;

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.details) {
    const firstDetail = Object.values(responseData.details)[0];

    if (firstDetail) {
      return firstDetail;
    }
  }

  return error?.message || "Login failed. Please try again.";
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
        email: email.trim().toLowerCase(),
        password,
      };

      const loginData = await authApi.login(requestBody);

      const token = loginData.token || loginData.authToken;

      if (!token) {
        throw new Error("No auth token received.");
      }

      // save & verify
      storeToken(token);
      await authenticateUser();

      // redirect all cranes
      let targetPath = "/cranes";

      try {
        const cranes = await craneApi.getAll();
        targetPath = getCranesTargetPath(cranes);
      } catch (redirectError) {
        console.error("Could not load cranes for redirect:", redirectError);
      }

      onSuccess?.();

      navigate(targetPath, { replace: true });
    } catch (error) {
      // grab API message or fallback
      console.error("Login failed:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-5 sm:px-6">
      <h1 className="my-8 text-2xl uppercase font-semibold text-gray-900 sm:my-10">
        Login
      </h1>
      <form
        ref={formRef}
        onSubmit={handleLoginSubmit}
        className="flex flex-col"
      >
        <FloatingInput
          id="login-email"
          name="email"
          type="email"
          label="Your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={isSubmitting}
          inputClassName="mb-10"
        />

        <FloatingPasswordInput
          id="login-password"
          name="password"
          label="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          disabled={isSubmitting}
          inputClassName="mb-10"
        />

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
