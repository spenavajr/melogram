import React, { useCallback, useEffect } from "react";
import { NativeBaseProvider, Center, Text, View, StatusBar } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { CUSTOM_FONTS } from "./src/config/constants";
import * as Font from "expo-font";
import { theme } from "./src/styles/theme";
import AppNavigatorComponent from "./src/components/navigation/app-navigator.component";
import { useAuthStore } from "./src/state/auth/auth.store";
import { useSecureStore } from "./src/services/secure-store/secure-store.service";

export default function App() {
  const [appReady, setAppReady] = React.useState(false);
  const { getItemAsync, setItemAsync } = useSecureStore();
  const setAuthToken = useAuthStore((state: any) => state.setAuthToken);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken;

      try {
        await Font.loadAsync(CUSTOM_FONTS);
        authToken = await getItemAsync("authToken");
        setAuthToken(authToken);
      } catch (e) {
        console.log("Restoring token failed.");
      } finally {
        setAppReady(true);
      }

      /* After restoring token, validate it
      // ...
      // ...
      */

      /* Dispatch an action to set logged in / logged out */
    };

    bootstrapAsync();
  }, []);

  useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  // if (app loading) {
  //   show splash screen
  // }

  if (!appReady) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigatorComponent />
    </NativeBaseProvider>
  );
}
