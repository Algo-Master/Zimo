import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const isIOS = Platform.OS == "ios";
export default function CustomKeyboardView({ children, inChat }) {
  let kavConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        {...scrollViewConfig}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
