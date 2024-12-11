import { StyleSheet, Button, Text, View, TouchableOpacity } from "react-native";
import { signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";

export default function Profile() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        email: user.email,
        uid: user.uid,
      });
    }
  }, []);

  const signUserOut = async () => {
    try {
      await signOut(auth).then(() => {
        console.log("User signed out");
        navigation.replace("index");
      });
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const resetPassword = async () => {
    if (!userInfo || !userInfo.email) {
      console.log("User email not found");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, userInfo.email);
      alert(`Password reset email sent to ${userInfo.email}`);
    } catch (error) {
      console.error("Error sending reset email: ", error.message);
      alert("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.white}>
        <Text style={styles.title}></Text>
        <View style={styles.userInfoContainer}>
          {userInfo ? (
            <>
              <Text style={styles.title2}>Email:</Text>
              <Text style={styles.userInfoText}> {userInfo.email}</Text>
              <Text style={styles.title3}>User ID:</Text>
              <Text style={styles.userInfoText}>{userInfo.uid}</Text>
            </>
          ) : (
            <Text style={styles.userInfoText}>Loading user info...</Text>
          )}
        </View>
      </View>
      <View style={styles.white}>
        <TouchableOpacity
          mode="contained"
          onPress={resetPassword}
          style={styles.button}
        >
          <Text style={styles.btnText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          mode="contained"
          onPress={signUserOut}
          style={styles.button}
        >
          <Text style={styles.btnText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },
  white: {
    backgroundColor: "",
    width: "100%",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    fontFamily: "pop-bold",
  },
  title2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: -10,
    marginTop: 14,
    fontFamily: "pop-bold",
    color: "#2b2d42",
  },
  title3: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: -10,
    marginTop: 40,
    fontFamily: "pop-bold",
    color: "#2b2d42",
  },
  userInfoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 16,
    marginTop: 20,
    color: "#2b2d42",
  },
  instructions: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    margin: 20,
    backgroundColor: "#c42b2b",
    padding: 10,
    borderRadius: 50,
    width: "80%",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "pop-bold",
    letterSpacing: 0.3,
  },
});
