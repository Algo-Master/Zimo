import { TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../../components/ChatRoomHeader";
import MessagesList from "../../../components/MessagesList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomKeyboardView from "../../../components/CustomKeyboardView";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState();
  const [text, setText] = useState("");

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessagesList messages={messages} />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                placeholder="Type message..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
                value={text}
                onChangeText={setText}
              />
              <TouchableOpacity className="bg-neutral-200 p-3 mr-[1px] rounded-full">
                <FontAwesome
                  name="send"
                  size={hp(2.7)}
                  color={text.trim().length > 0 ? "#494cd6ff" : "#8a8bd4ff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
