import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, FlatList, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const cartItems = [
  { id: 1, title: "Inception", quantity: 1, price: 250, seats: "A1, A2", image: "🎬" },
  { id: 2, title: "Avatar", quantity: 2, price: 300, seats: "B5, B6", image: "🌍" },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);
  const scaleAnim = new Animated.Value(1);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxPrice = Math.round(totalPrice * 0.1);
  const finalTotal = totalPrice + taxPrice;

  const handleCheckout = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => router.push("/checkout"));
  };

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
            <View style={styles.headerCenter}>
              <Text style={styles.title}>Shopping Cart</Text>
              <Text style={styles.itemCount}>{items.length} Items</Text>
            </View>
            <View style={{ width: 44 }} />
          </View>
          {items.length > 0 ? (
            <>
              <View style={styles.itemsSection}>
                <Text style={styles.sectionLabel}>Your Selections</Text>
                <FlatList
                  data={items}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <LinearGradient
                      colors={["rgba(28, 29, 41, 0.8)", "rgba(91, 111, 232, 0.05)"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[styles.cartCard, { marginBottom: index !== items.length - 1 ? 12 : 0 }]}
                    >
                      <View style={styles.cardTop}>
                        <View style={styles.posterSection}>
                          <LinearGradient colors={["#5B6FE8", "#B565D8"]} style={styles.poster}>
                            <Text style={styles.movieEmoji}>{item.image}</Text>
                          </LinearGradient>
                        </View>
                        <View style={styles.infoSection}>
                          <Text style={styles.movieTitle}>{item.title}</Text>
                          <View style={styles.seatBadge}>
                            <Ionicons name="ticket" size={12} color="#E8254F" />
                            <Text style={styles.seatText}>{item.seats}</Text>
                          </View>
                          <Text style={styles.pricePerTicket}>₹{item.price} × {item.quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
                          <LinearGradient colors={["rgba(232, 37, 79, 0.2)", "rgba(232, 37, 79, 0.1)"]} style={styles.removeBtnBg}>
                            <Ionicons name="trash-outline" size={18} color="#E8254F" />
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.quantityRow}>
                        <View style={styles.quantityControl}>
                          <TouchableOpacity style={styles.qtyBtn}>
                            <Text style={styles.qtySymbol}>−</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyValue}>{item.quantity}</Text>
                          <TouchableOpacity style={styles.qtyBtn}>
                            <Text style={styles.qtySymbol}>+</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.priceBox}>
                          <Text style={styles.priceLabel}>Subtotal</Text>
                          <LinearGradient colors={["#E8254F", "#B565D8"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.priceBadge}>
                            <Text style={styles.priceValue}>₹{item.price * item.quantity}</Text>
                          </LinearGradient>
                        </View>
                      </View>
                    </LinearGradient>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
              <View style={styles.summaryCard}>
                <LinearGradient
                  colors={["rgba(91, 111, 232, 0.1)", "rgba(181, 101, 216, 0.05)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.summaryGradient}
                >
                  <Text style={styles.summaryTitle}>Price Breakdown</Text>
                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <Text style={styles.breakdownLabel}>Subtotal</Text>
                      <Text style={styles.breakdownSmall}>{items.length} items</Text>
                    </View>
                    <Text style={styles.breakdownAmount}>₹{totalPrice}</Text>
                  </View>
                  <View style={styles.breakdownRow}>
                    <View style={styles.breakdownLeft}>
                      <Text style={styles.breakdownLabel}>Taxes & Fees</Text>
                      <Text style={styles.breakdownSmall}>10% GST</Text>
                    </View>
                    <Text style={styles.breakdownAmount}>₹{taxPrice}</Text>
                  </View>
                  <View style={styles.promoRow}>
                    <Ionicons name="gift" size={16} color="#FFD700" />
                    <Text style={styles.promoText}>You save ₹25 with member discount</Text>
                  </View>

                  <LinearGradient colors={["#E8254F", "#B565D8"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.totalDivider} />

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>₹{finalTotal}</Text>
                  </View>
                  <View style={styles.savingsBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                    <Text style={styles.savingsText}>Secured & Encrypted Payment</Text>
                  </View>
                </LinearGradient>
              </View>
              <Animated.View style={[styles.checkoutSection, { transform: [{ scale: scaleAnim }] }]}>
                <LinearGradient colors={["#E8254F", "#B565D8"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.checkoutGradient}>
                  <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Proceed to Checkout</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 12 }} />
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </Animated.View>
            </>
          ) : (
            <View style={styles.emptyContainer}>
              <LinearGradient colors={["rgba(232, 37, 79, 0.1)", "rgba(139, 127, 232, 0.1)"]} style={styles.emptyIcon}>
                <Ionicons name="cart" size={80} color="#E8254F" />
              </LinearGradient>
              <Text style={styles.emptyText}>Your cart is empty</Text>
              <Text style={styles.emptySubtext}>Add movies to get started</Text>
              <TouchableOpacity onPress={() => router.back()} style={styles.continueButton}>
                <LinearGradient colors={["#E8254F", "#B565D8"]} style={styles.continueBtnGradient}>
                  <Text style={styles.continueBtnText}>Continue Shopping</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
    paddingBottom: 140 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 20, 
    gap: 12 
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
  headerCenter: { 
    flex: 1, 
    alignItems: "center" 
  },
  title: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "800" 
  },
  itemCount: { 
    color: "#8B7FE8", 
    fontSize: 12, 
    marginTop: 4 
  },
  itemsSection: { 
    paddingHorizontal: 16, 
    marginBottom: 24 
  },
  sectionLabel: { 
    color: "#8B7FE8", 
    fontSize: 12, 
    fontWeight: "700", 
    marginBottom: 12, 
    textTransform: "uppercase", 
    letterSpacing: 1 
  },
  cartCard: { 
    borderRadius: 16, 
    padding: 14,
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.1)" 
  },
  cardTop: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    gap: 12, marginBottom: 12 
  },
  posterSection: { 
    borderRadius: 12, 
    overflow: "hidden" 
  },
  poster: { 
    width: 80, 
    height: 110, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  movieEmoji: { 
    fontSize: 40 
  },
  infoSection: { 
    flex: 1 
  },
  movieTitle: { 
    color: "#fff", 
    fontSize: 15, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  seatBadge: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "rgba(232, 37, 79, 0.1)", 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    marginBottom: 6, 
    alignSelf: "flex-start", 
    gap: 4 
  },
  seatText: { 
    color: "#E8254F", 
    fontSize: 11, 
    fontWeight: "600" 
  },
  pricePerTicket: { 
    color: "#999", 
    fontSize: 12 
  },
  removeBtn: { 
    borderRadius: 10, 
    overflow: "hidden" 
  },
  removeBtnBg: { 
    width: 36, 
    height: 36, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  quantityRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  quantityControl: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#0F172A", 
    borderRadius: 8,
    overflow: "hidden", 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.2)" 
  },
  qtyBtn: { 
    width: 32, 
    height: 32, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "rgba(232, 37, 79, 0.15)" 
  },
  qtySymbol: { 
    color: "#E8254F", 
    fontSize: 18, 
    fontWeight: "700" 
  },
  qtyValue: { 
    color: "#fff", 
    fontSize: 14, 
    paddingHorizontal: 12, 
    fontWeight: "600" 
  },
  priceBox: { 
    alignItems: "flex-end", 
    gap: 4 
  },
  priceLabel: { 
    color: "#999", 
    fontSize: 11 
  },
  priceBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 8 
  },
  priceValue: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "700" 
  },
  summaryCard: { 
    marginHorizontal: 16, 
    marginBottom: 20, 
    borderRadius: 16, 
    overflow: "hidden", 
    borderWidth: 1, 
    borderColor: "rgba(232, 37, 79, 0.1)" 
  },
  summaryGradient: { 
    padding: 20 
  },
  summaryTitle: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "800", 
    marginBottom: 16 
  },
  breakdownRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: 12 
  },
  breakdownLeft: { 
    gap: 4 
  },
  breakdownLabel: { 
    color: "#fff", 
    fontSize: 13, 
    fontWeight: "600" 
  },
  breakdownSmall: { 
    color: "#666", 
    fontSize: 11 
  },
  breakdownAmount: { 
    color: "#E8254F", 
    fontSize: 14, 
    fontWeight: "700" 
  },
  promoRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8, 
    backgroundColor: "rgba(255, 215, 0, 0.1)", 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8,
     marginBottom: 12 
  },
  promoText: { 
    color: "#FFD700", 
    fontSize: 12, 
    fontWeight: "600" 
  },
  totalDivider: { 
    height: 2,
     marginVertical: 12 
  },
  totalRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 12 
  },
  totalLabel: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "800" 
  },
  totalValue: { 
    fontSize: 24, 
    fontWeight: "900", 
    backgroundColor: "linear-gradient(90deg, #E8254F, #B565D8)" 
  },
  savingsBadge: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8, backgroundColor: "rgba(76, 175, 80, 0.1)", 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 8 
  },
  savingsText: { 
    color: "#4CAF50", 
    fontSize: 11, 
    fontWeight: "600" 
  },
  checkoutSection: { 
    paddingHorizontal: 16 
  },
  checkoutGradient: { 
    borderRadius: 14,
    overflow: "hidden", 
    shadowColor: "#E8254F", 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 12, 
    elevation: 12 
  },
  checkoutButton: { 
    paddingVertical: 16, 
    paddingHorizontal: 24 
  },
  buttonContent: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  emptyContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 120 
  },
  emptyIcon: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 20 
  },
  emptyText: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "700", 
    marginBottom: 8 
  },
  emptySubtext: { 
    color: "#999", 
    fontSize: 14, 
    marginBottom: 24 
  },
  continueButton: { 
    borderRadius: 12, 
    overflow: "hidden", 
    paddingHorizontal: 4 
  },
  continueBtnGradient: { 
    paddingHorizontal: 32, 
    paddingVertical: 12 
  },
  continueBtnText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "600" 
  },
});