import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import SplashScreen from '../components/SplashScreen';

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setLoggedIn(!!session);
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
    <Redirect href="/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
