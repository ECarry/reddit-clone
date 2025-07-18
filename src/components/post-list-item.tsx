import { Image, Text, View, StyleSheet } from "react-native";
import { formatDistanceToNowStrict } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Post } from "../types";

export default function PostListItem({ post }: { post: Post }) {
  return (
    <View style={{ paddingHorizontal: 15, paddingVertical: 10, gap: 10 }}>
      {/* POST HEADER */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image source={{ uri: post.group.image }} style={styles.image} />
        <Text style={{ fontWeight: "bold" }}>{post.group.name}</Text>
        <Text style={{ color: "gray" }}>
          {formatDistanceToNowStrict(new Date(post.created_at))}
        </Text>

        <View style={{ marginLeft: "auto" }}>
          <Text style={styles.joinButton}>Join</Text>
        </View>
      </View>
      {/* POST CONTENT */}
      <Text style={{ fontWeight: "bold", fontSize: 17, letterSpacing: 0.5 }}>
        {post.title}
      </Text>
      {post.image && (
        <Image
          source={{ uri: post.image }}
          style={{ width: "100%", aspectRatio: 4 / 3, borderRadius: 15 }}
        />
      )}
      <Text style={{ color: "gray" }} numberOfLines={4}>
        {post.description}
      </Text>

      {/* POST FOOTER */}
      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="arrow-up-bold-outline"
          size={19}
          color="black"
        />
        <Text>{post.upvotes}</Text>
        <MaterialCommunityIcons
          name="arrow-down-bold-outline"
          size={19}
          color="black"
        />

        <MaterialCommunityIcons
          name="comment-outline"
          size={19}
          color="black"
        />
        <Text>{post.nr_of_comments}</Text>
        <MaterialCommunityIcons name="heart-outline" size={19} color="black" />
        <View style={{ marginLeft: "auto", flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="trophy-outline"
            size={19}
            color="black"
          />
          <MaterialCommunityIcons
            name="share-outline"
            size={19}
            color="black"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  joinButton: {
    backgroundColor: "#0d469b",
    color: "white",
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
    fontWeight: "bold",
  },
});
