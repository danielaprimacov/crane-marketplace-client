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
    <div className="mt-20 px-5 flex justify-center flex-col">
      {isLoggedIn && (
        <>
          <button
            onClick={() => setShowAdd(true)}
            className="group relative w-[30rem] h-10 py-2 m-auto bg-black text-white font-medium text-xl tracking-widest rounded-md cursor-pointer overflow-hidden transition duration-500 ease-in-out"
          >
            <span className="absolute inset-0 bg-orange-400 origin-left scale-x-0 transform transition-transform duration-500 ease-in-out group-hover:scale-x-100" />
            <span className="relative z-10 block w-full h-full flex items-center justify-center group-hover:text-black/70">
              Add Crane
            </span>
          </button>
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
      <div className="mt-10 flex flex-wrap justify-evenly gap-5">
        {cranes.map((crane) => (
          <Crane key={crane._id} {...crane} />
        ))}
      </div>
    </div>
  );
}

export default CranesPage;
