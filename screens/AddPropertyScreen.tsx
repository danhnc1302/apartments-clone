import React from "react";
import {
  StyleSheet,
} from "react-native";
import { useUser } from "../hooks/useUser";
import { SignUpOrSignInScreen } from "./SignUpOrSignInScreen";
import { AddPropertySection } from "../components/AddPropertySection";

const AddPropertyScreen = () => {
  const { user } = useUser();

  if (!user) return <SignUpOrSignInScreen />
  
  return <AddPropertySection/>
}

export default AddPropertyScreen;

const styles = StyleSheet.create({})