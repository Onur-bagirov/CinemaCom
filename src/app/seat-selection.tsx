import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/context/CartContext";

const SEAT_PRICE = 250;
const RESERVED_SEATS = ["A1", "A2", "B5", "B6", "C3", "D4", "E2", "E8", "F1", "F7", "F12"];

export default function SeatSelectionScreen() {
  const router = useRouter();
  const { movieTitle } = useLocalSearchParams();
  const { addToCart } = useCart();
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatPress = (seatId: string) => {
    if (RESERVED_SEATS.includes(seatId)) {
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const handleClearAll = () => {
    setSelectedSeats([]);
  };

  const totalPrice = selectedSeats.length * SEAT_PRICE;

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      Alert.alert("Select Seats", "Please select at least one seat");
      return;
    }
    addToCart({
      movieTitle: String(movieTitle),
      seats: selectedSeats.length,
      totalPrice: totalPrice,
      selectedSeats: selectedSeats.join(", "),
    });
    router.push("/checkout");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Select Seats</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.movieTitle}>{movieTitle}</Text>

        <View style={styles.screenContainer}>
          <View style={styles.screen} />
          <Text style={styles.screenLabel}>Screen</Text>
        </View>

        <View style={styles.seatsContainer}>
          {["A", "B", "C", "D", "E", "F"].map((row) => (
            <View key={row} style={styles.seatRow}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seatsInRow}>
                {Array.from({ length: 12 }).map((_, col) => {
                  const seatId = `${row}${col + 1}`;
                  const isReserved = RESERVED_SEATS.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);

                  return (
                    <TouchableOpacity
                      key={seatId}
                      style={[
                        styles.seat,
                        isReserved && styles.seatReserved,
                        isSelected && styles.seatSelected,
                      ]}
                      onPress={() => handleSeatPress(seatId)}
                      disabled={isReserved}
                    >
                      <Text style={[styles.seatIcon, isReserved && styles.seatIconReserved, isSelected && styles.seatIconSelected]}>■</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <Text style={[styles.legendIcon, { color: "#8B7FE8" }]}>■</Text>
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={[styles.legendIcon, { color: "#E8254F" }]}>■</Text>
            <Text style={styles.legendText}>Selected</Text>
          </View>
          <View style={styles.legendItem}>
            <Text style={[styles.legendIcon, { color: "#666" }]}>■</Text>
            <Text style={styles.legendText}>Reserved</Text>
          </View>
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Seats:</Text>
            <Text style={styles.priceValue}>{selectedSeats.length}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price per Seat:</Text>
            <Text style={styles.priceValue}>₹{SEAT_PRICE}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₹{totalPrice}</Text>
          </View>
        </View>

        <View style={styles.seatsDisplay}>
          <Text style={styles.seatsDisplayLabel}>
            Selected: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.buttonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.proceedButton, selectedSeats.length === 0 && styles.proceedButtonDisabled]}
            onPress={handleProceed}
            disabled={selectedSeats.length === 0}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  movieTitle: {
    color: "#E8254F",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  screenContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  screen: {
    width: "80%",
    height: 8,
    backgroundColor: "#B565D8",
    borderRadius: 4,
    marginBottom: 8,
  },
  screenLabel: {
    color: "#999",
    fontSize: 12,
  },
  seatsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  seatRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  rowLabel: {
    color: "#8B7FE8",
    fontSize: 12,
    fontWeight: "600",
    width: 20,
  },
  seatsInRow: {
    flexDirection: "row",
    gap: 4,
    flex: 1,
  },
  seat: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  seatIcon: {
    color: "#8B7FE8",
    fontSize: 14,
  },
  seatIconReserved: {
    color: "#666",
  },
  seatIconSelected: {
    color: "#E8254F",
  },
  seatReserved: {
    opacity: 0.3,
  },
  seatSelected: {
    backgroundColor: "rgba(232, 37, 79, 0.15)",
    borderRadius: 4,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1c1d29",
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendIcon: {
    fontSize: 12,
  },
  legendText: {
    color: "#999",
    fontSize: 12,
  },
  priceCard: {
    backgroundColor: "#1c1d29",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#8B7FE8",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    color: "#999",
    fontSize: 13,
  },
  priceValue: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  totalLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  totalValue: {
    color: "#E8254F",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 12,
  },
  seatsDisplay: {
    backgroundColor: "#1c1d29",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  seatsDisplayLabel: {
    color: "#8B7FE8",
    fontSize: 12,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#666",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButton: {
    flex: 1,
    backgroundColor: "#E8254F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  proceedButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});