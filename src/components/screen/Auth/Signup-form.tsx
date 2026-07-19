import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/AuthContext";

interface SignUpFormProps {
  onSignUpSuccess: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  age?: string;
}

export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    return value.length >= 10;
  };

  const handleSignUp = async () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Phone must be 10+ digits";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (parseInt(age) < 13) {
      newErrors.age = "Age must be 13 or older";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    const error = await signup(name, email, phone, password, parseInt(age));

    if (error) {
      Alert.alert("Sign Up Failed", error);
      setLoading(false);
      return;
    }

    setLoading(false);
    Alert.alert("Success", "Registration completed!");
    onSignUpSuccess();
  };

  const handleFieldChange = (field: keyof FormErrors, value: string) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);
    if (field === "password") setPassword(value);
    if (field === "age") setAge(value);

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Ionicons name="person" size={20} color="#E8254F" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={(text) => handleFieldChange("name", text)}
          editable={!loading}
        />
      </View>
      {errors.name && (
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle" size={12} /> {errors.name}
        </Text>
      )}

      <View style={styles.inputGroup}>
        <Ionicons name="mail" size={20} color="#E8254F" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => handleFieldChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>
      {errors.email && (
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle" size={12} /> {errors.email}
        </Text>
      )}

      <View style={styles.inputGroup}>
        <Ionicons name="call" size={20} color="#E8254F" />
        <TextInput
          style={styles.input}
          placeholder="+994..."
          placeholderTextColor="#999"
          value={phone}
          onChangeText={(text) => handleFieldChange("phone", text)}
          keyboardType="phone-pad"
          editable={!loading}
        />
      </View>
      {errors.phone && (
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle" size={12} /> {errors.phone}
        </Text>
      )}

      <View style={styles.inputGroup}>
        <Ionicons name="lock-closed" size={20} color="#E8254F" />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password (6+ characters)"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => handleFieldChange("password", text)}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
          <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle" size={12} /> {errors.password}
        </Text>
      )}

      <View style={styles.inputGroup}>
        <Ionicons name="calendar" size={20} color="#E8254F" />
        <TextInput
          style={styles.input}
          placeholder="Age (13+)"
          placeholderTextColor="#999"
          value={age}
          onChangeText={(text) => handleFieldChange("age", text)}
          keyboardType="number-pad"
          editable={!loading}
        />
      </View>
      {errors.age && (
        <Text style={styles.errorText}>
          <Ionicons name="alert-circle" size={12} /> {errors.age}
        </Text>
      )}

      <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.button}>
        <TouchableOpacity onPress={handleSignUp} style={styles.buttonTouch} disabled={loading}>
          <Ionicons name="person-add" size={20} color="#fff" />
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
    marginBottom: 8,
    gap: 10 
  },
  input: { 
    flex: 1, 
    color: "#fff", 
    fontSize: 14 
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 11,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: { 
    borderRadius: 12, 
    paddingVertical: 14, 
    alignItems: "center",
    marginTop: 12,
    overflow: "hidden",
  },
  buttonTouch: { 
    width: "100%", 
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});