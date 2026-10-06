import { Platform, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Div, P, H2 } from '@expo/html-elements';

export default function DeviceInfoScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level);
    })();
    let subscription: Battery.Subscription | null = null;
    if (Platform.OS !== 'web') {
      subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
      });
    }
    
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0B2A24]">
      <ScrollView contentContainerClassName="p-6">
        <Div className="items-center mb-8 mt-4">
          <Div className="w-20 h-20 bg-[#5DCAA5]/20 rounded-full items-center justify-center mb-4">
            <Ionicons name="hardware-chip" size={40} color="#5DCAA5" />
          </Div>
          <H2 className="m-0 text-3xl font-extrabold text-[#F3FBF8] mb-1 tracking-tight">
            Device Info
          </H2>
        </Div>

        <Div className="gap-4">
          <Div className="bg-[#133C34] rounded-2xl p-5 flex-row items-center border border-[#1E5448]">
            <Div className="w-10 items-center">
              <Ionicons name="battery-half" size={28} color="#5DCAA5" />
            </Div>
            <Div className="ml-4 flex-1">
              <P className="m-0 text-[#9FE1CB] text-xs font-bold uppercase tracking-wider mb-1">
                Battery Level
              </P>
              <P className="m-0 text-[#F3FBF8] text-xl font-bold">
                {batteryLevel !== null ? `${(batteryLevel * 100).toFixed(0)}%` : 'Loading...'}
              </P>
            </Div>
          </Div>

          <Div className="bg-[#133C34] rounded-2xl p-5 flex-row items-center border border-[#1E5448]">
            <Div className="w-10 items-center">
              <Ionicons name="phone-portrait-outline" size={28} color="#5DCAA5" />
            </Div>
            <Div className="ml-4 flex-1">
              <P className="m-0 text-[#9FE1CB] text-xs font-bold uppercase tracking-wider mb-1">
                Device Model
              </P>
              <P className="m-0 text-[#F3FBF8] text-xl font-bold">
                {Device.modelName || 'Unknown'}
              </P>
            </Div>
          </Div>

          <Div className="bg-[#133C34] rounded-2xl p-5 flex-row items-center border border-[#1E5448]">
            <Div className="w-10 items-center">
              <Ionicons name="logo-apple" size={28} color="#5DCAA5" />
            </Div>
            <Div className="ml-4 flex-1">
              <P className="m-0 text-[#9FE1CB] text-xs font-bold uppercase tracking-wider mb-1">
                OS Version
              </P>
              <P className="m-0 text-[#F3FBF8] text-xl font-bold">
                {Device.osName} {Device.osVersion}
              </P>
            </Div>
          </Div>
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}
