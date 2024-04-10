import React, { useState } from "react";
import {
    StyleSheet,
    View,
    ViewStyle,
    TextStyle,
    TouchableOpacity
} from "react-native";
import { Input } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvaStatus } from "@ui-kitten/components/devsupport";

export const PasswordInput = ({
    value,
    style,
    onChangeText,
    placeholder = "Your Password",
    label = "password",
    onBlur,
    caption,
    status
}: {
    value: string,
    style?: ViewStyle,
    onChangeText: (text: string) => void,
    placeholder?: string,
    label: string,
    onBlur?: () => void,
    caption?: string,
    status?: string
}) => {

    const [passwordHidden, setPasswordHidden] = useState<boolean>(true);

    const getEyeIcon = () => {
        if (passwordHidden) {
            return (
                <MaterialCommunityIcons name="eye-off-outline" size={24} color="black" />
            )
        }
        return (
            <MaterialCommunityIcons name="eye-outline" size={24} color="black" />
        )
    }

    return (
        <Input
            style={style}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            autoCapitalize="none"
            autoComplete="password"
            label={label}
            secureTextEntry={passwordHidden}
            textContentType="password"
            onBlur={onBlur}
            caption={caption}
            status={status}
            accessoryRight={() => (
                <TouchableOpacity
                    style={styles.eyeContainer}
                    onPress={() => setPasswordHidden(!passwordHidden)}
                >
                    {getEyeIcon()}
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({
    eyeContainer: {
        paddingHorizontal: 10
    }
})

