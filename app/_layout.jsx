import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { onAuthStateChanged } from "firebase/auth";
import { useColorScheme } from "@/components/useColorScheme";
import { auth } from "@/FirebaseConfig";
import { useNavigation, router } from "expo-router";
import { View } from "@/components/Themed";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "pop-reg": require("../assets/fonts/Poppins-Regular.ttf"),
    "pop-med": require("../assets/fonts/Poppins-Medium.ttf"),
    "pop-bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "pop-ex": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  onAuthStateChanged(auth, (user) => {
    console.log("User: ", user);
    setIsLoading(false);
    if (user) {
      router.replace("./(tabs)");
    }
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerTitleStyle: styles.headerTitle }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  loadingText: {
    fontFamily: "pop-med",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontFamily: "pop-bold",
  },
});
