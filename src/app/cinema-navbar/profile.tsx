import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Modal, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageMenu, setShowImageMenu] = useState(false);

  const handlePickImage = async (source: "camera" | "library") => {
    try {
      let result;

      if (source === "camera") {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
          Alert.alert("İcazə Lazımdır", "Kamera istifadə etmək üçün icazə verin");
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!libraryPermission.granted) {
          Alert.alert("İcazə Lazımdır", "Fotolar istifadə etmək üçün icazə verin");
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        setShowImageMenu(false);
        Alert.alert("Uğurlu", "Profil şəkli yeniləndi!");
      }
    } catch (error) {
      Alert.alert("Xəta", "Şəkil seçmə zamanı xəta baş verdi");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImageFull} />
            ) : (
              <LinearGradient
                colors={["#E8254F", "#B565D8"]}
                style={styles.avatar}
              >
                <Ionicons name="person" size={60} color="#fff" />
              </LinearGradient>
            )}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowImageMenu(true)}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>Onur Bagirov</Text>
          <Text style={styles.userEmail}>onur@example.com</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="ticket" color="#8B7FE8" size={20} />
            <Text style={styles.sectionTitle}>My Tickets</Text>
          </View>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => router.push("tickets")}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="calendar" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Current Tickets</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
            onPress={() => router.push("past-tickets")}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="history" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Past Tickets</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="settings" color="#8B7FE8" size={20} />
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="person-outline" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed-outline" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" color="#8B7FE8" size={20} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" color="#666" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" color="#E8254F" size={20} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showImageMenu}
        onRequestClose={() => setShowImageMenu(false)}
      >
        <View style={styles.imageMenuContainer}>
          <View style={styles.imageMenuContent}>
            <Text style={styles.imageMenuTitle}>Şəkil Seç</Text>

            <TouchableOpacity
              style={styles.imageMenuButton}
              onPress={() => handlePickImage("camera")}
            >
              <LinearGradient
                colors={["#E8254F", "#B565D8"]}
                style={styles.imageMenuButtonGradient}
              >
                <Ionicons name="camera" size={24} color="#fff" />
                <Text style={styles.imageMenuButtonText}>Kamera ilə Şəkil Çək</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageMenuButton}
              onPress={() => handlePickImage("library")}
            >
              <LinearGradient
                colors={["#8B7FE8", "#5B6FE8"]}
                style={styles.imageMenuButtonGradient}
              >
                <Ionicons name="images" size={24} color="#fff" />
                <Text style={styles.imageMenuButtonText}>Qalereyadan Seç</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageMenuCancelButton}
              onPress={() => setShowImageMenu(false)}
            >
              <Text style={styles.imageMenuCancelText}>İptal Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageFull: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#1c1d29",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8254F",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#0F172A",
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  userEmail: {
    color: "#999",
    fontSize: 13,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#E8254F",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    color: "#999",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#1c1d29",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  logoutText: {
    color: "#E8254F",
    fontSize: 16,
    fontWeight: "600",
  },
  imageMenuContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  imageMenuContent: {
    backgroundColor: "#1c1d29",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  imageMenuTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  imageMenuButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageMenuButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 12,
  },
  imageMenuButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageMenuCancelButton: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  imageMenuCancelText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
  },
});