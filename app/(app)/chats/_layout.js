import { Stack } from "expo-router";
import ChatListHeader from "../../../components/ChatListHeader";

export default function ChatLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatlist"
        options={{
          header: () => <ChatListHeader />,
        }}
      />
      <Stack.Screen name="chatRoom" />
    </Stack>
  );
}
