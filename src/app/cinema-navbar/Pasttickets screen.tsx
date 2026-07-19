import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface PastTicket {
  id: string;
  movieTitle: string;
  date: string;
  time: string;
  seats: string;
  totalPrice: number;
  status: "used" | "expired";
  watchedDate: string;
}

export default function PastTicketsScreen() {
  const [pastTickets, setpastTickets] = useState<PastTicket[]>([
    {
      id: "P001",
      movieTitle: "Inception",
      date: "Dec 10, 2024",
      time: "7:00 PM",
      seats: "E2, E3",
      totalPrice: 500,
      status: "used",
      watchedDate: "Dec 10, 2024",
    },
    {
      id: "P002",
      movieTitle: "Titanic",
      date: "Nov 28, 2024",
      time: "6:00 PM",
      seats: "F1, F2, F3",
      totalPrice: 750,
      status: "used",
      watchedDate: "Nov 28, 2024",
    },
    {
      id: "P003",
      movieTitle: "Dune",
      date: "Nov 15, 2024",
      time: "8:00 PM",
      seats: "C4",
      totalPrice: 250,
      status: "expired",
      watchedDate: "Expired",
    },
  ]);

  const renderPastTicket = ({ item }: { item: PastTicket }) => (
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
        <View style={[styles.statusBadge, item.status === "used" ? styles.statusUsed : styles.statusExpired]}>
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
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Watched:</Text>
          <Text style={styles.detailValue}>{item.watchedDate}</Text>
        </View>
      </View>

      <View style={styles.ticketFooter}>
        <TouchableOpacity style={styles.viewBtn}>
          <Ionicons name="eye" size={16} color="#fff" />
          <Text style={styles.viewBtnText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rateBtn}>
          <Ionicons name="star" size={16} color="#fff" />
          <Text style={styles.rateBtnText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Past Tickets</Text>
        <Text style={styles.count}>{pastTickets.length} History</Text>
      </View>

      {pastTickets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="history" size={48} color="#999" />
          <Text style={styles.emptyText}>No past tickets</Text>
        </View>
      ) : (
        <FlatList
          data={pastTickets}
          renderItem={renderPastTicket}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#1c1d29",
  },
  title: {
    color: "#fff",
    fontSize: 20,
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
    borderColor: "#333",
    opacity: 0.8,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusUsed: {
    backgroundColor: "#666",
  },
  statusExpired: {
    backgroundColor: "#999",
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
  viewBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#5B6FE8",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  viewBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  rateBtn: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#B565D8",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  rateBtnText: {
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