import { View, Text, ActivityIndicator } from 'react-native';
import { MainLogo } from '../src/components/AppIcons';

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-[#0B2A24] items-center justify-center">
      <MainLogo width={280} height={160} showText={true} />
      <Text className="text-xs text-[#9FE1CB] mt-2">See home. Stay secure.</Text>
      <ActivityIndicator
        size="small"
        color="#5DCAA5"
        className="absolute bottom-10"
      />
    </View>
  );
}
