import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import BackButton from "../../ui/BackButton";
import LoadingState from "../../ui/LoadingState";
import ErrorState from "../../ui/ErrorState";

import CraneMetaFields from "./CraneMetaFields";
import CraneReadonlySpecs from "./CraneReadonlySpecs";
import CranePricingFields from "./CranePricingFields";
import CraneImageUploadField from "./CraneImageUploadField";
import CraneAvailabilitySection from "./CraneAvailabilitySection";

import { craneApi } from "../../../services/craneApi";

import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";

import { CRANES_UPDATED_EVENT } from "../../../constants/events";

import {
  initialCraneState,
  buildCraneRequestBody,
  mapCraneToForm,
} from "../../../utils/craneHelpers";

function EditCraneForm() {
  const { craneId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialCraneState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { uploadImage, uploading } = useCloudinaryUpload();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const controller = new AbortController();

    const getCraneData = async () => {
      try {
        setLoading(true);
        setError("");

        const crane = await craneApi.getById(craneId, {
          signal: controller.signal,
        });

        setForm(mapCraneToForm(crane));
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        console.error("Failed to fetch crane:", error);

        setError(
          error?.response?.data?.message ||
            "Could not load the crane data. Please try again."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    getCraneData();

    return () => {
      controller.abort();
    };
  }, [craneId]);

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

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = buildCraneRequestBody(form);

    try {
      setSaving(true);

      await craneApi.update(craneId, requestBody);
      window.dispatchEvent(new Event(CRANES_UPDATED_EVENT));

      toast.success("Crane updated successfully!");

      navigate(`/cranes/${craneId}`, { replace: true });
    } catch (error) {
      console.error("Failed to update crane:", error);
      toast.error(error?.response?.data?.message || "Failed to update crane!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        type="cranes"
        title="Loading crane data..."
        message="We are loading the crane details for editing."
        fullPage
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load crane"
        message={error}
        actionTo="/cranes"
        actionLabel="Back to cranes"
        fullPage
      />
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
