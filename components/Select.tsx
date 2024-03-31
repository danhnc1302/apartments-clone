import React from 'react'
import { 
    ViewStyle, 
    View, 
    StyleSheet, 
    Platform 
} from "react-native";
import { 
    Picker, 
    PickerItem 
} from "react-native-woodpicker";
import { Text } from "@ui-kitten/components";

import { theme } from "../theme";

export const Select = ({
    label,
  item,
  items,
  onItemChange,
  style,
  isNullable,
  error,
  errorText,
  placeholder,
  onClose,
}:{
    label: string;
    item: PickerItem;
    items: PickerItem[];
    onItemChange: (item: PickerItem, index: number) => void;
    style?: ViewStyle;
    isNullable?: boolean;
    error?: boolean;
    errorText?: string;
    placeholder?: string;
    onClose?: () => void;
}) => {
    return (
        <>
        </>
    )
}

const styles = StyleSheet.create({})