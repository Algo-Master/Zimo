import { Stack } from "expo-router";
import ChatListHeader from "../../components/ChatListHeader";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chatlist"
        options={{
          header: () => <ChatListHeader />,
        }}
      />
    </Stack>
  );
}
