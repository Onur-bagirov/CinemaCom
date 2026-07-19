import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SignUpForm from "@/components/screen/Auth/Signup-form";

export default function SignUpScreen() {
  const router = useRouter();

  const handleSignUpSuccess = () => {
    router.replace("/cinema-navbar/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🎬</Text>
          <Text style={styles.title}>MyCinema</Text>
          <Text style={styles.subtitle}>Create Account</Text>
        </View>
        <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Already have account?</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.signinLink}>
          <Text style={styles.signinText}>Have an account? </Text>
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
    backgroundColor: "#0F172A" 
  },
  header: { 
    alignItems: "center", 
    paddingVertical: 50 
  },
  emoji: { 
    fontSize: 60, 
    marginBottom: 10 
  },
  title: { 
    color: "#E8254F", 
    fontSize: 32, 
    fontWeight: "700" 
  },
  subtitle: { 
    color: "#999", 
    fontSize: 16, 
    marginTop: 10 
  },
  divider: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    marginBottom: 20, 
    gap: 12 
  },
  line: { 
    flex: 1, 
    height: 1, 
    backgroundColor: "#333" 
  },
  dividerText: { 
    color: "#999", 
    fontSize: 12 
  },
  signinLink: { 
    flexDirection: "row", 
    justifyContent: "center", 
    paddingVertical: 20 
  },
  signinText: { 
    color: "#999", 
    fontSize: 13 
  },
  signinLinkText: { 
    color: "#E8254F", 
    fontSize: 13, 
    fontWeight: "600" 
  },
});