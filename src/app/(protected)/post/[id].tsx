import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import posts from "../../../../assets/data/posts.json";
import comments from "../../../../assets/data/comments.json";
import PostListItem from "../../../components/post-list-item";
import CommentListItem from "../../../components/comment-list-item";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState<string>("");
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const detailedPost = posts.find((post) => post.id === id);
  const detailedComments = comments.filter((comment) => comment.post_id === id);

  if (!detailedPost) return <Text>Post not found!</Text>;

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        data={detailedComments}
        renderItem={({ item }) => <CommentListItem comment={item} />}
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
      />
      <View
        style={{
          paddingBottom: insets.bottom,
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 4,
        }}
      >
        <TextInput
          placeholder="Join the conversation"
          style={{
            backgroundColor: "#E4E4E4",
            padding: 5,
            borderRadius: 5,
          }}
          value={comment}
          onChangeText={setComment}
          multiline
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
        {inputFocus && (
          <Pressable
            onPress={() => {
              console.log("Post comment");
              setInputFocus(false);
            }}
            style={{
              backgroundColor: "#0d469b",
              borderRadius: 15,
              marginLeft: "auto",
              marginTop: 15,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: "white" }}>Reply</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
