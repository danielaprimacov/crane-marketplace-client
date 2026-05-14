import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { userApi } from "../services/userApi";
import { FloatingInput } from "../components/ui/form/FloatingFields";

const INITIAL_FORM = {
  name: "",
  email: "",
  currentPassword: "",
  newPassword: "",
};

function getErrorMessage(error) {
  return error?.response?.data?.message || error?.message || "Update failed.";
}

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

    if (submitting) return;

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const requestBody = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    };

    if (showPasswordFields) {
      requestBody.currentPassword = form.currentPassword;
      requestBody.newPassword = form.newPassword;
    }

    try {
      setSubmitting(true);

      await userApi.updateProfile(requestBody);
      await authenticateUser();

      setSuccess("✅ Your profile has been updated!");

      if (showPasswordFields) {
        resetPasswordFields();
      }

      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 1800);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
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
          <FloatingInput
            id="name"
            name="name"
            type="text"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />

          <FloatingInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

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
              <FloatingInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                label="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />

              <FloatingInput
                id="newPassword"
                name="newPassword"
                type="password"
                label="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
                minLength={8}
                autoComplete="new-password"
              />
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
              onClick={handleCancel}
              disabled={submitting}
              className="px-4 py-2 border border-gray-400 rounded transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
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
