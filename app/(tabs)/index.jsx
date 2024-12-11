import { StyleSheet, Text, View } from "react-native";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default function Profile() {
  const auth = getAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        email: user.email,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {userInfo ? (
        <Text style={styles.title}>Hello {userInfo.email}</Text>
      ) : (
        <Text>Loading user information...</Text>
      )}
      <View style={styles.container2}>
        <MaterialCommunityIcons
          name="bookmark-check-outline"
          size={70}
          color="#407ba7"
          style={{
            marginTop: 20,
          }}
        />
        <Text style={styles.title2}>Curate</Text>
        <Text style={styles.subtitle}>Craft your perfect collections</Text>
      </View>
      <View style={styles.container2}>
        <Feather
          name="gift"
          size={70}
          color="#16a14e"
          style={{
            marginTop: 20,
          }}
        />
        <Text style={styles.title3}>Discover</Text>
        <Text style={styles.subtitle2}>Connect through wishes</Text>
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
    flexDirection: "column",
    width: "100%",
  },
  container2: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 14,
    padding: 20,
    backgroundColor: "#ededed",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    width: "90%",
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
    color: "#141414",
  },
  title2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 14,
    fontFamily: "pop-bold",
    color: "#2b2d42",
  },
  subtitle: {
    margin: 20,
    color: "#2b2d42",
  },
  subtitle2: {
    margin: 20,
    color: "#2b2d42",
  },
  title3: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 14,
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
