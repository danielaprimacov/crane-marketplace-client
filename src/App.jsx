import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CranesPage from "./pages/CranesPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CraneDetailsPage from "./pages/CraneDetailsPage";
import EditCraneDetailsPage from "./pages/EditCraneDetailsPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/cranes" element={<CranesPage />} />
        <Route exact path="/cranes/:craneId" element={<CraneDetailsPage />} />
        <Route
          exact
          path="/cranes/edit/:craneId"
          element={<EditCraneDetailsPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
