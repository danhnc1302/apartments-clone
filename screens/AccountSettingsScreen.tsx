import { StyleSheet } from "react-native";
import { Text, Toggle } from "@ui-kitten/components";

import { Screen } from "../components/Screen";
import { useUser } from "../hooks/useUser";
import { Row } from "../components/Row";
import { useNotifications } from "../hooks/useNotifications";

const AccountSettingsScreen = () => {
  const { user, setAllowsNotifications } = useUser();
  const { registerForPushNotificationsAsync } = useNotifications();

  const notificationsChanged = async (checked: boolean) => {
    if(!user?.allowsNotifications) registerForPushNotificationsAsync(true);
    setAllowsNotifications(!user?.allowsNotifications);
    try {
      if (!checked) return setAllowsNotifications(checked);

      setAllowsNotifications(checked);
      await registerForPushNotificationsAsync(true);
    } catch (error) {
      setAllowsNotifications(!checked);
    }
  };

  return (
    <Screen style={styles.container}>
      <Row style={styles.row}>
        <Text>Notifications</Text>
        <Toggle
          checked={user?.allowsNotifications}
          onChange={notificationsChanged}
        />
      </Row>
    </Screen>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginTop: 15,
  },
});