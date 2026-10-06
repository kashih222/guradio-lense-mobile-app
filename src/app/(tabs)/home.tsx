import React, { useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { AppIcons } from "@/components/AppIcons";
import { Div, P, Span, H2 } from "@expo/html-elements";

export default function HomeScreen() {
  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  return (
    <SafeAreaView className="flex-1 bg-[#0B2A24]">
      <ScrollView 
        contentContainerClassName="p-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#5DCAA5" />
        }
      >
        <Div className="flex-row justify-between items-center mb-6">
          <Div className="flex-row items-center gap-3">
            <AppIcons.Home.MainLogo width={40} height={40} showText={false} />
            <Div>
              <P className="m-0 text-xs text-[#9FE1CB]">Welcome back,</P>
              {loading ? (
                <ActivityIndicator size="small" color="#5DCAA5" className="mt-1" />
              ) : (
                <P className="m-0 text-xl font-bold text-[#F3FBF8] capitalize">{displayName}</P>
              )}
            </Div>
          </Div>
        </Div>

        <Div className="bg-[#133C34] rounded-2xl p-5 flex-row items-center mb-7 border border-[#1E5448] gap-4">
          <AppIcons.Home.ShieldIcon width={28} height={28} color="#5DCAA5" />
          <Div className="flex-1">
            <P className="m-0 text-base font-bold text-[#F3FBF8] mb-1">
              System Active & Guarding
            </P>
            <P className="m-0 text-xs text-[#9FE1CB]">
              All sensors and lens feeds online
            </P>
          </Div>
        </Div>

        <H2 className="m-0 text-lg font-semibold text-[#F3FBF8] mb-4">
          Quick Overview
        </H2>

        <Div className="flex-row flex-wrap gap-3">
          <Div className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <Div className="flex-row justify-between items-center mb-2">
              <P className="m-0 text-2xl font-bold text-[#5DCAA5]">4</P>
              <AppIcons.Home.CameraLensIcon width={20} height={20} color="#5DCAA5" />
            </Div>
            <P className="m-0 text-xs text-[#9FE1CB]">Active Lenses</P>
          </Div>

          <Div className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <Div className="flex-row justify-between items-center mb-2">
              <P className="m-0 text-2xl font-bold text-[#5DCAA5]">0</P>
              <AppIcons.Home.ShieldIcon width={20} height={20} color="#5DCAA5" />
            </Div>
            <P className="m-0 text-xs text-[#9FE1CB]">Alerts Triggered</P>
          </Div>

          <Div className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <Div className="flex-row justify-between items-center mb-2">
              <P className="m-0 text-2xl font-bold text-[#5DCAA5]">99.9%</P>
              <AppIcons.Home.CameraLensIcon width={20} height={20} color="#5DCAA5" />
            </Div>
            <P className="m-0 text-xs text-[#9FE1CB]">Uptime</P>
          </Div>

          <Div className="w-[48%] bg-[#133C34] rounded-xl p-4 border border-[#1E5448]">
            <Div className="flex-row justify-between items-center mb-2">
              <P className="m-0 text-2xl font-bold text-[#5DCAA5]">Secure</P>
              <AppIcons.Home.ShieldIcon width={20} height={20} color="#5DCAA5" />
            </Div>
            <P className="m-0 text-xs text-[#9FE1CB]">Status</P>
          </Div>
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}
