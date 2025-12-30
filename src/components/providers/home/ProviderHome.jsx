import React from "react";
import ProviderHeader from "./ProviderHeader";

function ProviderHome() {
  return (
    <>
      <ProviderHeader />
      <div className="provider-body">
        <div className="container mt-4">
          <h2>Provider Dashboard</h2>
          <p>Welcome, Healthcare Provider!</p>
        </div>
      </div>
    </>
  );
}

export default ProviderHome;
