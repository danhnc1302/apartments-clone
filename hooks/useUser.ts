import { useContext } from "react";
import { AuthContext } from "../context";
import { User } from "../types/user";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";
import { queryKeys } from "../constants";
import { Property } from "../types/property";
import { alterAllowsNotifications, alterPushToken } from "../services/user";

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

  const addPushToken = async (token: string) => {
    if (user) {
      const updatedUser = { ...user };
      const prevUser = { ...user };

      updatedUser.pushToken = token;

      setAndStoreUser(updatedUser);

      try {
        await alterPushToken(user.ID, "add", token, user.accessToken);
      } catch (error) {
        setAndStoreUser(prevUser);
      }
    }
  };

  const setAllowsNotifications = async (allowed: boolean) => {
    if (user) {
      const updatedUser = { ...user };
      const prevUser = { ...user };
      updatedUser.allowsNotifications = allowed;
      setAndStoreUser(updatedUser);

      try {
        await alterAllowsNotifications(user.ID, allowed, user.accessToken);
      } catch (error) {
        console.error(error);
        setAndStoreUser(prevUser);
      }
    }
  };

  return {
    user,
    setUser,
    setSavedProperties,
    setAndStoreUser,
    login,
    logout,
    setAllowsNotifications,
    addPushToken
  };
};