import PropTypes from "prop-types";
import { useState } from "react";
import { ProfileContext } from "./ProfileContext";

const ProfilePatient = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfilePatient.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfilePatient;
