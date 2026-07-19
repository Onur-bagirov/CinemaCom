import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Ticket {
  id: string;
  movieTitle: string;
  date: string;
  time: string;
  seats: string;
  totalPrice: number;
  status: "booked" | "used";
}

export default function TicketsScreen() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T001",
      movieTitle: "Avatar",
      date: "Dec 20, 2024",
      time: "9:30 PM",
      seats: "A3, B2, C5",
      totalPrice: 750,
      status: "booked",
    },
    {
      id: "T002",
      movieTitle: "Oppenheimer",
      date: "Dec 22, 2024",
      time: "7:00 PM",
      seats: "D4, D5",
      totalPrice: 500,
      status: "booked",
    },
  ]);

  const handleCancelTicket = (ticketId: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== ticketId));
  };

  const renderTicket = ({ item }: { item: Ticket }) => (
    <View style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <View>
          <Text style={styles.movieTitle}>{item.movieTitle}</Text>
          <View style={styles.ticketMeta}>
            <Ionicons name="calendar" size={12} color="#8B7FE8" />
            <Text style={styles.metaText}>{item.date}</Text>
            <Ionicons name="time" size={12} color="#8B7FE8" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, item.status === "booked" && styles.statusBooked]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.ticketDivider} />

      <View style={styles.ticketDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Seats:</Text>
          <Text style={styles.detailValue}>{item.seats}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Price:</Text>
          <Text style={styles.detailValue}>₹{item.totalPrice}</Text>
        </View>
      </View>

      <View style={styles.ticketFooter}>
        <TouchableOpacity style={styles.downloadBtn}>
          <Ionicons name="download" size={16} color="#fff" />
          <Text style={styles.downloadBtnText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => handleCancelTicket(item.id)}
        >
          <Ionicons name="trash" size={16} color="#fff" />
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>My Tickets</Text>
        <Text style={styles.count}>{tickets.length} Booked</Text>
      </View>

      {tickets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket" size={48} color="#999" />
          <Text style={styles.emptyText}>No tickets booked</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1c1d29",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  count: {
    color: "#E8254F",
    fontSize: 12,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  ticketCard: {
    backgroundColor: "#1c1d29",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#8B7FE8",
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  ticketMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    color: "#8B7FE8",
    fontSize: 11,
    marginRight: 8,
  },
  statusBadge: {
    backgroundColor: "#E8254F",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBooked: {
    backgroundColor: "#E8254F",
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  ticketDivider: {
    height: 1,
    backgroundColor: "#333",
    marginBottom: 12,
  },
  ticketDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    color: "#999",
    fontSize: 12,
  },
  detailValue: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  ticketFooter: {
    flexDirection: "row",
    gap: 8,
  },
  downloadBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#5B6FE8",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  downloadBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  cancelBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#666",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  cancelBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    marginTop: 12,
  },
});
