import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef, useLayoutEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import CranesPage from "./pages/CranesPage";
import CraneDetailsPage from "./pages/CraneDetailsPage";
import EditCraneDetailsPage from "./pages/EditCraneDetailsPage";
import NewInquiryPage from "./pages/NewInquiryPage";
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

  const [authModalHeight, setAuthModalHeight] = useState(0);

  const loginPanelRef = useRef(null);
  const signupPanelRef = useRef(null);

  useLayoutEffect(() => {
    if (modalMode === "none") return;

    const activePanel =
      modalMode === "signup" ? signupPanelRef.current : loginPanelRef.current;

    if (!activePanel) return;

    const updateHeight = () => {
      setAuthModalHeight(activePanel.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(activePanel);

    return () => {
      observer.disconnect();
    };
  }, [modalMode]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "12px",
            background: "#111",
            color: "#fff",
            padding: "12px 14px",
          },
          success: {
            style: {
              background: "#166534",
            },
          },
          error: {
            style: {
              background: "#991b1b",
            },
          },
        }}
      />
      <ScrollToTop />
      <Routes>
        <Route
          element={
            <PublicLayout openLogin={openLogin} openSignup={openSignup} />
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/cranes" element={<CranesPage />} />
          <Route path="/services" element={<OurServicesPage />} />
          <Route
            path="/about"
            element={<AboutPage openSignup={openSignup} />}
          />
          <Route path="/revocation-claim" element={<RevocationPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/cranes/new"
            element={
              <IsPrivate>
                <AddCranePage />
              </IsPrivate>
            }
          />
          <Route path="/cranes/:craneId" element={<CraneDetailsPage />} />

          <Route
            path="/cranes/producers/:producerSlug"
            element={<ProducerPage />}
          />
          <Route
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
            <Route path="inquiries" element={<InquiriesListPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Modal
        isOpen={modalMode !== "none"}
        onClose={close}
        widthClass="w-[92w] max-w-[34rem]"
        panelClass="max-h-[92dvh] overflow-hidden hide-scrollbar"
        contentClass="p-0"
        style={{
          height: authModalHeight ? `${authModalHeight}px` : "auto",
          maxHeight: "88dvh",
        }}
      >
        <div
          className="relative overflow-hidden transition-[height] duration-300 ease-in-out"
          style={{
            height: authModalHeight ? `${authModalHeight}px` : "auto",
            maxHeight: "90vh",
          }}
        >
          {/* LOGIN */}
          <div
            className={
              "absolute inset-0 overflow-y-auto transition-opacity duration-300 " +
              (modalMode === "login"
                ? "opacity-100 pointer-events-auto z-20"
                : "opacity-0 pointer-events-none z-10")
            }
          >
            <div ref={loginPanelRef}>
              <LoginForm
                onSuccess={close}
                onSwitchToSignup={() => setModalMode("signup")}
              />
            </div>
          </div>

          {/* SIGNUP */}
          <div
            className={
              "absolute inset-0 overflow-y-auto transition-opacity duration-300 " +
              (modalMode === "signup"
                ? "opacity-100 pointer-events-auto z-20"
                : "opacity-0 pointer-events-none z-10")
            }
          >
            <div ref={signupPanelRef}>
              <SignupForm onSwitchToLogin={() => setModalMode("login")} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
