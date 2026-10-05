import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppIcons } from "@/components/AppIcons";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await AsyncStorage.setItem("authToken", "mock_user_token_12345");
      router.replace("/home");
    } catch (err) {
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0B2A24]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-7"
      >
        <View className="items-center mb-6">
          <AppIcons.Auth.MainLogo width={220} height={120} />
        </View>

        <View className="mb-6">
          <Text className="text-3xl font-bold text-[#F3FBF8] mb-1">Welcome Back</Text>
          <Text className="text-sm text-[#9FE1CB]">Log in to access Guardio Lens</Text>
        </View>

        {error ? <Text className="text-[#FF6B6B] mb-4 text-sm">{error}</Text> : null}

        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-sm text-[#E2F6F0] font-medium">Email</Text>
            <TextInput
              className="bg-[#133C34] rounded-xl px-4 py-3.5 text-[#F3FBF8] text-base border border-[#1E5448]"
              placeholder="user@example.com"
              placeholderTextColor="#5E7C75"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="gap-2">
            <Text className="text-sm text-[#E2F6F0] font-medium">Password</Text>
            <TextInput
              className="bg-[#133C34] rounded-xl px-4 py-3.5 text-[#F3FBF8] text-base border border-[#1E5448]"
              placeholder="••••••••"
              placeholderTextColor="#5E7C75"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="bg-[#5DCAA5] rounded-xl py-4 items-center mt-2"
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#0B2A24" />
            ) : (
              <Text className="text-[#0B2A24] text-base font-bold">Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="text-[#9FE1CB] text-sm">Don't have an account? </Text>
          <Link href="/signup" className="text-[#5DCAA5] text-sm font-bold">
            Sign Up
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
