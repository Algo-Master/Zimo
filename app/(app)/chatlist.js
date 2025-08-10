import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../context/authContext";

export default function ChatList() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  console.log("user data from ChatList Screen: ", user);
  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-bold text-blue-500">Home</Text>
      <Pressable onPress={handleLogout}>
        <Text className="text-xl">Sign Out</Text>
      </Pressable>
    </View>
  );
}
