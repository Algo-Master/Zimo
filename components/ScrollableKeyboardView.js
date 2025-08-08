import { Children } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const android = Platform.OS == "ios";
export default function ScrollableKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView
      behavior={android ? "height" : "padding"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
