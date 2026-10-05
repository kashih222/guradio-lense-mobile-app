import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppIcons } from "@/components/AppIcons";

export default function HomeScreen() {
  const router = useRouter();

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("/login");
    } catch (err) {
      console.log("Error logging out", err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B2A24]">
      <ScrollView contentContainerClassName="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center gap-3">
            <AppIcons.Home.MainLogo width={120} height={60} showText={false} />
            <View>
              <Text className="text-xs text-[#9FE1CB]">Welcome back,</Text>
              <Text className="text-xl font-bold text-[#F3FBF8]">Guardio Lens</Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-[#133C34] px-3.5 py-2 rounded-lg border border-[#1E5448]"
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text className="text-[#9FE1CB] text-xs font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-[#133C34] rounded-2xl p-5 flex-row items-center mb-7 border border-[#1E5448] gap-4">
          <AppIcons.Home.ShieldIcon width={28} height={28} color="#5DCAA5" />
          <View className="flex-1">
            <Text className="text-base font-bold text-[#F3FBF8] mb-1">
              System Active & Guarding
            </Text>
            <Text className="text-xs text-[#9FE1CB]">
              All sensors and lens feeds online
            </Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-[#F3FBF8] mb-4">
          Quick Overview
        </Text>

        <View className="flex-row flex-wrap gap-3">
          <View className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-2xl font-bold text-[#5DCAA5]">4</Text>
              <AppIcons.Home.CameraLensIcon width={20} height={20} color="#5DCAA5" />
            </View>
            <Text className="text-xs text-[#9FE1CB]">Active Lenses</Text>
          </View>

          <View className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-2xl font-bold text-[#5DCAA5]">0</Text>
              <AppIcons.Home.ShieldIcon width={20} height={20} color="#5DCAA5" />
            </View>
            <Text className="text-xs text-[#9FE1CB]">Alerts Triggered</Text>
          </View>

          <View className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-2xl font-bold text-[#5DCAA5]">99.9%</Text>
              <AppIcons.Home.CameraLensIcon width={20} height={20} color="#5DCAA5" />
            </View>
            <Text className="text-xs text-[#9FE1CB]">Uptime</Text>
          </View>

          <View className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-2xl font-bold text-[#5DCAA5]">Secure</Text>
              <AppIcons.Home.ShieldIcon width={20} height={20} color="#5DCAA5" />
            </View>
            <Text className="text-xs text-[#9FE1CB]">Status</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
