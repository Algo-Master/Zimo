import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useAuth, AuthContextProvider } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("/(app)/chats/chatlist");
    } else if (isAuthenticated == false) {
      // redirect to signin
      router.replace("/(auth)/signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
