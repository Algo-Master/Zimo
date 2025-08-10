import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import { Menu, MenuTrigger, MenuOptions } from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItem";
import { AntDesign } from "@expo/vector-icons";

const android = Platform.OS == "android";

export default function ChatListHeader() {
  const { top } = useSafeAreaInsets();
  const { logout, user } = useAuth();

  const handleProfile = () => {};

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Shadow
      distance={9}
      startColor={"#00000020"}
      offset={[0, 4]}
      style={{
        width: "100%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <View
        style={{
          paddingTop: android ? top + 10 : top,
        }}
        className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow"
      >
        <View>
          <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
            Chats
          </Text>
        </View>
        <View>
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  // trigger wrapper styles
                },
              }}
            >
              <Image
                style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={1000}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: 10,
                  borderCurve: "continuous",
                  marginTop: 50,
                  backgroundColor: "white",
                  width: 160,
                },
              }}
            >
              <MenuItem
                text="Profile"
                action={handleProfile}
                value={null}
                icon={<AntDesign name="user" size={hp(2.5)} color="#737373" />}
              />
              <Divider />
              <MenuItem
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={
                  <AntDesign name="logout" size={hp(2.5)} color="#737373" />
                }
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </Shadow>
  );
}

const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};
