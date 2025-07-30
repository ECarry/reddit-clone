import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import comments from "../../../../assets/data/comments.json";
import PostListItem from "../../../components/post-list-item";
import CommentListItem from "../../../components/comment-list-item";
import { useState, useRef, useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchPostById } from "../../../services/post-service";
import { useQuery } from "@tanstack/react-query";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });

  if (isLoading) return <ActivityIndicator />;

  if (isError || !data) return <Text>Error fetching post</Text>;

  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const insets = useSafeAreaInsets();
  const detailedComments = comments.filter((comment) => comment.post_id === id);

  const handleReplyButtonPressed = useCallback((commentId: string) => {
    console.log(commentId);
    inputRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        data={detailedComments}
        renderItem={({ item }) => (
          <CommentListItem
            comment={item}
            depth={0}
            handleReplyButtonPressed={handleReplyButtonPressed}
          />
        )}
        ListHeaderComponent={<PostListItem post={data} isDetailedPost />}
      />
      {/* <View
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
          ref={inputRef}
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
      </View> */}
    </KeyboardAvoidingView>
  );
}
