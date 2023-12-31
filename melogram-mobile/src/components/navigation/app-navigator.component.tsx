import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "native-base";
import HomeNavigatorComponent from "./home-navigator.component";
import ProfileScreen from "../../screens/profile/profile.screen";
import LoginScreen from "../../screens/login/login.screen";
import NotificationsScreen from "../../screens/notifications/notifications.screen";
import GetStartedScreen from "../../screens/get-started/get-started.screen";
import DummyCredentialsScreen from "../../screens/dummy-credentials/dummy-credentials.screen";

export default function AppNavigatorComponent() {
  const Stack = createNativeStackNavigator();

  const loggedIn = false;

  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />

      {!loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Dummy Credentials"
            component={DummyCredentialsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GetStarted"
            component={GetStartedScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeNavigatorComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Notifications"
            component={NotificationsScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
