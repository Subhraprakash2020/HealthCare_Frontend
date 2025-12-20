import React from "react";
import Footer from "../components/patients/home/Footer";
import PropTypes from "prop-types";


function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <main className="app-content">
        {children}
      </main>

      <Footer />
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
