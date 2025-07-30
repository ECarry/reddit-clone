import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PostListItem from "../../../components/post-list-item";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/post-service";

export default function HomeScreen() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <Text>Error fetching posts</Text>;

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
