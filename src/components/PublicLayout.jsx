import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout({ openLogin, openSignup }) {
  return (
    <>
      <Navbar openLogin={openLogin} openSignup={openSignup} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default PublicLayout;
