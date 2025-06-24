import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddCrane from "../components/AddCrane";
import { AuthContext } from "../context/auth.context";
import Crane from "../components/Crane";
import Modal from "../components/Modal";

const API_URL = "http://localhost:5005";

function CranesPage() {
  const [cranes, setCranes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const getAllCranes = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/cranes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setCranes(response.data);
    } catch (error) {
      console.error("Failed to fetch cranes:", error);
    }
  };

  useEffect(() => {
    getAllCranes();
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <>
          <button onClick={() => setShowAdd(true)}>Add Crane</button>
          {showAdd && (
            <Modal onClose={() => setShowAdd(false)}>
              <AddCrane
                refreshCranes={() => {
                  getAllCranes();
                  setShowAdd(false);
                }}
              />
            </Modal>
          )}
        </>
      )}

      {cranes.map((crane) => (
        <Crane key={crane._id} {...crane} />
      ))}
    </div>
  );
}

export default CranesPage;
