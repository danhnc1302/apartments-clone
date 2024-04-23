import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";

import db from "../db";

let expo = new Expo();
let tickets: ExpoPushTicket[] = [];

export const getPushTokens = async (userID: number) => {
    const { rows } = await db.query("SELECT push_tokens FROM users WHERE id = $1 AND allows_notifications = true", [userID]);
    if (rows.length > 0) {
        const { push_tokens } = rows[0];
        return push_tokens;
    }
};

export const createMessages = (
    pushTokens: string[], 
    body: string, 
    conversationID: number, 
    senderName: string
) => {
    let messages: ExpoPushMessage[]  = [];
    for (let token of pushTokens) {
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
        }
        messages.push({
            to: token,
            sound: "default",
            body,
            title: senderName,
            data: {
                url: `exp://192.168.1.8:8081/--/messages/${conversationID}/${senderName}`,
            },
        });
    }
    return messages;
};

export const sendNotifications = (messages: ExpoPushMessage[]) => {
    let chunks = expo.chunkPushNotifications(messages);
    ( async () => {
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                console.error(error);
            }
        }
    })();
};


