import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';

export default function CameraScreen() {
  const [isFocused, setIsFocused] = useState(false);
  
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => setIsFocused(false);
    }, [])
  );

  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View className="flex-1 bg-black" />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black justify-center items-center p-6">
        <Ionicons name="camera" size={64} color="#5DCAA5" />
        <Text className="text-white text-xl font-bold mt-6 text-center">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity 
          className="bg-[#5DCAA5] px-8 py-4 rounded-2xl mt-8 shadow-lg shadow-[#5DCAA5]/30"
          onPress={requestPermission}
        >
          <Text className="text-[#0B2A24] font-extrabold uppercase tracking-wider">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data?.uri) {
        setPhoto(data.uri);
      }
    }
  }

  if (photo) {
    return (
      <View className="flex-1 bg-black">
        <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} />
        <SafeAreaView className="flex-1 justify-between p-6">
          <View className="items-end">
            <TouchableOpacity 
              className="bg-black/50 p-4 rounded-full border border-white/20"
              onPress={() => setPhoto(null)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mb-4 gap-4">
            <TouchableOpacity 
              className="bg-black/60 px-8 py-4 rounded-2xl border border-white/20 flex-1 items-center"
              onPress={() => setPhoto(null)}
            >
              <Text className="text-white font-bold uppercase tracking-wider">Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="bg-[#5DCAA5] px-8 py-4 rounded-2xl flex-1 items-center shadow-lg shadow-[#5DCAA5]/30"
              onPress={() => {
                Alert.alert("Success", "Photo saved!");
                setPhoto(null);
              }}
            >
              <Text className="text-[#0B2A24] font-extrabold uppercase tracking-wider">Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!isFocused) {
    return <View className="flex-1 bg-black" />;
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={cameraRef} />
      <SafeAreaView className="flex-1 justify-between p-6" pointerEvents="box-none">
        <View className="items-end">
          <TouchableOpacity 
            className="bg-black/50 p-4 rounded-full border border-white/20"
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="items-center mb-8">
          <TouchableOpacity 
            className="w-20 h-20 rounded-full border-4 border-white items-center justify-center bg-white/20"
            onPress={takePicture}
          >
            <View className="w-16 h-16 rounded-full bg-white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
