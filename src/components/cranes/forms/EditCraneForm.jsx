import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import BackButton from "../../ui/BackButton";
import CraneMetaFields from "./CraneMetaFields";
import CraneReadonlySpecs from "./CraneReadonlySpecs";
import CranePricingFields from "./CranePricingFields";
import CraneImageUploadField from "./CraneImageUploadField";
import CraneAvailabilitySection from "./CraneAvailabilitySection";

import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";

import {
  initialCraneState,
  buildCraneRequestBody,
  mapCraneToForm,
} from "./craneFormHelpers";

const API_URL = import.meta.env.VITE_API_URL;

function EditCraneForm() {
  const { craneId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialCraneState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { uploadImage, uploading } = useCloudinaryUpload();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      if (!imageUrl) return;

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));

      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("Could not upload the image!");
    } finally {
      event.target.value = "";
    }
  };

  const getCraneData = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const crane = response.data;
      setForm(mapCraneToForm(crane));
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCraneData();
  }, [craneId]);

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem("authToken");
    const requestBody = buildCraneRequestBody(form);

    try {
      setSaving(true);

      await axios.put(`${API_URL}/cranes/${craneId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      toast.success("Crane updated successfully!");
      navigate(`/cranes/${craneId}`, { replace: true });
    } catch (error) {
      console.error("Failed to update crane:", error);
      toast.error("Failed to update crane!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0 py-10">
        <p className="text-gray-500">Loading crane data…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-0 pb-10">
      <div className="mb-6 sm:mb-8">
        <BackButton fallback={`/cranes/${craneId}`} />
      </div>

      <h1 className="text-xl sm:text-2xl uppercase tracking-wide mb-6 border-b pb-3 border-b-red-600">
        Edit the Crane Details
      </h1>
      {/* ─── READ-ONLY SPECS ─── */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <CraneReadonlySpecs form={form} />
        <form onSubmit={handleSubmit} className="flex flex-col pt-2">
          <CraneMetaFields form={form} updateField={updateField} />
          <CraneImageUploadField
            images={form.images}
            uploading={uploading}
            onFileChange={handleFileChange}
            onRemoveImage={handleRemoveImage}
          />

          <CranePricingFields form={form} updateField={updateField} />

          <CraneAvailabilitySection form={form} setForm={setForm} />

          <button
            type="submit"
            disabled={saving}
            className="mt-6 inline-flex self-start rounded bg-black px-6 py-3 text-sm sm:text-base uppercase text-white cursor-pointer transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCraneForm;
