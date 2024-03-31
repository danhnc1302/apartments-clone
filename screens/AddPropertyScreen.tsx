import React from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { Loading } from "../components/Loading";
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
      if (user) return axios.get(endpoints.getManagersByUserId + user.ID)
    },
    {
      cacheTime: 24 * 60 * 60 * 1000
    }
  );
  if (managerQuery.isLoading) return <Loading />;
  if (managerQuery.data?.data.managers.length === 0 || !managerQuery.data) return <CreateManagerScreen refetchManagers={managerQuery.refetch}/>;
  console.log(managerQuery.data.data.managers[0].image)
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="JPApartments" xShown />
        <View style={styles.container}>
          <Text category={"h5"} style={styles.header}>
            Add Your Property
          </Text>
          <Image source={{ uri:managerQuery.data.data.managers[0].image }} style={{ width: 250, height: 250 }}/>
        </View>
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default AddPropertyScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  header: {
    marginVertical: 20
  }
})