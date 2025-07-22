import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

export default function CreateScreen() {
  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AntDesign
          name="close"
          size={30}
          color="black"
          onPress={() => router.back()}
        />

        <Pressable
          onPress={() => {}}
          style={{
            marginLeft: "auto",
          }}
        >
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 10 }}
        >
          {/* COMMUNITY SELECTOR */}
          <View style={styles.communityContainer}>
            <Text style={styles.rStyle}>r/</Text>
            <Text style={{ fontWeight: "600" }}>Select a community</Text>
          </View>

          {/* INPUTS */}
          <TextInput
            placeholder="Title"
            style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
            value={title}
            onChangeText={setTitle}
            multiline
            scrollEnabled={false}
          />

          <TextInput
            placeholder="body text (optional)"
            style={{ paddingVertical: 20 }}
            value={body}
            onChangeText={setBody}
            multiline
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postText: {
    color: "white",
    backgroundColor: "#115BCA",
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  rStyle: {
    color: "white",
    backgroundColor: "black",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: "bold",
  },
  communityContainer: {
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
});
