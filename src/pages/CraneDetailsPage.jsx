import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import { AuthContext } from "../context/auth.context";

import Modal from "../components/ui/Modal";
import CraneGallery from "../components/cranes/CraneGallery";
import FullViewGalleryModal from "../components/cranes/FullViewGalleryModal";

import CraneDetailsPanel from "../components/cranes/CraneDetailsPanel";

const API_URL = import.meta.env.VITE_API_URL;

function CraneDetailsPage() {
  const [crane, setCrane] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { craneId } = useParams();

  const getCrane = async () => {
    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`);

      setCrane(response.data);
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCrane();
  }, [craneId]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [craneId]);

  if (!crane) return <p>Loading…</p>;

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner._id;

  const isOwner = user && user._id === ownerId;

  const handleDelete = async () => {
    setConfirmOpen(false);
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cranes/my-cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);
    }
  };

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/cranes", { replace: true });
    }
  };

  return (
    <div className="mt-20 mb-8 max-w-7xl mx-auto px-4">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 cursor-pointer"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm">
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
        </span>
        Back
      </button>

      {/* Main Card */}
      <div className="mt-6 relative">
        <div className="pb-6 bg-white shadow-lg rounded-lg overflow-hidden xl:overflow-visible lg:h-[450px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[1fr_auto] h-full">
            <CraneGallery
              crane={crane}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              onOpenFullView={() => setIsFullViewOpen(true)}
            />
            <CraneDetailsPanel
              crane={crane}
              user={user}
              isOwner={isOwner}
              craneId={craneId}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Delete Crane?</h2>
        <p className="mb-6">
          Are you sure you want to delete this crane? This cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-500 transition"
          >
            Yes, delete
          </button>
        </div>
      </Modal>

      <FullViewGalleryModal
        isOpen={isFullViewOpen}
        onClose={() => setIsFullViewOpen(false)}
        crane={crane}
        selectedImageIndex={selectedImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
    </div>
  );
}

export default CraneDetailsPage;
