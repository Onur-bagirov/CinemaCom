import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  { id: 1, title: "New movie released!", message: "Inception now showing at all theatres", time: "2 hours ago", icon: "🎬" },
  { id: 2, title: "Booking confirmed", message: "Your tickets for Avatar have been confirmed", time: "5 hours ago", icon: "✓" },
  { id: 3, title: "Special offer", message: "Get 20% off on weekend bookings", time: "1 day ago", icon: "🎉" },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
        </View>

        {notifications.map((notif) => (
          <View key={notif.id} style={styles.notifCard}>
            <Text style={styles.notifIcon}>{notif.icon}</Text>
            <View style={styles.notifContent}>
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifMessage}>{notif.message}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash" color="#999" size={18} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A" 
  },
  scrollContent: { 
    paddingBottom: 100 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 16 
  },
  title: { 
    color: "#fff", 
    fontSize: 24, 
    fontWeight: "600" 
  },
  notifCard: { 
    flexDirection: "row", 
    backgroundColor: "#1c1d29", 
    marginHorizontal: 15, 
    marginBottom: 12, 
    borderRadius: 12, 
    padding: 12, 
    gap: 12, 
    alignItems: "flex-start" 
  },
  notifIcon: { 
    fontSize: 28, 
    marginTop: 4 
  },
  notifContent: { 
    flex: 1 
  },
  notifTitle: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "600",
    marginBottom: 4 
  },
  notifMessage: { 
    color: "#999", 
    fontSize: 12, 
    marginBottom: 6 
  },
  notifTime: { 
    color: "#666", 
    fontSize: 11 
  },
});