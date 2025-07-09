import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ExpertAdviceWidget from "./ExpertAdviceWidget";

function PublicLayout({ openLogin, openSignup }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar openLogin={openLogin} openSignup={openSignup} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ExpertAdviceWidget />
    </div>
  );
}

export default PublicLayout;
