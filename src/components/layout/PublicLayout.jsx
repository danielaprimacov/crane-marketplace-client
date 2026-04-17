import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer";
import ExpertAdviceWidget from "../home/ExpertAdviceWidget";

function PublicLayout({ openLogin, openSignup }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        openLogin={openLogin}
        openSignup={openSignup}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {!menuOpen && <ExpertAdviceWidget />}
    </div>
  );
}

export default PublicLayout;
