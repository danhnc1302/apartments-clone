import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import { FormikErrors, FormikTouched } from "formik";
import { EditPropertyInitialValues } from "../../types/editPropertyInitialValues";
import { Property } from "../../types/property";
import { TempApartment } from "../../types/tempApartment";

export const UnitsInput = ({
    unitType,
    apartments,
    property,
    touched,
    errors,
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleShowAlternateScreen,
  }: {
    unitType: string | undefined;
    apartments: TempApartment[];
    property: Property | undefined;
    touched: FormikTouched<EditPropertyInitialValues>;
    errors: FormikErrors<EditPropertyInitialValues>;
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => void;
    setFieldValue: (
      field: string,
      value: any,
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
    handleShowAlternateScreen: (index: number, name: string) => void;
  }) => {
    return (
        <>
        </>
    )
}

const styles = StyleSheet.create({

})