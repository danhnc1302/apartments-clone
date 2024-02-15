import { useContext } from "react";
import { AuthContext } from "../context";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
const setSavedProperties = () => {

  }
   return {
    user,
    setUser,
    setSavedProperties
  };
};