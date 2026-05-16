import { useCallback, useState } from "react";
import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const CLOUDINARY_URL = CLOUD_NAME
  ? `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`
  : "";

const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

function validateImageFile(file) {
  if (!file) {
    return "No file selected.";
  }

  if (!file.type.startsWith("image/")) {
    return "Only image files are allowed.";
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `Image must be smaller than ${MAX_IMAGE_SIZE_MB} MB.`;
  }

  return "";
}

export default function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = useCallback(async (file) => {
    const validationError = validateImageFile(file);

    if (validationError) {
      throw new Error(validationError);
    }

    if (!CLOUD_NAME || !UPLOAD_PRESET || !CLOUDINARY_URL) {
      throw new Error("Cloudinary upload is not configured correctly.");
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data?.secure_url;

      if (!imageUrl) {
        throw new Error("Cloudinary did not return an image URL.");
      }

      return imageUrl;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);

      const cloudinaryMessage =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Image upload failed.";

      throw new Error(cloudinaryMessage);
    } finally {
      setUploading(false);
    }
  }, []);

  return {
    uploadImage,
    uploading,
  };
}
