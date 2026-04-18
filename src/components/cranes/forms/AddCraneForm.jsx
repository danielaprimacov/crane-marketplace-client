import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import CraneSpecsFields from "./CraneSpecsFields";
import CraneMetaFields from "./CraneMetaFields";
import CranePricingFields from "./CranePricingFields";
import CraneImageUploadField from "./CraneImageUpload";
import CraneAvailabilitySection from "./CraneAvailabilitySection";
import BackButton from "../../ui/BackButton";

import { slugify } from "../../../utils/helpers";
import { initialCraneState, buildCraneRequestBody } from "./craneFormHelpers";
import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";

const API_URL = import.meta.env.VITE_API_URL;

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
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      alert("Could not upload the image!");
    } finally {
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    if (form.status === "for sale" && salePrice === "") {
      return alert("Please enter a sale price.");
    }
    if (form.status === "for rent" && rentAmount === "") {
      return alert("Please enter a rent amount.");
    }

    const requestBody = buildCraneRequestBody(form);

    try {
      // Send POST and await response
      await axios.post(`${API_URL}/cranes`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setNewProducerSlug(slugify(form.producer));

      // On success, reset form and refresh list
      setIsSuccess(true);
      setForm(initialCraneState);
    } catch (error) {
      // Handle or log the error
      console.error("Failed to create crane:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-full mx-auto mt-30 text-center mb-20">
        <p className="text-green-600 text-2xl mb-10 tracking-widest">
          ✅ Your crane was added successfully!
        </p>
        <Link
          to={`/cranes/producers/${encodeURIComponent(newProducerSlug)}`}
          className="inline-block bg-red-600 text-white text-lg px-4 py-2 rounded hover:bg-red-500 transition"
        >
          View All Cranes
        </Link>
      </div>
    );
  }

  return (
    <>
      <BackButton className="ml-30" />
      <h1 className="text-2xl uppercase mx-auto mb-5 border-b pb-3 border-b-red-600">
        Add your crane
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-2xl mx-auto mt-10"
      >
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
          className="bg-black text-white py-2 mt-6 rounded cursor-pointer uppercase hover:bg-orange-600 transition"
        >
          Add Crane
        </button>
      </form>
    </>
  );
}

export default AddCraneForm;
