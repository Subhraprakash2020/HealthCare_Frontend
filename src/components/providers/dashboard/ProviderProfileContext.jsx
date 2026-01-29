import { createContext } from "react";

export const ProviderProfileContext = createContext({
    profileImage: null,
    setProfileImage: () =>{},
    profileName: "",
    setProfileName: () =>{}
});