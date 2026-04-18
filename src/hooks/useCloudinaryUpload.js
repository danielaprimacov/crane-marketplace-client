import { useState } from "react";
import axios from "axios";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/upload`;

const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

export default function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return null;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      return res.data.secure_url;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
}
