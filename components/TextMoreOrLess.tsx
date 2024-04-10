import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";

export const TextMoreOrLess = ({
  children,
  initialLines = 1,
}: {
  children: string;
  initialLines: number;
}) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = (e: { nativeEvent: { lines: any } }) => {
    const { lines } = e.nativeEvent;
    if (lines && Array.isArray(lines) && lines.length > 0) {
      if (lines.length >= initialLines) {
        setLengthMore(true);
      }
    }
  };

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : initialLines}
        category={"c1"}
      >
        {children}
      </Text>

      {lengthMore ? (
        <TouchableOpacity
          style={styles.lengthMoreTextContainer}
          onPress={toggleNumberOfLines}
        >
          <Text category={"c1"} status={"info"}>
            {textShown ? "Read less" : "Read more"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  lengthMoreTextContainer: {
    paddingVertical: 5,
    zIndex: 30,
  },
});