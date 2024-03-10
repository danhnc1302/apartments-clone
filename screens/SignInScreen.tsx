import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { Formik } from 'formik';

import { ModalHeader } from "../components/ModalHeader";
import { GoogleButton } from "../components/GoogleButton";
import { FacebookButton } from "../components/FacebookButton";
import { AppleButton } from "../components/AppleButton";
import { Screen } from '../components/Screen';


import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {

  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView bounces={false}>
      <Screen style={styles.container}>
        <ModalHeader text="JPApartments" xShown />
        <Text category={"h5"} style={styles.header}>
          Sign In
        </Text>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={yup.object().shape({
              email: yup.string().email().required("Your email is required."),
              password: yup.string().required("A password is required.")
          })}
          onSubmit={(value) => {
            console.log("login passing values to server ", value);
          }}
        >
          {({
            
          }) => {

          }}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  header: {
    textAlign: "center",
    marginVertical: 20
  }
})