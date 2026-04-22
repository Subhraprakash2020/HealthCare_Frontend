import { useState } from "react";
import PropTypes from "prop-types";
import { ProviderProfileContext } from "./ProviderProfileContext";

const ProviderProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [providerProfile, setProviderProfile] = useState(null);

  return (
    <ProviderProfileContext.Provider
      value={{
        profileImage,
        setProfileImage,
        profileName,
        setProfileName,
        providerProfile,
        setProviderProfile,
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
