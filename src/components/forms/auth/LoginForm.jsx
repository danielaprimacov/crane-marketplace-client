import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { AuthContext } from "../../../context/auth.context";
import { authApi } from "../../../services/authApi";
import { craneApi } from "../../../services/craneApi";

import { slugify } from "../../../utils/helpers";

import { FloatingInput } from "../../ui/form/FloatingFields";

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
  const [showPassword, setShowPassword] = useState(false);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const requestBody = {
        email: email.trim().toLocaleLowerCase(),
        password,
      };

      const loginData = await authApi.login(requestBody);

      // send credentials
      const token = loginData.token || loginData.authToken;

      if (!token) {
        throw new Error("No auth token received.");
      }

      // save & verify
      storeToken(authToken);
      await authenticateUser();

      // redirect all cranes
      const cranes = await craneApi.getAll();
      const targetPath = getCranesTargetPath(cranes);

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
          <FloatingInput
            id="email"
            name="email"
            type="email"
            label="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 h-10 w-10 text-sm text-gray-500 transition hover:text-black"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
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
