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

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await AsyncStorage.setItem("authToken", "mock_user_token_12345");
      router.replace("/home");
    } catch (err) {
      setError("Failed to create account. Please try again.");
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
        <View className="items-center mb-4">
          <AppIcons.Auth.MainLogo width={200} height={110} />
        </View>

        <View className="mb-5">
          <Text className="text-3xl font-bold text-[#F3FBF8] mb-1">Create Account</Text>
          <Text className="text-sm text-[#9FE1CB]">
            Sign up to secure your home with Guardio Lens
          </Text>
        </View>

        {error ? <Text className="text-[#FF6B6B] mb-3 text-sm">{error}</Text> : null}

        <View className="gap-3.5">
          <View className="gap-1.5">
            <Text className="text-sm text-[#E2F6F0] font-medium">Full Name</Text>
            <TextInput
              className="bg-[#133C34] rounded-xl px-4 py-3 text-[#F3FBF8] text-base border border-[#1E5448]"
              placeholder="Jane Doe"
              placeholderTextColor="#5E7C75"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View className="gap-1.5">
            <Text className="text-sm text-[#E2F6F0] font-medium">Email</Text>
            <TextInput
              className="bg-[#133C34] rounded-xl px-4 py-3 text-[#F3FBF8] text-base border border-[#1E5448]"
              placeholder="user@example.com"
              placeholderTextColor="#5E7C75"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="gap-1.5">
            <Text className="text-sm text-[#E2F6F0] font-medium">Password</Text>
            <TextInput
              className="bg-[#133C34] rounded-xl px-4 py-3 text-[#F3FBF8] text-base border border-[#1E5448]"
              placeholder="••••••••"
              placeholderTextColor="#5E7C75"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="bg-[#5DCAA5] rounded-xl py-3.5 items-center mt-2"
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#0B2A24" />
            ) : (
              <Text className="text-[#0B2A24] text-base font-bold">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-[#9FE1CB] text-sm">Already have an account? </Text>
          <Link href="/login" className="text-[#5DCAA5] text-sm font-bold">
            Log In
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
