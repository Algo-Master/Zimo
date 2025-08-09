import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  console.log("user data from home: ", user);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Home</Text>
      <Pressable onPress={handleLogout}>
        <Text className="text-xl">Sign Out</Text>
      </Pressable>
    </View>
  );
}
