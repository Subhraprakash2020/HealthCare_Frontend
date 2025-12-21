import { createContext } from "react";

export const ProfileContext = createContext({
  profileImage: null,
  setProfileImage: ()=>{},
  profileName: "",
  setProfileName: ()=>{}
});
