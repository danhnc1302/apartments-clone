import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

export const GeneralPropertyInfo = ({
  images,
  description,
  setFieldValue,
}: {
  images: string[];
  description: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}) => {
  return (
   <>
   </>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    paddingVertical: 10,
  },
  smallHeader: { fontWeight: "bold", marginBottom: 5 },
  largeMarginTop: { marginTop: 30 },
  row: { alignItems: "center" },
  icon: { marginRight: 10 },
  photoText: {
    textAlign: "center",
    fontStyle: "italic",
  },
  photoButton: {
    borderColor: theme["color-primary-500"],
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "dashed",
    padding: 30,
    backgroundColor: theme["color-primary-100"],
    opacity: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    backgroundColor: theme["color-gray"],
    marginVertical: 10,
  },
});