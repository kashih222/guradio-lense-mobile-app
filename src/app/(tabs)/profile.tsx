import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Div, P, Span, H2 } from "@expo/html-elements";
import { AppIcons } from "@/components/AppIcons";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (err) {
      console.log("Error fetching user", err);
    } finally {
      setLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUser();
    setRefreshing(false);
  };

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      // The auth listener in index.tsx will automatically navigate us back to login
    } catch (err) {
      console.log("Error logging out", err);
      setLoggingOut(false);
    }
  }

  const displayName = user?.user_metadata?.full_name || "No name set";
  const displayEmail = user?.email || "No email";

  return (
    <SafeAreaView className="flex-1 bg-[#0B2A24]">
      <ScrollView 
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5DCAA5" />
        }
      >
        <Div className="mb-8">
          <H2 className="m-0 text-3xl font-extrabold text-[#F3FBF8] mb-1">Profile</H2>
          <P className="m-0 text-sm text-[#9FE1CB]">Manage your account and settings</P>
        </Div>

        <Div className="bg-[#133C34] rounded-2xl p-6 border border-[#1E5448] mb-6 items-center">
          <Div className="w-20 h-20 bg-[#5DCAA5]/20 rounded-full items-center justify-center mb-4">
            <AppIcons.Home.ShieldIcon width={40} height={40} color="#5DCAA5" />
          </Div>
          
          {loading ? (
            <ActivityIndicator size="small" color="#5DCAA5" />
          ) : (
            <>
              <P className="m-0 text-xl font-bold text-[#F3FBF8] mb-1 capitalize">{displayName}</P>
              <P className="m-0 text-sm text-[#9FE1CB]">{displayEmail}</P>
            </>
          )}
        </Div>

        <TouchableOpacity
          className="bg-red-500/10 border border-red-500/30 rounded-2xl py-4 items-center mt-4"
          onPress={handleLogout}
          disabled={loggingOut}
          activeOpacity={0.7}
        >
          {loggingOut ? (
            <ActivityIndicator size="small" color="#FF6B6B" />
          ) : (
            <Span className="text-[#FF6B6B] text-base font-bold">Log Out</Span>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
