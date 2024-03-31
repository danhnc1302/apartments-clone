import React from "react";
import {
  View,
  StyleSheet
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text } from "@ui-kitten/components";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { CreateManagerScreen } from "./CreateManagerScreen";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";

const AddPropertyScreen = ({
  route
}:{
  route: { params: { propertyID: number }}
}) => {
  
  const { user } = useUser();
  const manager = false

  if (!user) return <SignUpOrSignInScreen />
  if (!manager) return <CreateManagerScreen />
  
  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen>
        <ModalHeader text="JPApartments" xShown/>
        <View style={styles.container}>
            <Text category={"h5"} style={styles.header}>
              Add Your Property
            </Text>
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