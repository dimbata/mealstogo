import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";

require("firebase/functions");

import { theme } from "./src/infrastructure/theme";

import {
    useFonts as useOswald,
    Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
    apiKey: "AIzaSyAv6aSckZ-3M3xhvIgTRE-Q0qnkA5fhkco",
    authDomain: "mealstogo-3aa0d.firebaseapp.com",
    projectId: "mealstogo-3aa0d",
    storageBucket: "mealstogo-3aa0d.appspot.com",
    messagingSenderId: "771889417911",
    appId: "1:771889417911:web:4f2a0ad8701200bc818732",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
    const [oswaldLoaded] = useOswald({
        Oswald_400Regular,
    });

    const [latoLoaded] = useLato({
        Lato_400Regular,
    });

    if (!oswaldLoaded || !latoLoaded) {
        return null;
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthenticationContextProvider>
                    <Navigation />
                </AuthenticationContextProvider>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </>
    );
}
