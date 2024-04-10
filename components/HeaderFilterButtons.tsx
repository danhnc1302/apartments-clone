import React from "react";
import {
    FlatList,
    StyleSheet
} from "react-native";

import { Button, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../theme";

export const HeaderFilterButtons = () => {

    const filterButtons = [
        {
          iconName: "filter-variant",
          onPress: () => console.log("filter all"),
        },
        {
          label: "Price",
          onPress: () => console.log("price"),
        },
        {
          label: "Move-In Date",
          onPress: () => console.log("move in date"),
        },
        {
          label: "Pets",
          onPress: () => console.log("pets"),
        },
      ];

    return (
        <FlatList
                    data={filterButtons}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 10 }}
                    renderItem={({ item, index }) => {
                        if (item.iconName) {
                            return (
                                <Button
                                    appearance="ghost"
                                    style={[styles.button, { width: 48 }]}
                                    onPress={item.onPress}
                                    accessoryLeft={
                                        <MaterialCommunityIcons name={item.iconName as any} size={20} color={theme["color-primary-500"]} />
                                    }
                                >
                                </Button>
                            )
                        }
                        return (
                            <Button
                                appearance="ghost"
                                style={styles.button}
                            >
                                {item.label}
                            </Button>
                        )
                    }}
                    keyExtractor={(_, index) => index.toString()}
                />
    )
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 30,
      borderColor: theme["color-gray"],
      marginHorizontal: 3,
    },
  });