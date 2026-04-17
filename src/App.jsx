import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import HomePage from "./pages/HomePage";
import CranesPage from "./pages/CranesPage";
import CraneDetailsPage from "./pages/CraneDetailsPage";
import EditCraneDetailsPage from "./pages/EditCraneDetailsPage";
import NewInquiryPage from "./pages/NewInquiryPage";
import AdminPage from "./pages/AdminPage";
import InquiriesListPage from "./pages/InquiriesListPage";
import ProfilePage from "./pages/ProfilePage";

import ScrollToTop from "./components/ui/ScrollToTop";
import PublicLayout from "./components/layout/PublicLayout";
import AdminRoute from "./components/guards/AdminRoute";
import Modal from "./components/ui/Modal";
import IsPrivate from "./components/guards/IsPrivate";
import LoginForm from "./components/forms/auth/LoginForm";
import SignupForm from "./components/forms/auth/SignupForm";
import AdminLayout from "./components/layout/AdminLayout";

import ProducersPage from "./pages/ProducersPage";
import ProducerPage from "./pages/ProducerPage";
import AddCranePage from "./pages/AddCranePage";
import UserCranesPage from "./pages/UserCranesPage";
import EditProfilePage from "./pages/EditProfilePage";

import OurServicesPage from "./pages/OurServicesPage";
import MessagesPage from "./pages/MessagesPage";
import AboutPage from "./pages/AboutPage";
import RevocationPage from "./pages/RevocationPage";
import TermsPage from "./pages/TermsPage";
import ImprintPage from "./pages/ImprintPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

function App() {
  const [modalMode, setModalMode] = useState("none");
  const openLogin = () => setModalMode("login");
  const openSignup = () => setModalMode("signup");
  const close = () => setModalMode("none");

  const [height, setHeight] = useState(0);
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);

  useEffect(() => {
    const ref = modalMode === "signup" ? signupFormRef : loginFormRef;
    if (ref.current) {
      // scrollHeight will give you the full “natural” height of the form
      setHeight(ref.current.scrollHeight);
    }
  }, [modalMode]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <PublicLayout openLogin={openLogin} openSignup={openSignup} />
          }
        >
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cranes" element={<CranesPage />} />
          <Route exact path="/services" element={<OurServicesPage />} />
          <Route
            path="/about"
            element={<AboutPage openSignup={openSignup} />}
          />
          <Route path="/revocation-claim" element={<RevocationPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            exact
            path="/cranes/new"
            element={
              <IsPrivate>
                <AddCranePage />
              </IsPrivate>
            }
          />
          <Route exact path="/cranes/:craneId" element={<CraneDetailsPage />} />
          <Route path="/cranes/producers" element={<ProducersPage />} />
          <Route
            path="/cranes/producers/:producerSlug"
            element={<ProducerPage />}
          />
          <Route
            exact
            path="/cranes/edit/:craneId"
            element={
              <IsPrivate>
                <EditCraneDetailsPage />
              </IsPrivate>
            }
          />
          <Route
            path="/cranes/:craneId/new-inquiry"
            element={<NewInquiryPage />}
          />
          <Route
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <IsPrivate>
                <EditProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path="/cranes/my-cranes"
            element={
              <IsPrivate>
                <UserCranesPage />
              </IsPrivate>
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="inquiries" element={<InquiriesListPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Modal isOpen={modalMode !== "none"} onClose={close}>
        <div
          className={
            `relative overflow-hidden transition-[height] duration-300 ease-in-out ` +
            (modalMode === "signup" ? "h-[35rem]" : "h-[25rem]")
          }
        >
          {/* LOGIN */}
          <div
            className={
              "absolute inset-0 transition-opacity duration-300 " +
              (modalMode === "login"
                ? "opacity-100 pointer-events-auto z-20"
                : "opacity-0 pointer-events-none z-10")
            }
          >
            <LoginForm
              onSuccess={close}
              onSwitchToSignup={() => setModalMode("signup")}
            />
          </div>

          {/* SIGNUP */}
          <div
            className={
              "absolute inset-0 transition-opacity duration-300 " +
              (modalMode === "signup"
                ? "opacity-100 pointer-events-auto z-20"
                : "opacity-0 pointer-events-none z-10")
            }
          >
            <SignupForm
              onSuccess={close}
              onSwitchToLogin={() => setModalMode("login")}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
