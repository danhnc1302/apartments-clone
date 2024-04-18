import { useContext } from "react";
import { AuthContext } from "../context";
import { User } from "../types/user";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";
import { queryKeys } from "../constants";
import { Property } from "../types/property";

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
    const searchedProperties: Property[] | undefined = queryClient.getQueryData(
      queryKeys.searchProperties
    );

    if (searchedProperties) {
      for (let i of searchedProperties) {
        i.liked = false;
        if (user.savedProperties?.includes(i.ID)) i.liked = true;
      }
      queryClient.setQueryData(queryKeys.searchProperties, searchedProperties);
    }

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