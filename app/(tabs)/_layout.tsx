import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "cyan",
        tabBarInactiveTintColor: "#fff",
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Ionicons name="home" size={size} color={color} />
            ) : (
              <Ionicons name="home" size={size} color={color} />
            )
          } 
        }}
      />

      <Tabs.Screen
      name="archive"
        options={{
          title: "Archive",
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            return focused ? (
              <Ionicons name="archive" size={size} color={color} />
            ) : (
              <Ionicons name="archive" size={size} color={color} />
            )
          } 
        }}
      />

    </Tabs>
  )
}
