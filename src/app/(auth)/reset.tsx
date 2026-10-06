import { AppIcons } from "@/components/AppIcons";
import { Input } from "@/components/Input";
import { supabase } from "@/lib/supabase";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Div, H1, P, Span } from "@expo/html-elements";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

export default function ResetScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleReset() {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#062b21", "#0f6e56", "#041410"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View className="absolute top-10 -left-10 w-64 h-64 bg-[#5DCAA5] rounded-full opacity-30 blur-3xl" />
      <View className="absolute bottom-20 -right-20 w-80 h-80 bg-[#169C75] rounded-full opacity-20 blur-3xl" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center px-6"
        >
          <View className="rounded-[36px] border border-white/20 overflow-hidden bg-black/10">
            <BlurView intensity={40} tint="dark">
              <View className="p-8">
                <Div className="items-center mb-8">
                  <AppIcons.Auth.MainLogo width={80} height={80} />
                  <H1 className="m-0 text-3xl font-extrabold text-white mt-4 mb-2 tracking-tight">
                    Reset Password
                  </H1>
                  <P className="m-0 text-sm text-white/70 text-center font-medium">
                    We&apos;ll send you a link to reset it
                  </P>
                </Div>

                {error ? (
                  <Div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-5">
                    <P className="m-0 text-[#FF6B6B] text-center text-sm font-medium">
                      {error}
                    </P>
                  </Div>
                ) : null}

                {success ? (
                  <Div className="bg-green-500/20 border border-green-500/40 rounded-xl p-3 mb-5">
                    <P className="m-0 text-[#5DCAA5] text-center text-sm font-medium">
                      Check your email for the reset link!
                    </P>
                  </Div>
                ) : (
                  <Div className="gap-5">
                    <Input
                      label="Email Address"
                      placeholder="user@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />

                    <TouchableOpacity
                      className="bg-[#5DCAA5] rounded-2xl py-4 items-center mt-3 shadow-lg shadow-[#5DCAA5]/30"
                      onPress={handleReset}
                      disabled={loading}
                      activeOpacity={0.8}
                    >
                      {loading ? (
                        <ActivityIndicator color="#0B2A24" />
                      ) : (
                        <Span className="text-[#0B2A24] text-base font-extrabold uppercase tracking-wider">
                          Send Link
                        </Span>
                      )}
                    </TouchableOpacity>
                  </Div>
                )}

                <Div className="flex-row justify-center mt-8 pt-2">
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Span className="text-[#5DCAA5] text-sm font-bold">
                        Back to Log In
                      </Span>
                    </TouchableOpacity>
                  </Link>
                </Div>
              </View>
            </BlurView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
