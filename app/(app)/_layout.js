import { Text } from "react-native"; // Make sure to import Text
import { Tabs, usePathname } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function AppLayout() {
    const pathname = usePathname();

  // 1. Define all paths where the tab bar should be visible
  const visibleTabRoutes = ['/chats/chatlist', '/updates', '/phone'];

  // 2. Check if the current pathname starts with ANY of the paths in the array
  const isTabBarVisible = visibleTabRoutes.some(route => pathname.startsWith(route));

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#494cd6ff",
        tabBarInactiveTintColor: "#8a8bd4ff",
        tabBarStyle: {
          display: isTabBarVisible ? "flex" : "none",
          height: 100,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" size={25} color={color} />
          ),
          // Use tabBarLabel to render the title dynamically
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: color,
                fontSize: 15,
                paddingTop: 5,
                fontWeight: focused ? "bold" : "500", // Dynamic fontWeight
              }}
            >
              Chats
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="update" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: color,
                fontSize: 15,
                paddingTop: 5,
                fontWeight: focused ? "bold" : "500",
              }}
            >
              Updates
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="phone"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="phone" size={25} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: color,
                fontSize: 15,
                paddingTop: 5,
                fontWeight: focused ? "bold" : "500",
              }}
            >
              Calls
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
