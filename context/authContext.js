import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // onAuthStateChanged
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      // console.log("got firebaseUser: ", firebaseUser);
      if (firebaseUser) {
        setIsAuthenticated(true);
        updateUserData(firebaseUser);
      } else {
        setIsAuthenticated(false);
        setuser(null);
      }
    });
    return unsub;
  }, []);

  updateUserData = async (firebaseUser) => {
    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setuser({
        ...firebaseUser,  // Contains all firebase user properties
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    } else {
      setuser(firebaseUser);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = error.message;
      console.log(msg);

      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email format";
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong Credentials";

      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error: e };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("response.user :", response?.user);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      console.log(msg);

      if (msg.includes("auth/email-already-in-use"))
        msg = "Email already in use";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email format";

      return { success: false, msg: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
