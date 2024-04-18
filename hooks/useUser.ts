import { useContext } from "react";
import { AuthContext } from "../context";
import { User } from "../types/user";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  const setSavedProperties = (savedProperties: number[]) => {
    if (user) {
      const newUser = { ...user };
      newUser.savedProperties = savedProperties;
      setAndStoreUser(newUser);
    }
  };
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

  const setAndStoreUser = (user: User) => {
    let stringUser = JSON.stringify(user);
    setUser(user);
    SecureStore.setItemAsync("user", stringUser);
  };

   return {
    user,
    setUser,
    setSavedProperties,
    setAndStoreUser,
    login,
    logout
  };
};