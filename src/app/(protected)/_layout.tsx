import { Redirect, Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";

export default function ProtectedRoutesLayout() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="post/[id]"
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: "#FF5700" },
          headerLeft: () => (
            <AntDesign
              name="close"
              size={24}
              color="white"
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <AntDesign name="search1" size={24} color="white" />
              <MaterialIcons name="sort" size={27} color="white" />
              <Entypo name="dots-three-horizontal" size={24} color="white" />
            </View>
          ),
        }}
      />
      <Stack.Screen name="group-selector" options={{ headerShown: false }} />
    </Stack>
  );
}
