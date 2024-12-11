import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";

export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      alert("Failed to sign in" + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/images/LOGO.png")}
        />
      </View>
      <Text style={styles.headerText}>Wish List</Text>
      <Text style={styles.headerText2}>Sign In or Create Account</Text>
      <TextInput
        autoCapitalize="none"
        value={email}
        keyboardType="email-address"
        placeholder="Email Address..."
        placeholderTextColor="#888"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        placeholder="Password..."
        placeholderTextColor="#888"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={signUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "pop-reg",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: -160,
  },
  logo: {
    width: 300,
    height: 300,
  },
  headerText: {
    fontFamily: "pop-bold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
    marginTop: -60,
    color: "#d90429",
  },
  headerText2: {
    fontFamily: "pop-bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#141414",
  },
  input: {
    fontFamily: "pop-reg",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#2b2d42",
    borderRadius: 50,
    padding: 14,
    backgroundColor: "#f5f5f5",
    width: "80%",
    fontSize: 16,
  },
  button: {
    marginTop: 14,
    marginBottom: 6,
    borderRadius: 50,
    backgroundColor: "#2b2d42",
    padding: 10,
    width: "80%",
  },
  buttonText: {
    fontFamily: "pop-med",
    color: "#fff",
    textAlign: "center",
  },
});
