import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { AuthContext } from "../context/auth.context";

import Modal from "../components/ui/Modal";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import BackButton from "../components/ui/BackButton";

import CraneGallery from "../components/cranes/CraneGallery";
import FullViewGalleryModal from "../components/cranes/FullViewGalleryModal";
import CraneDetailsPanel from "../components/cranes/CraneDetailsPanel";

import useCraneDetails from "../hooks/useCraneDetails";

const API_URL = import.meta.env.VITE_API_URL;

function CraneDetailsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { craneId } = useParams();

  const { crane, loading, error } = useCraneDetails(craneId);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [craneId]);

  const handleDelete = async () => {
    setConfirmOpen(false);

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not authorized to delete this crane.");
      return;
    }
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Crane deleted successfully");
      navigate("/cranes/my-cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to delete crane. Please try again.";

      toast.error(message);
    }
  };

  if (loading) {
    return (
      <LoadingState
        type="cranes"
        title="Loading cranes details..."
        message="We are loading the crane information."
        fullPage
      />
    );
  }

  if (error || !crane) {
    return (
      <ErrorState
        title="Crane not found"
        message={error || "The crane could not be loaded or does not exist."}
        actionTo="/cranes"
        actionLabel="Back to cranes"
        fullPage
      />
    );
  }

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner?._id;

  const isOwner = Boolean(user && user._id === ownerId);

  return (
    <div className="mt-20 mb-8 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <BackButton />

      {/* Main Card */}
      <div className="mt-6 relative">
        <div className="pb-6 bg-white shadow-lg rounded-lg overflow-hidden xl:overflow-visible lg:min-h-[450px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-rows-[1fr_auto] h-full">
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
              onDeleteClick={() => setConfirmOpen(true)}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Delete Crane?</h2>
        <p className="mb-6">
          Are you sure you want to delete this crane? This cannot be undone.
        </p>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:space-x-0">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 border rounded transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded transition hover:bg-red-500"
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
