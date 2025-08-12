import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  console.log("Current Friend Data: ", item);
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  );
}
