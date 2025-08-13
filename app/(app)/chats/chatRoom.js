import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../../components/ChatRoomHeader";
import MessagesList from "../../../components/MessagesList";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
// import CustomKeyboardView from "../../../components/CustomKeyboardView";
import { getRoomId } from "../../../utils/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  setDoc,
  Timestamp, query
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const isIOS = Platform.OS === "ios";

export default function ChatRoom() {
  const { user } = useAuth();
  const item = useLocalSearchParams(); // Friend user
  const router = useRouter(); // Real User
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  const createRoomIfNotExists = async () => {
    // console.log("Initiating Room Creation");

    //roomId
    let roomId = getRoomId(user?.userId, item?.userId);
    // console.log(
    //   "User1: ",
    //   user?.userId,
    //   "\b User2: ",
    //   item?.userId,
    //   "\n RoomId: ",
    //   roomId
    // );
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = text.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");

      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setText("");
      console.log("new message id: ", newDoc.id);
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  return (
    // <CustomKeyboardView inChat={true}>
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        {/* Background to be fixed */}
        <View className="flex-1">
          <MessagesList messages={messages} />
        </View>
        <KeyboardAvoidingView
          behavior={isIOS ? "padding" : "padding"}
          // This offset is for the header, adjust if needed
          keyboardVerticalOffset={100}
        >
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                placeholder="Type message..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
                value={text}
                onChangeText={setText}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-3 mr-[1px] rounded-full"
              >
                <FontAwesome
                  name="send"
                  size={hp(2.7)}
                  color={text.trim().length > 0 ? "#494cd6ff" : "#8a8bd4ff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
    // </CustomKeyboardView>
  );
}
