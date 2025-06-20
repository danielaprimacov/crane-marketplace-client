import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CranesPage from "./pages/CranesPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CraneDetailsPage from "./pages/CraneDetailsPage";
import EditCraneDetailsPage from "./pages/EditCraneDetailsPage";
import NewInquiryPage from "./pages/NewInquiryPage";
import AdminRoute from "./components/AdminRoute";
import AdminPage from "./pages/AdminPage";

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
        <Route
          path="/cranes/:craneId/new-inquiry"
          element={<NewInquiryPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
