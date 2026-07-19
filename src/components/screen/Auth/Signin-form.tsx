import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/AuthContext";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => void;
}

export default function SignInForm({ onSignIn }: SignInFormProps) {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password required";
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setLoading(true);
    const error = await signin(email, password);

    if (error) {
      Alert.alert("Sign In Failed", error);
      setLoading(false);
      return;
    }

    setLoading(false);
    Alert.alert("Success", "Welcome!");
    onSignIn(email, password);
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Ionicons name="mail" size={20} color="#E8254F" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>
      {errors.email && <Text style={{ color: "#E8254F", fontSize: 12, marginBottom: 8 }}>{errors.email}</Text>}

      <View style={styles.inputGroup}>
        <Ionicons name="lock-closed" size={20} color="#E8254F" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={{ color: "#E8254F", fontSize: 12, marginBottom: 8 }}>{errors.password}</Text>}

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.button}>
        <TouchableOpacity onPress={handleSignIn} style={styles.buttonTouch} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Sign In"}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { 
    paddingHorizontal: 20, 
    marginBottom: 40 
  },
  inputGroup: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#1c1d29", 
    borderRadius: 12, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    marginBottom: 16,
    gap: 10 
  },
  input: { 
    flex: 1, 
    color: "#fff", 
    fontSize: 14 
  },
  forgotPassword: { 
    color: "#8B7FE8", 
    fontSize: 13, 
    textAlign: "right", 
    marginBottom: 24 
  },
  button: { 
    borderRadius: 12, 
    paddingVertical: 14, 
    alignItems: "center"
  },
  buttonTouch: { 
    width: "100%", 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});