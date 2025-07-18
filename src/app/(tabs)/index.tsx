import { View } from "react-native";
import posts from "../../../assets/data/posts.json";
import PostListItem from "../../components/post-list-item";

export default function HomeScreen() {
  return (
    <View>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </View>
  );
}
