import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function EditProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (event) =>
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (showPasswordFields && !form.currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `${API_URL}/users/profile`,
        {
          name: form.name,
          email: form.email,
          // only send these if password-change is requested
          ...(showPasswordFields && { currentPassword: form.currentPassword }),
          ...(showPasswordFields &&
            form.newPassword && { newPassword: form.newPassword }),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await authenticateUser();

      setSuccess("✅ Your profile has been updated!");

      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-15 tracking-wider">Edit Profile</h1>
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { id: "name", type: "text", label: "Full Name", required: true },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
          },
        ].map(({ id, type, label }) => (
          <div key={id} className="relative">
            <input
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={handleChange}
              placeholder=" "
              className="peer block w-full h-12 bg-transparent border-b border-gray-300 focus:border-red-300 focus:outline-none transition"
            />
            <label
              htmlFor={id}
              className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm"
            >
              {label}
            </label>
          </div>
        ))}

        {!showPasswordFields ? (
          <button
            type="button"
            onClick={() => setShowPasswordFields(true)}
            className="text-orange-500 hover:underline text-sm cursor-pointer"
          >
            Change Password
          </button>
        ) : (
          <>
            {[
              { id: "currentPassword", label: "Current Password" },
              { id: "newPassword", label: "New Password" },
            ].map(({ id, label }) => (
              <div key={id} className="relative">
                <input
                  id={id}
                  name={id}
                  type="password"
                  value={form[id]}
                  onChange={handleChange}
                  placeholder=" "
                  required={id === "currentPassword"}
                  className="peer block w-full h-12 bg-transparent border-b border-gray-300 focus:border-red-300 focus:outline-none transition"
                />
                <label
                  htmlFor={id}
                  className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm"
                >
                  {label}
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setShowPasswordFields(false);
                setForm((f) => ({
                  ...f,
                  currentPassword: "",
                  newPassword: "",
                }));
              }}
              className="text-gray-600 hover:underline text-sm"
            >
              Cancel Password Change
            </button>
          </>
        )}

        {error && <p className="text-red-600 text-center">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 cursor-pointer border border-gray-400 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 cursor-pointer bg-black text-white rounded hover:bg-red-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
