import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/theme-provider";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignIn/index" />
              <Stack.Screen name="SignUp/index" />
              <Stack.Screen name="cinema-navbar" />
              <Stack.Screen name="checkout" />
              <Stack.Screen name="payment" />
              <Stack.Screen name="seat-selection" />
            </Stack>
          </ThemeProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}