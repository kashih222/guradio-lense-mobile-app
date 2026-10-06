import { AppIcons } from "@/components/AppIcons";
import { Input } from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { Div, H1, P, Span } from "@expo/html-elements";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { makeRedirectUri } from "expo-auth-session";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.session) {
        router.replace("/(tabs)/home");
      } else {
        setError("Account created! Please check your email to verify.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setLoading(true);
    setError("");
    try {
      const redirectUrl = makeRedirectUri({
        path: "/(tabs)/home",
      });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: Platform.OS !== "web",
        },
      });

      if (error) throw error;

      if (Platform.OS !== "web" && data?.url) {
        const res = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        if (res.type === "success" && res.url) {
          const urlParams = new URLSearchParams(res.url.split('#')[1]);
          const accessToken = urlParams.get('access_token');
          const refreshToken = urlParams.get('refresh_token');
          if (accessToken && refreshToken) {
            await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          }
        }
      }
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`);
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
                <Div className="items-center mb-6">
                  <AppIcons.Auth.MainLogo width={70} height={70} />
                  <H1 className="m-0 text-3xl font-extrabold text-white mt-3 mb-1 tracking-tight text-center">
                    Create Account
                  </H1>
                  <P className="m-0 text-sm text-white/70 text-center font-medium">
                    Join Guardio Lens for total security
                  </P>
                </Div>

                {error ? (
                  <Div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 mb-4">
                    <P className="m-0 text-[#FF6B6B] text-center text-sm font-medium">
                      {error}
                    </P>
                  </Div>
                ) : null}

                <Div className="gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChangeText={setFullName}
                  />

                  <Input
                    label="Email Address"
                    placeholder="user@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />

                  <Input
                    label="Password"
                    placeholder="••••••••"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />

                  <TouchableOpacity
                    className="bg-[#5DCAA5] rounded-2xl py-4 items-center mt-4 shadow-lg shadow-[#5DCAA5]/30"
                    onPress={handleSignup}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    {loading ? (
                      <ActivityIndicator color="#0B2A24" />
                    ) : (
                      <Span className="text-[#0B2A24] text-base font-extrabold uppercase tracking-wider">
                        Sign Up
                      </Span>
                    )}
                  </TouchableOpacity>

                  <View className="flex-row items-center justify-center my-2 opacity-50">
                    <View className="h-[1px] flex-1 bg-white" />
                    <Span className="text-white mx-4 font-bold text-xs">OR</Span>
                    <View className="h-[1px] flex-1 bg-white" />
                  </View>
                  
                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-3 flex-row items-center justify-center gap-2"
                      onPress={() => handleOAuth("apple")}
                      disabled={loading}
                    >
                      <Ionicons name="logo-apple" size={20} color="white" />
                      <Span className="text-white font-semibold">Apple</Span>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-3 flex-row items-center justify-center gap-2"
                      onPress={() => handleOAuth("google")}
                      disabled={loading}
                    >
                      <Ionicons name="logo-google" size={18} color="white" />
                      <Span className="text-white font-semibold">Google</Span>
                    </TouchableOpacity>
                  </View>
                </Div>

                <Div className="flex-row justify-center mt-6 pt-2">
                  <Span className="text-white/60 text-sm font-medium">
                    Already a member?{" "}
                  </Span>
                  <Link href="/login" asChild>
                    <TouchableOpacity>
                      <Span className="text-[#5DCAA5] text-sm font-bold">
                        Log in here
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
