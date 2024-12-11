import {
  FlatList,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React, { useState, useEffect } from "react";
import { db } from "@/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export default function Wishlist() {
  const [wishTitle, setWishTitle] = useState("");
  const [wishLink, setWishLink] = useState("");
  const [data, setData] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const wishlistQuery = query(
      collection(db, "Wishlist"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(wishlistQuery, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setData(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const deleteWish = async (id) => {
    console.log("deleted: ", id);
    try {
      await deleteDoc(doc(db, "Wishlist", id));
    } catch (e) {
      console.error(e.message);
    }
  };

  const addWish = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const wishObj = {
      title: wishTitle,
      link: wishLink,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "Wishlist"), wishObj);
      setWishTitle("");
      setWishLink("");
      console.log("Document added successfully");
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <TextInput
          autoCapitalize="none"
          value={wishTitle}
          placeholder="Add Title"
          placeholderTextColor="#888"
          onChangeText={(text) => setWishTitle(text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          value={wishLink}
          placeholder="Add Link"
          placeholderTextColor="#888"
          onChangeText={(text) => setWishLink(text)}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addWish} onPress={addWish}>
          <Text style={styles.addWishBtn}>Add To Wish List</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.wishTitleLink}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text style={styles.wishTitle}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => deleteWish(item.id)}
            >
              <Text>
                <SimpleLineIcons name="close" size={24} color="#d90429" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container3: {
    backgroundColor: "#fff",
  },
  container2: {
    flexDirection: "row",
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
  },
  input: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#2b2d42",
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#f5f5f5",
    width: "88%",
    alignSelf: "center",
  },
  wishTitleLink: {
    color: "#2b2d42",
    fontFamily: "pop-med",
    width: "68%",
  },
  wishTitle: {
    color: "#2b2d42",
    fontFamily: "pop-bold",
    width: "100%",
  },
  addWish: {
    margin: 20,
    backgroundColor: "#c42b2b",
    padding: 10,
    borderRadius: 50,
  },
  addWishBtn: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "pop-bold",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#141414",
  },
  btn: {
    marginTop: 0,
  },
});
