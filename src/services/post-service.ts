import { supabase } from "../lib/supabase";
import { TablesInsert } from "../types/database.types";

type InsertPost = TablesInsert<"posts">;

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

export const fetchPostById = async (id: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, group:groups(*), user:users!posts_user_id_fkey(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};

export const createPost = async (post: InsertPost) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();

  if (error) {
    console.error(error);
  } else {
    return data;
  }
};
