import React, {useCallback} from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { Loading } from "../components/Loading";
import { AddPropertySection } from "../components/AddPropertySection";
import axios from "axios";
import { useQuery } from "react-query";
import { endpoints } from "../constants";

const AddPropertyScreen = ({
  route
}: {
  route: { params: { propertyID: number } }
}) => {

  const { user } = useUser();
  if (!user) return <SignUpOrSignInScreen />

  const managerQuery = useQuery(
    "manager",
    () => {
      if (user) return axios.get(endpoints.getManagerByUserId + user.ID)
    },
    {
      cacheTime: 24 * 60 * 60 * 1000,
      retry: false
    }
  );

  useFocusEffect(
    useCallback(() => {
      if(!managerQuery.data) managerQuery.refetch();
    },[])
  );

  if (managerQuery.isLoading || managerQuery.isFetching) return <Loading />;
  if (!managerQuery.data?.data) return <CreateManagerScreen refetchManagers={managerQuery.refetch}/>;
  
  return <AddPropertySection/>
  
}

export default AddPropertyScreen;

const styles = StyleSheet.create({})