import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import CraneSpecsFields from "./CraneSpecsFields";
import CraneMetaFields from "./CraneMetaFields";
import CranePricingFields from "./CranePricingFields";
import CraneImageUploadField from "./CraneImageUploadField";
import CraneAvailabilitySection from "./CraneAvailabilitySection";
import BackButton from "../../ui/BackButton";

import { craneApi } from "../../../services/craneApi";

import { slugify } from "../../../utils/helpers";
import { initialCraneState, buildCraneRequestBody } from "./craneFormHelpers";
import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";

function AddCraneForm() {
  const [form, setForm] = useState(initialCraneState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newProducerSlug, setNewProducerSlug] = useState("");

  const { uploadImage, uploading } = useCloudinaryUpload();

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      if (!imageUrl) return;

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));

      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Could not upload the image!");
    } finally {
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.status === "for sale" && form.salePrice === "") {
      toast.error("Please enter a sale price!");
      return;
    }
    if (form.status === "for rent" && form.rentAmount === "") {
      toast.error("Please enter a rent amount.");
      return;
    }

    const requestBody = buildCraneRequestBody(form);

    try {
      // Send POST and await response
      await craneApi.create(requestBody);

      setNewProducerSlug(slugify(form.producer));

      // On success, reset form and refresh list
      setIsSuccess(true);
      setForm(initialCraneState);
      toast.success("Crane added successfully!");
    } catch (error) {
      // Handle or log the error
      console.error("Failed to create crane:", error);
      toast.error("Failed to create crane!");
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full mx-auto max-w-2xl px-4 sm:px-6 lg:px-0 mt-16 sm:mt-24 text-center mb-16">
        <p className="text-green-600 text-xl sm:text-2xl mb-8 sm:mb-10 tracking-wide sm:tracking-widest">
          ✅ Your crane was added successfully!
        </p>
        <Link
          to={`/cranes/producers/${encodeURIComponent(newProducerSlug)}`}
          className="inline-flex items-center justify-center bg-red-600 rounded px-4 py-2 text-base sm:text-lg text-white transition hover:bg-red-500"
        >
          View All Cranes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-0 pb-10">
      <div className="mb-6 sm:mb-8">
        <BackButton />
      </div>
      <h1 className="mb-6 pb-3 text-xl sm:text-2xl text-center uppercase tracking-wide border-b border-b-red-600">
        Add your crane
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-6 sm:mt-10">
        <CraneSpecsFields form={form} updateField={updateField} />
        <CraneMetaFields form={form} updateField={updateField} />
        <CranePricingFields form={form} updateField={updateField} />
        <CraneImageUploadField
          images={form.images}
          uploading={uploading}
          onFileChange={handleFileChange}
        />
        <CraneAvailabilitySection form={form} setForm={setForm} />
        <button
          type="submit"
          className="mt-6 inline-flex justify-center rounded px-6 py-3 text-sm sm:text-base sm:w-full uppercase bg-black text-white cursor-pointer transition hover:bg-orange-600"
        >
          Add Crane
        </button>
      </form>
    </div>
  );
}

export default AddCraneForm;
