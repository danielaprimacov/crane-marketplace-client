import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FORM = {
  name: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};

function EditProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) return;

    setForm((prev) => ({
      ...prev,
      name: user.name || "",
      email: user.email || "",
    }));
  }, [user]);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const resetPasswordFields = () => {
    setShowPasswordFields(false);
    setForm((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Please enter your name.";
    }

    if (!form.email.trim()) {
      return "Please enter your email address.";
    }

    if (showPasswordFields) {
      if (!form.currentPassword.trim()) {
        return "Please enter your current password.";
      }

      if (!form.newPassword.trim()) {
        return "Please enter your new password.";
      }

      if (form.newPassword.length < 8) {
        return "New password must be at least 8 characters.";
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You are not authorized. Please log in again.");
      return;
    }

    const requestBody = {
      name: form.name.trim(),
      email: form.email.trim(),
      ...(showPasswordFields
        ? {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }
        : {}),
    };

    try {
      setSubmitting(true);

      await axios.patch(
        `${API_URL}/users/profile`,
        { requestBody },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await authenticateUser();

      setSuccess("✅ Your profile has been updated!");

      if (showPasswordFields) {
        resetPasswordFields();
      }

      redirectTimeoutRef.current = setTimeout(() => {
        navigate("/profile");
      }, 1800);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <h1 className="text-2xl font-bold mb-8 tracking-wide sm:mb-10 sm:text-3xl">
          Edit Profile
        </h1>

        {success && (
          <p className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-center text-green-700">
            {success}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-center text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {[
            { id: "name", type: "text", label: "Full Name", required: true },
            {
              id: "email",
              type: "email",
              label: "Email Address",
              required: true,
            },
          ].map(({ id, type, label, required }) => (
            <div key={id} className="relative pt-4">
              <input
                id={id}
                name={id}
                type={type}
                value={form[id]}
                onChange={handleChange}
                required={required}
                placeholder=" "
                className="peer block w-full h-12 bg-transparent border-b border-gray-300 focus:border-red-300 focus:outline-none transition"
              />
              <label
                htmlFor={id}
                className={`absolute left-0 transition-all duration-200 ${
                  form[id]
                    ? "-top-1 text-sm text-gray-500"
                    : "top-6 text-base text-gray-500"
                } peer-focus:-top-1 peer-focus:text-sm`}
              >
                {label}
              </label>
            </div>
          ))}

          {!showPasswordFields ? (
            <button
              type="button"
              onClick={() => setShowPasswordFields(true)}
              className="text-orange-500 text-sm transition hover:underline"
            >
              Change Password
            </button>
          ) : (
            <div className="space-y-7 rounded-xl border border-black/10 bg-gray-50 p-4 sm:p-5">
              {[
                { id: "currentPassword", label: "Current Password" },
                { id: "newPassword", label: "New Password" },
              ].map(({ id, label }) => (
                <div key={id} className="relative pt-4">
                  <input
                    id={id}
                    name={id}
                    type="password"
                    value={form[id]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="peer block w-full h-12 bg-transparent border-b border-gray-300 focus:border-red-300 focus:outline-none transition"
                  />
                  <label
                    htmlFor={id}
                    className={`absolute left-0 transition-all duration-200 ${
                      form[id]
                        ? "-top-1 text-sm text-gray-500"
                        : "top-6 text-base text-gray-500"
                    } peer-focus:-top-1 peer-focus:text-sm`}
                  >
                    {label}
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={resetPasswordFields}
                className="text-red-600 text-sm transition hover:underline"
              >
                Cancel Password Change
              </button>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 border border-gray-400 rounded transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
