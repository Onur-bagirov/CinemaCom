import React, { useState, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker, Region } from "react-native-maps";
import { useRouter } from "expo-router";

const cinemas = [
  {
    id: 1,
    name: "CinemaMax Downtown",
    address: "123 Main Street, Downtown",
    distance: 2.3,
    rating: 4.8,
    screens: 8,
    lat: 40.7128,
    lng: -74.0060,
    image: "🎬",
  },
  {
    id: 2,
    name: "PremiumScreen Central",
    address: "456 Park Avenue, Central",
    distance: 5.1,
    rating: 4.6,
    screens: 12,
    lat: 40.7580,
    lng: -73.9855,
    image: "🎭",
  },
  {
    id: 3,
    name: "StarCinema North",
    address: "789 Oak Road, North District",
    distance: 7.8,
    rating: 4.5,
    screens: 10,
    lat: 40.8088,
    lng: -73.9282,
    image: "⭐",
  },
  {
    id: 4,
    name: "Mega Multiplex South",
    address: "321 River Lane, South Zone",
    distance: 9.2,
    rating: 4.7,
    screens: 15,
    lat: 40.6892,
    lng: -74.0445,
    image: "🎪",
  },
  {
    id: 5,
    name: "CineGold Elite",
    address: "654 Sunset Boulevard, West",
    distance: 11.5,
    rating: 4.9,
    screens: 6,
    lat: 40.7614,
    lng: -74.0055,
    image: "👑",
  },
];

const initialRegion: Region = {
  latitude: 40.7300,
  longitude: -73.9600,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

export default function CinemasScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCinemas, setFilteredCinemas] = useState(cinemas);
  const [filterType, setFilterType] = useState<"distance" | "rating" | "screens" | null>(null);
  const [selectedMapCinema, setSelectedMapCinema] = useState<number | null>(null);

  React.useEffect(() => {
    const query = search.toLowerCase().trim();

    let filtered = cinemas.filter(
      (cinema) =>
        cinema.name.toLowerCase().includes(query) ||
        cinema.address.toLowerCase().includes(query)
    );

    if (filterType === "distance") {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (filterType === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filterType === "screens") {
      filtered.sort((a, b) => b.screens - a.screens);
    }

    setFilteredCinemas(filtered);
  }, [search, filterType]);

  const handleSearch = (text: string) => {
    setSearch(text);
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setSearch("");
    setSelectedCinema(null);
  };

  const moveMapTo = (latitude: number, longitude: number, cinemaId: number) => {
    setSelectedMapCinema(cinemaId);
    const nextRegion: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    requestAnimationFrame(() => {
      mapRef.current?.animateToRegion(nextRegion, 500);
    });

    setTimeout(() => {
      mapRef.current?.animateToRegion(nextRegion, 350);
      mapRef.current?.fitToCoordinates([{ latitude, longitude }], {
        edgePadding: { top: 120, right: 40, bottom: 40, left: 40 },
        animated: true,
      });
    }, 100);
  };

  if (showMap) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            {cinemas.map((cinema) => (
              <Marker
                key={cinema.id}
                coordinate={{
                  latitude: cinema.lat,
                  longitude: cinema.lng,
                }}
                title={cinema.name}
                description={cinema.address}
                pinColor={selectedMapCinema === cinema.id ? "#E8254F" : "#8B7FE8"}
              />
            ))}
          </MapView>

          <TouchableOpacity
            style={styles.backButtonMap}
            onPress={() => setShowMap(false)}
          >
            <LinearGradient
              colors={["rgba(232, 37, 79, 0.2)", "rgba(139, 127, 232, 0.1)"]}
              style={styles.backIconMap}
            >
              <Ionicons name="arrow-back" size={24} color="#E8254F" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.mapLegend}>
            <Text style={styles.mapLegendTitle}>All Cinemas</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mapLegendScroll}
            >
              {cinemas.map((cinema) => (
                <TouchableOpacity
                  key={cinema.id}
                  style={[
                    styles.mapLegendItem,
                    selectedMapCinema === cinema.id && styles.mapLegendItemActive,
                  ]}
                  onPress={() => moveMapTo(cinema.lat, cinema.lng, cinema.id)}
                >
                  <Text style={styles.mapLegendEmoji}>{cinema.image}</Text>
                  <View style={styles.mapLegendInfo}>
                    <Text style={styles.mapLegendName} numberOfLines={1}>
                      {cinema.name}
                    </Text>
                    <Text style={styles.mapLegendDistance}>{cinema.distance} km</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#0F172A", "#1a1f3a"]} style={{ flex: 1 }}>
        <View style={styles.searchBar} pointerEvents="box-none">
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={18} color="#8B7FE8" />
            <TextInput
              placeholder="Search cinema by name..."
              placeholderTextColor="#666"
              value={search}
              onChangeText={handleSearch}
              returnKeyType="search"
              blurOnSubmit
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.searchInput}
            />
            {search.length > 0 && (
              <Pressable onPress={clearSearch} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color="#E8254F" />
              </Pressable>
            )}
          </View>
          <Pressable
            onPress={() => setShowMap(true)}
            style={styles.mapButton}
            hitSlop={8}
          >
            <Ionicons name="map" size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.filterBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <Pressable
              onPress={() =>
                setFilterType(filterType === "distance" ? null : "distance")
              }
              style={[
                styles.filterBtn,
                filterType === "distance" && styles.filterBtnActive,
              ]}
            >
              <Ionicons
                name="funnel"
                size={14}
                color={filterType === "distance" ? "#fff" : "#E8254F"}
              />
              <Text
                style={[
                  styles.filterBtnText,
                  filterType === "distance" && styles.filterBtnTextActive,
                ]}
              >
                Distance
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setFilterType(filterType === "rating" ? null : "rating")
              }
              style={[
                styles.filterBtn,
                filterType === "rating" && styles.filterBtnActive,
              ]}
            >
              <Ionicons
                name="star"
                size={14}
                color={filterType === "rating" ? "#fff" : "#FFD700"}
              />
              <Text
                style={[
                  styles.filterBtnText,
                  filterType === "rating" && styles.filterBtnTextActive,
                ]}
              >
                Rating
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setFilterType(filterType === "screens" ? null : "screens")
              }
              style={[
                styles.filterBtn,
                filterType === "screens" && styles.filterBtnActive,
              ]}
            >
              <Ionicons
                name="film"
                size={14}
                color={filterType === "screens" ? "#fff" : "#B565D8"}
              />
              <Text
                style={[
                  styles.filterBtnText,
                  filterType === "screens" && styles.filterBtnTextActive,
                ]}
              >
                Screens
              </Text>
            </Pressable>
          </ScrollView>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredCinemas.length > 0 ? (
            <View>
              <Text style={styles.resultsTitle}>
                {filteredCinemas.length}{" "}
                {filteredCinemas.length === 1 ? "Cinema" : "Cinemas"}
              </Text>
              <FlatList
                data={filteredCinemas}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <LinearGradient
                    colors={["rgba(28, 29, 41, 0.8)", "rgba(91, 111, 232, 0.05)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.cinemaCard,
                      {
                        marginBottom:
                          index !== filteredCinemas.length - 1 ? 12 : 0,
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedCinema(
                          selectedCinema === item.id ? null : item.id
                        )
                      }
                      style={styles.cinemaCardContent}
                    >
                      <View style={styles.cinemaImageBox}>
                        <LinearGradient
                          colors={["#5B6FE8", "#B565D8"]}
                          style={styles.cinemaImage}
                        >
                          <Text style={styles.cinemaEmoji}>{item.image}</Text>
                        </LinearGradient>
                      </View>

                      <View style={styles.cinemaInfo}>
                        <Text style={styles.cinemaName}>{item.name}</Text>
                        <View style={styles.cinemaRow}>
                          <Ionicons
                            name="location-outline"
                            size={12}
                            color="#999"
                          />
                          <Text style={styles.cinemaAddress}>
                            {item.address}
                          </Text>
                        </View>
                        <View style={styles.cinemaDetailsRow}>
                          <View style={styles.cinemaDetail}>
                            <Ionicons
                              name="navigate"
                              size={12}
                              color="#8B7FE8"
                            />
                            <Text style={styles.detailText}>
                              {item.distance} km
                            </Text>
                          </View>
                          <View style={styles.cinemaDetail}>
                            <Ionicons
                              name="star"
                              size={12}
                              color="#FFD700"
                            />
                            <Text style={styles.detailText}>{item.rating}</Text>
                          </View>
                          <View style={styles.cinemaDetail}>
                            <Ionicons
                              name="film"
                              size={12}
                              color="#B565D8"
                            />
                            <Text style={styles.detailText}>
                              {item.screens} screens
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.expandIcon}>
                        <Ionicons
                          name={
                            selectedCinema === item.id
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={20}
                          color="#E8254F"
                        />
                      </View>
                    </TouchableOpacity>

                    {selectedCinema === item.id && (
                      <View style={styles.cinemaExpanded}>
                        <View style={styles.divider} />
                        <View style={styles.expandedInfo}>
                          <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>
                              Opening Hours
                            </Text>
                            <Text style={styles.infoValue}>
                              10:00 AM - 11:00 PM
                            </Text>
                          </View>
                          <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Phone</Text>
                            <Text style={styles.infoValue}>
                              +1 (555) 123-4567
                            </Text>
                          </View>
                          <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Facilities</Text>
                            <View style={styles.facilities}>
                              <View style={styles.facility}>
                                <Ionicons
                                  name="fast-food-outline"
                                  size={14}
                                  color="#FFD700"
                                />
                                <Text style={styles.facilityText}>Food</Text>
                              </View>
                              <View style={styles.facility}>
                                <Ionicons
                                  name="water"
                                  size={14}
                                  color="#5B6FE8"
                                />
                                <Text style={styles.facilityText}>AC</Text>
                              </View>
                              <View style={styles.facility}>
                                <Ionicons
                                  name="wifi"
                                  size={14}
                                  color="#B565D8"
                                />
                                <Text style={styles.facilityText}>WiFi</Text>
                              </View>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={styles.viewButton}
                            onPress={() => {
                              setShowMap(true);
                              setTimeout(() => {
                                moveMapTo(item.lat, item.lng, item.id);
                              }, 300);
                            }}
                          >
                            <LinearGradient
                              colors={["#E8254F", "#B565D8"]}
                              style={styles.viewButtonGradient}
                            >
                              <Ionicons
                                name="location"
                                size={16}
                                color="#fff"
                              />
                              <Text style={styles.viewButtonText}>
                                View on Map
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </LinearGradient>
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={48} color="#8B7FE8" />
              <Text style={styles.emptyText}>No cinemas found</Text>
              <Text style={styles.emptySubtext}>
                Try searching with different keywords
              </Text>
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
    backgroundColor: "#0F172A",
  },
  searchBar: {
    position: "absolute",
    top: 12,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1d29",
    borderRadius: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(232, 37, 79, 0.2)",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  mapButton: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "#E8254F",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBar: {
    marginTop: 68,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(232, 37, 79, 0.1)",
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#1c1d29",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(232, 37, 79, 0.1)",
  },
  filterBtnActive: {
    backgroundColor: "#E8254F",
    borderColor: "#E8254F",
  },
  filterBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  filterBtnTextActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  resultsTitle: {
    color: "#8B7FE8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cinemaCard: {
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(232, 37, 79, 0.1)",
    overflow: "hidden",
  },
  cinemaCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  cinemaImageBox: {
    borderRadius: 12,
    overflow: "hidden",
  },
  cinemaImage: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  cinemaEmoji: {
    fontSize: 32,
  },
  cinemaInfo: {
    flex: 1,
    gap: 6,
  },
  cinemaName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  cinemaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cinemaAddress: {
    color: "#999",
    fontSize: 11,
  },
  cinemaDetailsRow: {
    flexDirection: "row",
    gap: 12,
  },
  cinemaDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    color: "#8B7FE8",
    fontSize: 11,
    fontWeight: "600",
  },
  expandIcon: {
    padding: 4,
  },
  cinemaExpanded: {
    backgroundColor: "rgba(91, 111, 232, 0.05)",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(232, 37, 79, 0.1)",
  },
  expandedInfo: {
    padding: 14,
    gap: 12,
  },
  infoRow: {
    gap: 4,
  },
  infoLabel: {
    color: "#8B7FE8",
    fontSize: 12,
    fontWeight: "600",
  },
  infoValue: {
    color: "#fff",
    fontSize: 13,
  },
  facilities: {
    flexDirection: "row",
    gap: 12,
  },
  facility: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(232, 37, 79, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  facilityText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  viewButton: {
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
  },
  viewButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 12,
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  emptySubtext: {
    color: "#999",
    fontSize: 13,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
  backButtonMap: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backIconMap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  mapLegend: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0F172A",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(232, 37, 79, 0.1)",
    maxHeight: 140,
  },
  mapLegendTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  mapLegendScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  mapLegendItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1d29",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(232, 37, 79, 0.1)",
    minWidth: 150,
  },
  mapLegendItemActive: {
    backgroundColor: "rgba(232, 37, 79, 0.15)",
    borderColor: "#E8254F",
  },
  mapLegendEmoji: {
    fontSize: 20,
  },
  mapLegendInfo: {
    flex: 1,
  },
  mapLegendName: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  mapLegendDistance: {
    color: "#8B7FE8",
    fontSize: 10,
  },
});