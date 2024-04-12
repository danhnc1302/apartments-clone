import {
    SafeAreaView,
    StyleSheet,
    ViewStyle,
    Platform,
    StatusBar,
    View,
} from "react-native";
import { Loading } from "./Loading";
import { useLoading } from "../hooks/useLoading";

export const Screen = ({
    children,
    style,
}: {
    children: any;
    style?: ViewStyle;
}) => {
    const { loading } = useLoading();
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {loading ? <Loading /> : children}
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