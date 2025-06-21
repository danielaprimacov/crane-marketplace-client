import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddCrane from "../components/AddCrane";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function CranesPage() {
  const [cranes, setCranes] = useState([]);
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
      {isLoggedIn && <AddCrane refreshCranes={getAllCranes} />}
      <ul>
        {cranes.map((crane) => (
          <li key={crane._id}>{crane.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default CranesPage;
