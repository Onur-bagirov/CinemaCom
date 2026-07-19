import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/cinema.types";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CinemaNavbarLayout() {
  const { colorScheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colorScheme, insets);

  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: styles.tabBar, sceneStyle: styles.sceneBackground, headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="cinemas"
          options={{
            title: "Cinemas",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="notifications" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#E8254F",
            tabBarInactiveTintColor: "#999999",
            tabBarIcon: ({ color, size }) => <Ionicons name="wallet" color={color} size={size} />,
          }}
        />
      </Tabs>
      <View style={styles.safeAreaCover} />
    </>
  );
}

const getStyles = (theme: ThemeType, insets: any) => {
  const bgColor = theme === "light" ? "#f5f5f5" : "#1a1a1a";

  return StyleSheet.create({
    tabBar: {
      backgroundColor: bgColor,
      borderTopWidth: 1,
      borderTopColor: theme === "light" ? "#e0e0e0" : "#333",
      height: 70,
      paddingBottom: 10,
      paddingTop: 10,
      paddingHorizontal: 4,
      borderRadius: 20,
      marginHorizontal: 0,
      marginBottom: 20,
      marginTop: 0,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      justifyContent: "space-around",
    },
    sceneBackground: {
      backgroundColor: theme === "dark" ? "#0F172A" : "#fff",
    },
    safeAreaCover: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: insets.bottom || 20,
      backgroundColor: bgColor,
      zIndex: 999,
    },
  });
};