import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupForm({ onSuccess, onSwitchToLogin }, formRef) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleRepeatPassword = (event) => setRepeatPassword(event.target.value);
  const handleName = (event) => setName(event.target.value);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(undefined);
    const requestBody = { email, password, name };

    // Check if passwords match
    if (password !== repeatPassword) {
      setErrorMessage("Password do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    try {
      await axios.post(`${API_URL}/auth/signup`, requestBody);
      onSuccess();
      onSwitchToLogin();
    } catch (error) {
      // Safely grab the API’s error message, or fall back to a generic one
      const errorDescription =
        error?.response?.data?.message || "Signup failed. Please try again.";
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="w-[40rem] flex flex-col m-auto">
      <h1 className="my-10 text-2xl uppercase">Create account</h1>
      <form
        ref={formRef}
        onSubmit={handleSignupSubmit}
        className="flex flex-col"
      >
        {[
          {
            id: "name",
            type: "text",
            label: "Your name*",
            handler: handleName,
          },
          {
            id: "email",
            type: "email",
            label: "Your email address*",
            handler: handleEmail,
          },
          {
            id: "password",
            type: "password",
            label: "Your password*",
            handler: handlePassword,
          },
          {
            id: "repeat-password",
            type: "password",
            label: "Repeat your password*",
            handler: handleRepeatPassword,
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
          Signup
        </button>
        <p className="text-sm text-right -mt-3 tracking-wider">
          Passwords must have a minimum length of 8 characters.{" "}
        </p>
      </form>

      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <div className="flex justify-between items-center my-5">
        <p>Do you have an account?</p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="bg-orange-300 text-black/70 px-4 py-1 rounded-sm cursor-pointer hover:bg-orange-400 transition duration-300 ease-in"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignupForm;
