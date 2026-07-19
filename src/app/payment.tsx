import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={["#0F172A", "#1a1f3a"]} style={styles.gradientContainer}>
          <View style={styles.loadingContainer}>
            <LinearGradient
              colors={["#E8254F", "#B565D8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.loadingCircle}
            >
              <Animated.View style={{ transform: [{ rotate: new Animated.Value(0).interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }] }}>
                <Ionicons name="card" size={50} color="#fff" />
              </Animated.View>
            </LinearGradient>
            <Text style={styles.loadingText}>Processing Payment</Text>
            <Text style={styles.loadingSubtext}>Secure transaction in progress...</Text>
            
            <View style={styles.progressBar}>
              <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.progressFill} />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0F172A", "#1a1f3a"]} style={styles.gradientContainer}>
        <Animated.View style={[styles.successContainer, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          <LinearGradient colors={["#4CAF50", "#45a049"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.successCircle}>
            <Ionicons name="checkmark" size={80} color="#fff" />
          </LinearGradient>

          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>Your booking has been confirmed</Text>

          <View style={styles.confirmationContainer}>
            <LinearGradient
              colors={["rgba(76, 175, 80, 0.1)", "rgba(76, 175, 80, 0.05)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.confirmationCard}
            >
              <View style={styles.confirmRow}>
                <View style={styles.confirmLabel}>
                  <Ionicons name="receipt" size={16} color="#4CAF50" />
                  <Text style={styles.confirmLabelText}>Booking ID</Text>
                </View>
                <Text style={styles.confirmValue}>#BK2024001</Text>
              </View>
              <View style={styles.confirmRow}>
                <View style={styles.confirmLabel}>
                  <Ionicons name="cash" size={16} color="#E8254F" />
                  <Text style={styles.confirmLabelText}>Amount Paid</Text>
                </View>
                <Text style={styles.confirmValue}>₹605</Text>
              </View>
              <View style={styles.confirmRow}>
                <View style={styles.confirmLabel}>
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  <Text style={styles.confirmLabelText}>Status</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>✓ Confirmed</Text>
                </View>
              </View>
              <View style={styles.confirmRow}>
                <View style={styles.confirmLabel}>
                  <Ionicons name="mail" size={16} color="#8B7FE8" />
                  <Text style={styles.confirmLabelText}>Tickets Sent</Text>
                </View>
                <Text style={styles.confirmValue}>Email</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.nextStepsCard}>
            <LinearGradient
              colors={["rgba(91, 111, 232, 0.1)", "rgba(181, 101, 216, 0.05)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextStepsGradient}
            >
              <Text style={styles.nextStepsTitle}>What's Next?</Text>
              <View style={styles.nextStep}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Check your email</Text>
                  <Text style={styles.stepDesc}>Tickets have been sent to your inbox</Text>
                </View>
              </View>
              <View style={styles.nextStep}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Arrive early</Text>
                  <Text style={styles.stepDesc}>Please arrive 15 minutes before showtime</Text>
                </View>
              </View>
              <View style={styles.nextStep}>
                <View style={styles.stepCircle}>
                  <Text style={styles.stepNumber}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>Show your QR code</Text>
                  <Text style={styles.stepDesc}>Present your digital ticket at entrance</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <LinearGradient
            colors={["#E8254F", "#B565D8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.actionButton}
          >
            <TouchableOpacity onPress={() => router.push("/cinema-navbar/home")} style={styles.buttonTouch}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Back to Home</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity onPress={() => router.push("/cinema-navbar/profile")} style={styles.myBookingsButton}>
            <Text style={styles.myBookingsText}>View My Bookings</Text>
            <Ionicons name="arrow-forward" size={16} color="#E8254F" />
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A" 
  },
  gradientContainer: { 
    flex: 1 
  },
  loadingContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 20 
  },
  loadingCircle: { 
    width: 120, 
    height: 120,
    borderRadius: 60, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 32, 
    shadowColor: "#E8254F", 
    shadowOffset: { 
      width: 0, 
      height: 12 
    }, 
    shadowOpacity: 0.4, 
    shadowRadius: 20, 
    elevation: 20 
  },
  loadingText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  loadingSubtext: { 
    color: "#999", 
    fontSize: 14, 
    marginBottom: 32 
  },
  progressBar: { 
    width: 240, 
    height: 6, 
    backgroundColor: "#1c1d29", 
    borderRadius: 3, 
    overflow: "hidden" 
  },
  progressFill: { 
    width: "60%", 
    height: "100%" 
  },
  successContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  successCircle: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 28, 
    shadowColor: "#4CAF50", 
    shadowOffset: { 
      width: 0, 
      height: 12 
    }, 
    shadowOpacity: 0.4, 
    shadowRadius: 20, 
    elevation: 20 
  },
  successTitle: { 
    color: "#fff", 
    fontSize: 32, 
    fontWeight: "900", 
    marginBottom: 8 
  },
  successSubtitle: { 
    color: "#999", 
    fontSize: 15, 
    marginBottom: 28 
  },
  confirmationContainer: { 
    width: "100%", 
    marginBottom: 24 
  },
  confirmationCard: { 
    borderRadius: 16, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: "rgba(76, 175, 80, 0.2)" 
  },
  confirmRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingVertical: 12 
  },
  confirmLabel: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8 
  },
  confirmLabelText: { 
    color: "#999", 
    fontSize: 13, 
    fontWeight: "600" 
  },
  confirmValue: { 
    color: "#fff", 
    fontSize: 15, 
    fontWeight: "700" 
  },
  statusBadge: { 
    backgroundColor: "rgba(76, 175, 80, 0.2)", 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "rgba(76, 175, 80, 0.3)" 
  },
  statusText: { 
    color: "#4CAF50", 
    fontSize: 12,
    fontWeight: "700" 
  },
  nextStepsCard: { 
    width: "100%", 
    marginBottom: 24, 
    borderRadius: 16, 
    overflow: "hidden", 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.1)" 
  },
  nextStepsGradient: { 
    padding: 20 
  },
  nextStepsTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "800", 
    marginBottom: 16 
  },
  nextStep: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    gap: 14, 
    marginBottom: 16 
  },
  stepCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: "#E8254F", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  stepNumber: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "800" 
  },
  stepContent: { 
    flex: 1, 
    gap: 4 
  },
  stepTitle: { 
    color: "#fff", 
    fontSize: 13, 
    fontWeight: "700" 
  },
  stepDesc: { 
    color: "#999", 
    fontSize: 12 
  },
  actionButton: { 
    width: "100%", 
    borderRadius: 14, 
    overflow: "hidden", 
    marginBottom: 12, 
    shadowColor: "#E8254F", 
    shadowOffset: { 
      width: 0, 
      height: 8 
    }, 
    shadowOpacity: 0.4, 
    shadowRadius: 16, 
    elevation: 16 
  },
  buttonTouch: { 
    paddingVertical: 16, 
    paddingHorizontal: 20 
  },
  buttonContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 8 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  myBookingsButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 8, 
    paddingVertical: 14 
  },
  myBookingsText: { 
    color: "#E8254F", 
    fontSize: 15, 
    fontWeight: "700" 
  },
});