import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../components/SplashScreen';

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const token = await AsyncStorage.getItem('authToken');
      setLoggedIn(!!token);
    } catch (err) {
      console.log('Error checking session', err);
    } finally {
      setChecking(false);
    }
  }

  if (checking) {
    return <SplashScreen />;
  }

  return loggedIn ? (
    <Redirect href="/home" />
  ) : (
    <Redirect href="/login" />
  );
}
