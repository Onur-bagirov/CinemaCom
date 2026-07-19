import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SignUpForm from "@/components/screen/Auth/Signup-form";

export default function SignUpScreen() {
  const router = useRouter();

  const handleSignUp = (fullName: string, email: string, phone: string, password: string, age: number) => {
    if (fullName && email && phone && password && age) {
      router.replace("/cinema-navbar/home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🎬</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join CinemaCom</Text>
        </View>
        <SignUpForm onSignUp={handleSignUp} />
        <View style={styles.signinLink}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <Text style={styles.signinLinkText} onPress={() => router.push("/SignIn")}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    color: "#E8254F",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#999",
    fontSize: 14,
    marginTop: 8,
  },
  signinLink: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  signinText: {
    color: "#999",
    fontSize: 13,
  },
  signinLinkText: {
    color: "#E8254F",
    fontSize: 13,
    fontWeight: "600",
  },
});