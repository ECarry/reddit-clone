import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import { selectedGroupAtom } from "../../../atoms";
import { useAtom } from "jotai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../../services/post-service";

export default function CreateScreen() {
  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");
  const [group, setGroup] = useAtom(selectedGroupAtom);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!group) {
        throw new Error("No group selected");
      }
      if (!title) {
        throw new Error("No title");
      }
      const post = await createPost({
        title,
        description: body,
        group_id: group.id,
        user_id: "174e2887-3d3f-4214-9df6-f0985714c4a4",
      });

      return post;
    },
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      goBack();
    },
    onError: (error) => {
      console.log("error", error);
      Alert.alert("Error", error.message);
    },
  });

  const goBack = () => {
    setTitle("");
    setBody("");
    setGroup(null);
    router.back();
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 10 }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <AntDesign name="close" size={30} color="black" onPress={goBack} />

        <Pressable
          onPress={() => mutate()}
          style={{
            marginLeft: "auto",
          }}
        >
          <Text style={styles.postText}>
            {isPending ? "Posting..." : "Post"}
          </Text>
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
          <Link href="/group-selector" asChild>
            <Pressable style={styles.communityContainer}>
              {group ? (
                <>
                  <Image
                    source={{ uri: group.image || "" }}
                    style={{ width: 20, aspectRatio: 1, borderRadius: 10 }}
                  />
                  <Text style={{ fontWeight: "600" }}>{group.name}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.rStyle}>r/</Text>
                  <Text style={{ fontWeight: "600" }}>Select a community</Text>
                </>
              )}
            </Pressable>
          </Link>

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
    marginRight: 5,
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
