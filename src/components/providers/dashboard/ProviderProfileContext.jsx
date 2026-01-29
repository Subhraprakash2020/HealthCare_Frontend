import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ProviderProfileContext = createContext({
    profileImage: null,
    setProfileImage: () =>{},
    profileName: "",
    setProfileName: () =>{}
});

export const ProviderProfileProvider = ({ children }) => {
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