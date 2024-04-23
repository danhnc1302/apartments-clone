import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";
import { User } from './types/user';
import { AuthContext, LoadingContext } from './context';
import { socket } from './constants/socket';
import { queryKeys } from './constants';

const queryClient = new QueryClient();

export default function App() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) {
        const userObj: User = JSON.parse(user);
        setUser(userObj);
        socket.auth = {
          userID: userObj.ID,
          username:
            userObj.firstName && userObj.lastName
              ? `${userObj.firstName} ${userObj.lastName}`
              : `${userObj.email}`,
        };
        socket.connect();
      }
    }

    getUser().then(() => {
      socket.on(
        "getMessage",
        (data: {
          senderID: number;
          senderName: string;
          conversationID: number;
          text: string;
        }) => {
          queryClient.invalidateQueries(queryKeys.conversations);
          queryClient.invalidateQueries(queryKeys.selectedConversation);

          Notifications.scheduleNotificationAsync({
            content: {
              title: data.senderName,
              body: data.text,
              data: {
                // will need to change url in prod build (use process.ENV && eas.json)
                url: `exp://192.168.1.8:8081/--/messages/${data.conversationID}/${data.senderName}`,
              },
            },
            trigger: null,
          });
        }
      );
      socket.on("session", (data: { sessionID: string }) => {
        socket.auth = { sessionID: data.sessionID };
        if (user) {
          const updatedUser = { ...user };
          updatedUser.sessionID = data.sessionID;
          setUser(updatedUser);
          SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
        }
      });

      socket.on("connect_error", (err) => {
        if (err.message === "Invalid userID" && user) {
          socket.auth = {
            userID: user?.ID,
            username:
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.email}`,
          };
          socket.connect();
        }
      });
    });

    return () => {
      socket.off("getMesssage");
      socket.off("session");
      socket.off("connect_error");
    };
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <ApplicationProvider {...eva} theme={theme}>
            <Navigation />
          </ApplicationProvider>
        </QueryClientProvider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}


