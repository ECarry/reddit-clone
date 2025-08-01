import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { selectedGroupAtom } from "../../atoms";
import { useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../../services/group-service";
import { Tables } from "../../types/database.types";

type Group = Tables<"groups">;

export default function GroupSelector() {
  const [search, setSearch] = React.useState<string>("");
  const setGroup = useSetAtom(selectedGroupAtom);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups", { search }],
    queryFn: () => fetchGroups(search),
    staleTime: 10_000,
    placeholderData: (prevData) => prevData,
  });

  if (isLoading) return <ActivityIndicator />;

  if (isError || !data) return <Text>Error fetching groups</Text>;

  const onGroupSelected = (group: Group) => {
    setGroup(group);
    router.back();
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="close"
          size={30}
          color="black"
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            textAlign: "center",
            flex: 1,
            paddingRight: 30,
          }}
        >
          Post to
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "lightgray",
          borderRadius: 5,
          marginVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        <AntDesign name="search1" size={16} color="gray" />
        <TextInput
          placeholder="Search for a community"
          placeholderTextColor="gray"
          value={search}
          onChangeText={setSearch}
          style={{
            paddingVertical: 10,
          }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginBottom: 20,
            }}
            onPress={() => {
              onGroupSelected(item);
            }}
          >
            <Image
              source={{ uri: item.image || "" }}
              style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
            />
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
