import LottieView from "lottie-react-native";
import { View, Text } from "react-native";

export default function Loading({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 2 }}>
      <LottieView
        style={{ width: '100%', height: '100%' }}
        source={require("../assets/animations/LoadingPaperPlane.json")}
        autoPlay
        loop
      />
    </View>
  );
}
