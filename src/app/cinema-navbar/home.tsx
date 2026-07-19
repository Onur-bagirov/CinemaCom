import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8, poster: require("../../../assets/images/Image/Inception.jpg"), time: "7:00 PM", language: "English", price: 250, skills: ["2D", "3D", "IMAX"] },
  { id: 2, title: "Avatar", genre: "Adventure", rating: 7.8, poster: require("../../../assets/images/Image/Avatar.jpg"), time: "9:30 PM", language: "English", price: 300, skills: ["3D", "IMAX", "4K"] },
  { id: 3, title: "Titanic", genre: "Romance", rating: 7.8, poster: require("../../../assets/images/Image/Titanic.jpg"), time: "6:00 PM", language: "English", price: 280, skills: ["2D", "HD"] },
  { id: 4, title: "Dune", genre: "Sci-Fi", rating: 8.0, poster: require("../../../assets/images/Image/Dune.jpg"), time: "8:00 PM", language: "English", price: 320, skills: ["3D", "IMAX", "4K", "Dolby Atmos"] },
  { id: 5, title: "The Dark Knight", genre: "Action", rating: 9.0, poster: require("../../../assets/images/Image/The Dark and Kignght.jpg"), time: "7:30 PM", language: "English", price: 270, skills: ["2D", "HD", "Dolby Atmos"] },
  { id: 6, title: "Interstellar", genre: "Sci-Fi", rating: 8.6, poster: require("../../../assets/images/Image/interstellar.jpg"), time: "8:30 PM", language: "English", price: 290, skills: ["IMAX", "4K", "Dolby Atmos"] },
  { id: 7, title: "Oppenheimer", genre: "Biography", rating: 8.5, poster: require("../../../assets/images/Image/oppenheimer.jpg"), time: "6:30 PM", language: "English", price: 260, skills: ["2D", "4K", "HD"] },
  { id: 8, title: "Barbie", genre: "Comedy", rating: 7.9, poster: require("../../../assets/images/Image/Barbie.jpg"), time: "7:00 PM", language: "English", price: 240, skills: ["2D", "HD"] },
  { id: 9, title: "Killers of the Flower Moon", genre: "Drama", rating: 8.2, poster: require("../../../assets/images/Image/Killer of the Flower Moon.jpg"), time: "9:00 PM", language: "English", price: 280, skills: ["2D", "4K", "Dolby Atmos"] },
  { id: 10, title: "The Marvels", genre: "Action", rating: 7.1, poster: require("../../../assets/images/Image/The Marvels.jpg"), time: "8:00 PM", language: "English", price: 310, skills: ["3D", "IMAX", "4K"] },
  { id: 11, title: "Past Lives", genre: "Romance", rating: 8.0, poster: require("../../../assets/images/Image/Past Live.jpg"), time: "7:45 PM", language: "English", price: 250, skills: ["2D", "HD"] },
  { id: 12, title: "Killers", genre: "Thriller", rating: 8.4, poster: require("../../../assets/images/Image/Killer.jpg"), time: "8:15 PM", language: "English", price: 270, skills: ["2D", "4K", "Dolby Atmos"] },
  { id: 13, title: "Guardians of the Galaxy", genre: "Action", rating: 8.0, poster: require("../../../assets/images/Image/guardians of the galaxy.jpg"), time: "9:15 PM", language: "English", price: 300, skills: ["3D", "IMAX"] },
  { id: 14, title: "The Nun II", genre: "Horror", rating: 6.5, poster: require("../../../assets/images/Image/The nun 2.jpg"), time: "6:45 PM", language: "English", price: 260, skills: ["2D", "3D", "HD"] },
  { id: 15, title: "Blue Beetle", genre: "Action", rating: 6.3, poster: require("../../../assets/images/Image/Blue Beetle.jpg"), time: "8:45 PM", language: "English", price: 290, skills: ["3D", "IMAX", "4K"] },
];

export default function HomeScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const handleSelectSeats = (movieTitle: string) => {
    router.push({
      pathname: "/seat-selection",
      params: { movieTitle },
    });
  };

  const handleToggleFavorite = (movieId: number) => {
    if (isFavorite(String(movieId))) {
      removeFavorite(String(movieId));
    } else {
      addFavorite(String(movieId));
    }
  };

  const renderMovie = ({ item }: { item: any }) => (
    <View style={styles.movieCard}>
      <Image 
        source={item.poster} 
        style={styles.movieImage}
      />
      <View style={styles.movieInfo}>
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.movieGenre}>{item.genre}</Text>
          </View>
          <TouchableOpacity onPress={() => handleToggleFavorite(item.id)}>
            <Ionicons 
              name={isFavorite(String(item.id)) ? "heart" : "heart-outline"} 
              color={isFavorite(String(item.id)) ? "#E8254F" : "#999"} 
              size={22} 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.movieRating}>
          <Ionicons name="star" color="#FFD700" size={14} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.skillsContainer}>
          {item.skills.map((skill: string, index: number) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Ionicons name="time" color="#8B7FE8" size={14} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detail}>
            <Ionicons name="globe" color="#8B7FE8" size={14} />
            <Text style={styles.detailText}>{item.language}</Text>
          </View>
          <Text style={styles.priceText}>₹{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => handleSelectSeats(item.title)}>
          <Ionicons name="bag" color="#fff" size={18} />
          <Text style={styles.cartButtonText}>Select Seats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome!</Text>
          <Text style={styles.subtitle}>Book movies now</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/cinema-navbar/cart")}>
            <Ionicons name="bag" color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/cinema-navbar/notifications")}>
            <Ionicons name="notifications" color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Now Showing</Text>
        <Text style={styles.movieCount}>{movies.length} Films</Text>
      </View>
      <FlatList
        data={movies}
        scrollEnabled={false}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
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
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: "#999",
    fontSize: 13,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  movieCount: {
    color: "#E8254F",
    fontSize: 12,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  movieCard: {
    flexDirection: "row",
    backgroundColor: "#1c1d29",
    marginHorizontal: 15,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    gap: 12,
  },
  movieImage: {
    width: 90,
    height: 130,
    resizeMode: "cover",
  },
  movieInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },
  movieGenre: {
    color: "#999",
    fontSize: 12,
  },
  movieRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 6,
  },
  ratingText: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "600",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
  },
  skillBadge: {
    backgroundColor: "#5B6FE8",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#8B7FE8",
  },
  skillText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    color: "#8B7FE8",
    fontSize: 11,
  },
  priceText: {
    color: "#E8254F",
    fontWeight: "700",
    marginLeft: "auto",
  },
  cartButton: {
    flexDirection: "row",
    backgroundColor: "#E8254F",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});