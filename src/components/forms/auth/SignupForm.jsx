import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignupForm({ onSuccess, onSwitchToLogin, formRef }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErrorMessage("Name is required.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Email is required.");
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const requestBody = {
        email: trimmedEmail,
        password,
        name: trimmedName,
      };

      await axios.post(`${API_URL}/auth/signup`, requestBody);
      onSuccess?.();
      onSwitchToLogin?.();
    } catch (error) {
      // Safely grab the API’s error message, or fall back to a generic one
      const errorDescription =
        error?.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(errorDescription);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-7 sm:px-8">
      <h1 className="mb-8 text-2xl uppercase font-semibold text-gray-900 tracking-tight">
        Create account
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSignupSubmit}
        className="flex flex-col"
      >
        <div className="relative">
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder=" "
            autoComplete="name"
            className="peer mb-7 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="name"
            className="absolute left-0 top-0 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Your name*
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            id="signup-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder=" "
            autoComplete="email"
            className="peer mb-7 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="signup-email"
            className="absolute left-0 top-0 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Your email address*
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            id="signup-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder=" "
            autoComplete="new-password"
            className="peer mb-7 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="signup-password"
            className="absolute left-0 top-0 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Your password*
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="repeat-password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(event) => setRepeatPassword(event.target.value)}
            placeholder=" "
            autoComplete="new-password"
            className="peer mb-7 block h-10 w-full border-b border-b-black/20 bg-transparent focus:border-black focus:outline-none"
          />

          <label
            htmlFor="repeat-password"
            className="absolute left-0 top-0 flex h-10 items-center text-sm text-black/50 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-6"
          >
            Repeat your password*
          </label>
        </div>
        <button
          type="submit"
          className="mt-1 bg-black text-white py-3 text-sm rounded uppercase hover:bg-orange-400 transition duration-300 ease-in disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account…" : "Signup"}
        </button>
        <p className="mt-4 text-sm text-center tracking-wide text-gray-600">
          Passwords must have a minimum length of 8 characters.
        </p>
      </form>

      {errorMessage && (
        <p className="text-red-600 mt-4 text-sm">{errorMessage}</p>
      )}

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between items-center my-5">
        <p>Do you have an account?</p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="bg-orange-300 text-black/70 px-4 py-2 rounded-sm cursor-pointer hover:bg-orange-400 transition duration-300 ease-in"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignupForm;
