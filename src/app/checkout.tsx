import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePayment = () => {
    if (selectedPayment) {
      router.push("/payment");
    }
  };

  const PaymentOption = ({ id, icon, title, subtitle, badge }: { id: string; icon: string; title: string; subtitle: string; badge?: string }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setSelectedPayment(id)}
      style={[styles.paymentOption, selectedPayment === id && styles.paymentOptionSelected]}
    >
      <LinearGradient
        colors={selectedPayment === id ? ["rgba(232, 37, 79, 0.2)", "rgba(181, 101, 216, 0.1)"] : ["rgba(28, 29, 41, 0.5)", "rgba(91, 111, 232, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.paymentGradient}
      >
        <View style={styles.paymentLeft}>
          <View style={styles.iconBox}>
            <Text style={styles.paymentIcon}>{icon}</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>{title}</Text>
            <Text style={styles.paymentSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.checkmarkBox}>
          {selectedPayment === id && (
            <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.checkmark}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </LinearGradient>
          )}
        </View>
      </LinearGradient>
      {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#0F172A", "#1a1f3a"]} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <LinearGradient colors={["rgba(232, 37, 79, 0.2)", "rgba(139, 127, 232, 0.1)"]} style={styles.backIcon}>
                <Ionicons name="arrow-back" size={24} color="#E8254F" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.title}>Checkout</Text>
            <View style={{ width: 44 }} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <LinearGradient
              colors={["rgba(91, 111, 232, 0.1)", "rgba(181, 101, 216, 0.05)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryGradient}
            >
              <View style={styles.summaryRow}>
                <View>
                  <Text style={styles.summaryLabel}>Items</Text>
                  <Text style={styles.summarySmall}>2 Tickets</Text>
                </View>
                <Text style={styles.summaryValue}>₹550</Text>
              </View>

              <View style={styles.summaryRow}>
                <View>
                  <Text style={styles.summaryLabel}>Taxes</Text>
                  <Text style={styles.summarySmall}>10% GST</Text>
                </View>
                <Text style={styles.summaryValue}>₹55</Text>
              </View>

              <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹605</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Payment Method</Text>
            <Text style={styles.methodInfo}>Choose your preferred secure payment option</Text>

            <PaymentOption
              id="apple"
              icon="🍎"
              title="Apple Pay"
              subtitle="Fast and secure payment"
              badge="RECOMMENDED"
            />

            <PaymentOption
              id="google"
              icon="🔍"
              title="Google Pay"
              subtitle="Quick checkout with stored cards"
            />

            <PaymentOption
              id="card"
              icon="💳"
              title="Credit/Debit Card"
              subtitle="Visa, Mastercard, Amex"
            />

            <PaymentOption
              id="upi"
              icon="💰"
              title="UPI"
              subtitle="Bank transfer using UPI ID"
            />
          </View>

          <View style={styles.securitySection}>
            <LinearGradient
              colors={["rgba(76, 175, 80, 0.1)", "rgba(76, 175, 80, 0.05)"]}
              style={styles.securityGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.securityItem}>
                <View style={styles.securityIcon}>
                  <Ionicons name="shield-checkmark" size={18} color="#4CAF50" />
                </View>
                <Text style={styles.securityText}>256-bit SSL Encryption</Text>
              </View>

              <View style={styles.securityItem}>
                <View style={styles.securityIcon}>
                  <Ionicons name="lock-closed" size={18} color="#4CAF50" />
                </View>
                <Text style={styles.securityText}>PCI DSS Compliant</Text>
              </View>

              <View style={styles.securityItem}>
                <View style={styles.securityIcon}>
                  <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                </View>
                <Text style={styles.securityText}>Your data is safe</Text>
              </View>
            </LinearGradient>
          </View>

          <LinearGradient
            colors={selectedPayment ? ["#E8254F", "#B565D8"] : ["#333", "#222"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.payButton, !selectedPayment && styles.payButtonDisabled]}
          >
            <TouchableOpacity
              onPress={handlePayment}
              disabled={!selectedPayment}
              style={styles.payButtonTouch}
              activeOpacity={selectedPayment ? 0.8 : 1}
            >
              <View style={styles.payButtonContent}>
                <Ionicons name="card" size={20} color="#fff" />
                <Text style={styles.payButtonText}>
                  {selectedPayment
                    ? `Pay ₹605 with ${selectedPayment === "apple" ? "Apple Pay" : selectedPayment === "google" ? "Google Pay" : selectedPayment === "card" ? "Card" : "UPI"}`
                    : "Select Payment Method"}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.termsContainer}>
            <View style={styles.termItem}>
              <Ionicons name="time" size={14} color="#8B7FE8" />
              <Text style={styles.termText}>Payment processed in seconds</Text>
            </View>
            <View style={styles.termItem}>
              <Ionicons name="checkmark" size={14} color="#4CAF50" />
              <Text style={styles.termText}>Instant booking confirmation</Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A" 
  },
  scrollContent: { 
    paddingBottom: 40 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 20 
  },
  backButton: { 
    borderRadius: 12, 
    overflow: "hidden" 
  },
  backIcon: { 
    width: 44, 
    height: 44, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "800",
    flex: 1, 
    textAlign: "center" 
  },
  section: { 
    paddingHorizontal: 16, 
    marginBottom: 28 
  },
  sectionTitle: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "800", 
    marginBottom: 12 
  },
  methodInfo: { 
    color: "#999", 
    fontSize: 12, 
    marginBottom: 16 
  },
  summaryGradient: { 
    borderRadius: 16, 
    padding: 16, 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.1)" 
  },
  summaryRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12 
  },
  summaryLabel: { 
    color: "#fff", 
    fontSize: 13, 
    fontWeight: "700" 
  },
  summarySmall: { 
    color: "#666", 
    fontSize: 11, 
    marginTop: 2 
  },
  summaryValue: { 
    color: "#E8254F", 
    fontSize: 15, 
    fontWeight: "700" 
  },
  divider: { 
    height: 2, 
    marginVertical: 12 
  },
  totalLabel: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "800" 
  },
  totalValue: { 
    fontSize: 22, 
    fontWeight: "900", 
    color: "#E8254F" 
  },
  paymentOption: { 
    marginBottom: 12, 
    borderRadius: 14, 
    overflow: "hidden", 
    borderWidth: 2, 
    borderColor: "transparent" 
  },
  paymentOptionSelected: { 
    borderColor: "#E8254F" 
  },
  paymentGradient: { 
    padding: 14, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.1)" 
  },
  paymentLeft: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12, flex: 1 
  },
  iconBox: { 
    width: 50, 
    height: 50, 
    borderRadius: 12, 
    backgroundColor: "rgba(232, 37, 79, 0.1)", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  paymentIcon: { 
    fontSize: 28 
  },
  paymentInfo: { 
    gap: 4
  },
  paymentTitle: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "700" 
  },
  paymentSubtitle: {
    color: "#999", 
    fontSize: 12 
  },
  checkmarkBox: { 
    width: 28, 
    height: 28 
  },
  checkmark: {
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  badge: { 
    position: "absolute", 
    top: 8, right: 8, 
    backgroundColor: "#FFD700", 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 4 
  },
  badgeText: { 
    color: "#0F172A", 
    fontSize: 9, 
    fontWeight: "700" 
  },
  securitySection: { 
    paddingHorizontal: 16, 
    marginBottom: 24 
  },
  securityGradient: { 
    borderRadius: 14, 
    padding: 14, 
    borderWidth: 1, 
    borderColor: "rgba(76, 175, 80, 0.2)" 
  },
  securityItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10, 
    marginBottom: 10 
  },
  securityIcon: { 
    width: 32, 
    height: 32, 
    borderRadius: 8, 
    backgroundColor: "rgba(76, 175, 80, 0.1)", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  securityText: { 
    color: "#4CAF50", 
    fontSize: 12, 
    fontWeight: "600", 
    flex: 1 
  },
  payButton: { 
    marginHorizontal: 16, 
    borderRadius: 14, 
    overflow: "hidden", 
    marginBottom: 16, 
    shadowColor: "#E8254F", 
    shadowOffset: { 
      width: 0, 
      height: 8 
    }, shadowOpacity: 0.4, 
    shadowRadius: 16, 
    elevation: 16 
  },
  payButtonDisabled: {
    opacity: 0.5 
  },
  payButtonTouch: { 
    paddingVertical: 16 
  },
  payButtonContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 12 
  },
  payButtonText: { 
    color: "#fff", 
    fontSize: 15, 
    fontWeight: "700" 
  },
  termsContainer: { 
    paddingHorizontal: 16, 
    gap: 12 
  },
  termItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10, paddingHorizontal: 12, 
    paddingVertical: 10, 
    backgroundColor: "rgba(139, 127, 232, 0.05)", 
    borderRadius: 10 
  },
  termText: { 
    color: "#8B7FE8", 
    fontSize: 12,
    fontWeight: "600", 
    flex: 1 
  },
});
