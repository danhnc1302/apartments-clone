import { useContext } from "react";
import { AuthContext } from "../context";
import { User } from "../types/user";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const setSavedProperties = () => {

  }

  const login = (user: User) => {
    let stringUser = JSON.stringify(user);
    setUser(user);
    SecureStore.setItemAsync("user", stringUser);
    queryClient.refetchQueries();
  };

  const logout = () => {
      setUser(null);
      SecureStore.deleteItemAsync("user");
      queryClient.clear();
  };

   return {
    user,
    setUser,
    setSavedProperties,
    login,
    logout
  };
};