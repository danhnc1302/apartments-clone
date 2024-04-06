import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import { PickerItem } from "react-native-woodpicker";
export const UtilitiesAndAmenities = ({
    includedUtilities,
    petsAllowed,
    laundryType,
    parkingFee,
    amenities,
    setFieldValue,
    handleChange,
  }: {
    includedUtilities: string[];
    petsAllowed: PickerItem;
    laundryType: PickerItem;
    parkingFee: string;
    amenities: string[];
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
  }) => {
    return (
        <>
        </>
    )
}

const styles = StyleSheet.create({

})