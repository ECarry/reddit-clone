import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PostListItem from "../../../components/post-list-item";
import { supabase } from "../../../lib/supabase";
import { Tables } from "../../../types/database.types";
import { useQuery } from "@tanstack/react-query";

type Post = Tables<"posts"> & {
  group: Tables<"groups">;
  user: Tables<"users">;
};

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

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
