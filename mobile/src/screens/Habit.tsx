import { View } from "react-native";

import { useRoute } from "@react-navigation/native";

interface Params {
  date: string;
}

export function Habit(){
  const route = useRoute();
  const { date } = route.params as Params;
  return (
    <View className="flex bg-background px-8 pt-16">

    </View>
  )
}