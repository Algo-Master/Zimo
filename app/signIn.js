import { useRouter } from "expo-router";
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { Octicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import Loading from "../components/Loading";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Fields are empty!!");
      return;
    }

    // Login Process
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(15), paddingHorizontal: wp(5) }}
        className="flex-1 gap-14"
      >
        {/* {signIn image} */}

        <View className="items-center">
          <LottieView
            source={require("../assets/animations/Login.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>

          {/* {inputs} */}

          <View className="gap-4">
            <View
              style={{ height: hp(6) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2), width: wp(80) }}
                className="font-semibold text-neutral-700"
                placeholder="Email Address"
                placeholderTextColor="gray"
              />
            </View>
            <View className="gap-3">
              <View
                style={{ height: hp(6) }}
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{ fontSize: hp(2), width: wp(80) }}
                  className="font-semibold text-neutral-700"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
              </View>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-neutral-500"
              >
                Forgot Password?
              </Text>
            </View>

            {/* {Submit Button} */}

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(12)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(6.5) }}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* {Sign Up Text} */}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Don't have an account?
              </Text>
              <Pressable
                onPress={() => {
                  console.log("Link to SignUp Pressed");
                  router.push("signUp");
                }}
              >
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
