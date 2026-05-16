import { useState } from "react";

import { authApi } from "../../../services/authApi";
import {
  FloatingInput,
  FloatingPasswordInput,
} from "../../ui/form/FloatingFields";

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

  return error?.message || "Signup failed. Please try again.";
}

function SignupForm({ onSuccess, onSwitchToLogin, formRef }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

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
        name: trimmedName,
        email: trimmedEmail,
        password,
      };

      await authApi.signup(requestBody);
      onSuccess?.();
      onSwitchToLogin?.();
    } catch (error) {
      // Safely grab the API’s error message, or fall back to a generic one
      console.error("Signup failed:", error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-5 sm:px-6">
      <h1 className="my-8 text-2xl uppercase font-semibold text-gray-900 sm:my-10">
        Create account
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSignupSubmit}
        className="flex flex-col"
      >
        <FloatingInput
          id="signup-name"
          name="name"
          type="text"
          label="Your name*"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          disabled={isSubmitting}
          inputClassName="mb-10"
        />

        <FloatingInput
          id="signup-email"
          name="email"
          type="email"
          label="Your email address*"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          disabled={isSubmitting}
          inputClassName="mb-10"
        />

        <FloatingPasswordInput
          id="signup-password"
          name="password"
          label="Your password*"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isSubmitting}
          inputClassName="mb-10"
        />

        <FloatingPasswordInput
          id="signup-repeat-password"
          name="repeatPassword"
          label="Repeat your password*"
          value={repeatPassword}
          onChange={(event) => setRepeatPassword(event.target.value)}
          autoComplete="new-password"
          required
          minLength={8}
          disabled={isSubmitting}
          inputClassName="mb-10"
        />
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
