import { useState } from "react";
import PropTypes from "prop-types";
import { ProviderProfileContext } from "./ProviderProfileContext";

const ProviderProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");

  return (
    <ProviderProfileContext.Provider
      value={{
        profileImage,
        setProfileImage,
        profileName,
        setProfileName,
      }}
    >
      {children}
    </ProviderProfileContext.Provider>
  );
};

ProviderProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderProfileProvider;
