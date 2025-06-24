import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function CraneDetailsPage() {
  const [crane, setCrane] = useState(null);
  const { craneId } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getCrane = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setCrane(response.data);
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCrane();
  }, [craneId]);

  if (!crane) return <p>Loading…</p>;

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner._id;

  const isOwner = user && user._id === ownerId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crane?")) return;
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);
    }
  };

  return (
    <div>
      {crane && (
        <>
          <h1>{crane.title}</h1>
          <span> {crane.price} €</span>
          <p>{crane.description}</p>
          {crane.images?.length > 0 ? (
            <div>
              {crane.images.map((url, index) => (
                <img key={index} src={url} alt="" />
              ))}{" "}
            </div>
          ) : (
            <p>No images</p>
          )}
          <p>{crane.location}</p>
          <p>{crane.status}</p>
          {crane.availability?.from && crane.availability?.to ? (
            <p>
              Available from{" "}
              {new Date(crane.availability.from).toLocaleDateString()} to{" "}
              {new Date(crane.availability.to).toLocaleDateString()}
            </p>
          ) : (
            <p>Availability not specified.</p>
          )}
          {user?.role !== "admin" && (
            <Link to={`/cranes/${craneId}/new-inquiry`}>
              <button>Send inquiry</button>
            </Link>
          )}
        </>
      )}
      {(user?.role === "admin" || isOwner) && (
        <>
          <Link to={`/cranes/edit/${craneId}`}>Edit Crane Details</Link>
          <button onClick={handleDelete}>Delete Crane</button>
        </>
      )}

      <Link to="/cranes">Back</Link>
    </div>
  );
}

export default CraneDetailsPage;
