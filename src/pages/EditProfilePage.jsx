import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { AuthContext } from "../context/auth.context";
import { userApi } from "../services/userApi";

import {
  FloatingInput,
  FloatingPasswordInput,
} from "../components/ui/form/FloatingFields";

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

      toast.success("Profile updated successfully.");

      if (showPasswordFields) {
        resetPasswordFields();
      }

      redirectTimeoutRef.current = window.setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 1200);
    } catch (error) {
      console.error("Failed to update profile:", error);
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

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
          >
            <p className="font-medium text-red-800">Could not update profile</p>
            <p className="mt-1">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7 pt-4">
          <FloatingInput
            id="profile-name"
            name="name"
            type="text"
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={submitting}
            autoComplete="name"
          />

          <FloatingInput
            id="profile-email"
            name="email"
            type="email"
            label="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={submitting}
            autoComplete="email"
          />

          {!showPasswordFields ? (
            <button
              type="button"
              onClick={() => setShowPasswordFields(true)}
              disabled={submitting}
              className="text-sm text-orange-500 transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
            >
              Change Password
            </button>
          ) : (
            <div className="space-y-7 rounded-xl border border-black/10 bg-gray-50 p-6 sm:p-7">
              <FloatingPasswordInput
                id="profile-current-password"
                name="currentPassword"
                label="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                required
                disabled={submitting}
                autoComplete="current-password"
                inputClassName="mt-2"
              />

              <FloatingPasswordInput
                id="profile-new-password"
                name="newPassword"
                label="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
                disabled={submitting}
                minLength={8}
                autoComplete="new-password"
                inputClassName="mt-2"
              />

              <button
                type="button"
                onClick={resetPasswordFields}
                disabled={submitting}
                className="text-sm text-red-600 transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
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
