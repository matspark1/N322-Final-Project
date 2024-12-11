import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        tabBarInactiveTintColor: "#878787",
        tabBarActiveTintColor: "#141414",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                marginTop: 21,
                marginLeft: 6,
                width: 30,
                height: 30,
              }}
            >
              <Octicons name="home" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          headerTitle: "Add to your Wish List",
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                marginTop: 10,
                marginLeft: 4,
                width: 40,
                height: 40,
              }}
            >
              <FontAwesome6 name="circle-plus" size={38} color="#d90429" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Your Profile",
          title: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                marginTop: 15,
                marginLeft: 2,
                width: 30,
                height: 30,
              }}
            >
              <Ionicons name="person-circle" size={28} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
