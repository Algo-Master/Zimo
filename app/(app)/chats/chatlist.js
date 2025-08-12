import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Loading from "../../../components/Loading";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ListChat from "../../../components/ListChat";
import { query, where, getDocs } from "firebase/firestore";
import { usersRef } from "../../../firebaseConfig";

export default function ChatList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  // console.log("user data from ChatList Screen: ", user);

  const getUsers = async () => {
    // fetch users from firebase
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user]); // Re-runs whenever the 'user' object changes

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ListChat users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(15) }}>
          <Loading size={hp(40)} />
        </View>
      )}
    </View>
  );
}
