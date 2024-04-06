import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { FormikErrors, FormikTouched } from "formik";
import RNPhoneInput from "react-native-phone-number-input";
import { EditPropertyInitialValues } from "../../types/editPropertyInitialValues";
export const ContactInfo = ({
    name,
    firstName,
    lastName,
    email,
    website,
    countryCode,
    phoneNumber,
    touched,
    errors,
    setFieldTouched,
    handleChange,
    phoneRef,
  }: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    website: string;
    countryCode: string;
    phoneNumber: string;
    touched: FormikTouched<EditPropertyInitialValues>;
    errors: FormikErrors<EditPropertyInitialValues>;
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => void;
    handleChange: {
      (e: React.ChangeEvent<any>): void;
      <T = string | React.ChangeEvent<any>>(
        field: T
      ): T extends React.ChangeEvent<any>
        ? void
        : (e: string | React.ChangeEvent<any>) => void;
    };
    phoneRef: React.RefObject<RNPhoneInput>;
  }) => {
    return (
        <>
        </>
    )
}

const styles = StyleSheet.create({

})