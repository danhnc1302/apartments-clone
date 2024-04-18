import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context";
import { useMutation } from "react-query";
import { User } from "../types/user";
import { AuthRequestPromptOptions } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AppleAuthentication from "expo-apple-authentication";

import {
    appleLoginOrRegister,
    facebookLoginOrRegister,
    googleLoginOrRegister,
    loginUser,
    registerUser,
} from "../services/user";

import { useLoading } from "./useLoading";
import { useUser } from "./useUser";

export const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const { loading, setLoading } = useLoading();
    const { login } = useUser();
    const { goBack } = useNavigation();
    

    const [__, googleResponse, googleAuth] = Google.useAuthRequest({
        expoClientId: "609338360845-uviejptq1i1s3qrmo53r2fu9fk11v6ij.apps.googleusercontent.com",
        iosClientId: "609338360845-hl8st7dd5onrsirmllvagq7fe3pe41pc.apps.googleusercontent.com",
        androidClientId: "609338360845-7o3nisik2lvj6o26rg1iua6q97i054f3.apps.googleusercontent.com",
        webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
        selectAccount: true,
        redirectUri: "https://auth.expo.io/@danhdevapp/apartments-clone"
    })

    const [____, _____, fbPromptAsync] = Facebook.useAuthRequest({
        clientId: '1136500530862081',
        redirectUri: "https://auth.expo.io/@danhdevapp/apartments-clone",
    });

    useEffect(() => {
        async function loginUserWithGoogle(access_token: string) {
            try {
                setLoading(true);
                const user = await googleLoginOrRegister(access_token);
                handleSignInUser(user);
            } catch (error) {
                handleAuthError();
            } finally {
                setLoading(false);
            }
        }

        if (googleResponse?.type === "success") {
            const { access_token } = googleResponse.params;
            loginUserWithGoogle(access_token);
        }
    }, [googleResponse]);

    const handleSignInUser = (user?: User | null) => {
        if (user) {
            login(user);
            goBack();
        }
    };

    const handleAuthError = () => alert("Unable to authorize");

    

    const nativeLogin = useMutation(async (values: { email: string, password: string }) => {
        try {
            setLoading(true);
            const user = await loginUser(values.email, values.password);
            handleSignInUser(user);
        } catch (error) {
            handleAuthError();
        } finally {
            setLoading(false);
        }
    })

    const nativeRegister = useMutation(
        async (values: {
            firstName: string, lastName: string, email: string, password: string
        }) => {
            try {
                setLoading(true);
                const user = await registerUser(
                    values.firstName,
                    values.lastName,
                    values.email,
                    values.password
                );
                handleSignInUser(user);
            } catch (error) {
                handleAuthError();
            } finally {
                setLoading(false);
            }
        })

        const facebookAuth = async (proxyOptions: AuthRequestPromptOptions) => {
            try {
              const response = await fbPromptAsync(proxyOptions);
              if (response.type === "success") {
                setLoading(true);
                const { access_token } = response.params;
        
                const user = await facebookLoginOrRegister(access_token);
                handleSignInUser(user);
              }
            } catch (error) {
              handleAuthError();
            } finally {
              setLoading(false);
            }
          };

          const appleAuth = async () => {
            try {
              const { identityToken } = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                ],
              });
        
              if (identityToken) {
                setLoading(true);
        
                const user = await appleLoginOrRegister(identityToken);
                handleSignInUser(user);
              }
            } catch (error) {
              handleAuthError();
            } finally {
              setLoading(false);
            }
          };
        

    return { nativeRegister, nativeLogin, facebookAuth, googleAuth, appleAuth };
}   