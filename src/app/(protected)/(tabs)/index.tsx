import { FlatList, View } from "react-native";
import PostListItem from "../../../components/post-list-item";
import { supabase } from "../../../lib/supabase";
import { useEffect, useState } from "react";
import { Tables } from "../../../types/database.types";

type Post = Tables<"posts"> & {
  group: Tables<"groups">;
  user: Tables<"users">;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, group:groups(*), user:users!posts_user_id_fkey(*)");

    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  };

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
