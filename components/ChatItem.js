import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { View, Text, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ChatItem({ noBorder, router, item }) {
  const openChatRoom = () => {
    router.push({ pathname: "/chats/chatRoom", params: item });
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-4 ${noBorder ? "" : "border-b border-b-neutral-200"}`}
    >
      <Image
        source={{ uri: item ? item.profileUrl : { blurhash } }}
        style={{ height: hp(5.5), width: wp(12), borderRadius: 100 }}
        placeholder={blurhash}
        transition={1000}
      />
      {/* {name and last message} */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            Time
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          Last Message
        </Text>
      </View>
    </TouchableOpacity>
  );
}
