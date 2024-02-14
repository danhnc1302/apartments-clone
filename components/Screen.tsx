import {
    SafeAreaView,
    StyleSheet,
    ViewStyle,
    Platform,
    StatusBar,
    View,
} from "react-native";

export const Screen = ({
    children,
    style,
}: {
    children: any;
    style?: ViewStyle;
}) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 0 : 40,
    },
});