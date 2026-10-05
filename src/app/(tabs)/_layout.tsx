import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5DCAA5",
        tabBarInactiveTintColor: "#5E7C75",
        tabBarStyle: {
          backgroundColor: "#0B2A24",
          borderTopColor: "#133C34",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
