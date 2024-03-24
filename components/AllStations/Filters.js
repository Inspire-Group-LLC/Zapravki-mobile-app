import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Languages } from "../AllStations/Languages";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios'; 

export default function Filters({ route, navigation }) {
  const cheapestFuelGasStationsUrl =
    "https://avtoenergy-admin.uz/api/cheapest/";
  const { dataFromUrl } = route.params;
  const { language } = route.params;
  const [pressedOrigin, setPressedOrigin] = useState("");

  const getNearestGasStation = async () => {
    navigation.navigate("AllStations", {
      dataFromUrl: global.AllStations,
      routeTitle: Languages[language].nearestGasStations,
    });
  };

  const getCheapestGasStation = async (fuelType) => {
    const response = await axios.get(
      cheapestFuelGasStationsUrl +
        fuelType +
        (pressedOrigin ? "?origin=" + pressedOrigin : "")
    );
    navigation.navigate("AllStations", {
      dataFromUrl: response.data,
      routeTitle: pressedOrigin
        ? fuelType + " - " + pressedOrigin
        : Languages[language].cheapestGasStations + fuelType,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.containerWrapper}>
          <View style={styles.filters}>
            <Text style={styles.heading}>{Languages[language].filters}</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AllStations", {
                  dataFromUrl,
                })
              }
            >
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="white"
                style={styles.backButton}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.filterCard}
            onPress={getNearestGasStation}
          >
            <Text style={styles.filterCardText}>
              {Languages[language].nearestGasStations}
            </Text>
          </TouchableOpacity>

          <View style={styles.cheapestByTypeContainer}>
            <View style={styles.filters}>
              <Text style={styles.heading}>{Languages[language].cheapestByType}</Text>

              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="white"
                style={styles.bottomArrow}
              />
            </View>
            <View style={styles.cheapestByTypeCardsContainer}>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("AI-80")}
              >
                <Text style={styles.filterCardText}>AI-80</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("AI-91")}
              >
                <Text style={styles.filterCardText}>AI-91</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("AI-92")}
              >
                <Text style={styles.filterCardText}>AI-92</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("AI-95")}
              >
                <Text style={styles.filterCardText}>AI-95</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("AI-98")}
              >
                <Text style={styles.filterCardText}>AI-98</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("DT")}
              >
                <Text style={styles.filterCardText}>DT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("METAN")}
              >
                <Text style={styles.filterCardText}>METAN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("PROPAN")}
              >
                <Text style={styles.filterCardText}>PROPAN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cheapestByTypeCard}
                onPress={() => getCheapestGasStation("ELECTRO")}
              >
                <Text style={styles.filterCardText}>ELECTRO</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cheapestByTypeContainer}>
            <View style={styles.filters}>
              <Text style={styles.heading}>{Languages[language].origin}</Text>

              <Ionicons
                name="arrow-back-outline"
                size={30}
                color="white"
                style={styles.bottomArrow}
              />
            </View>
            <View style={styles.cheapestByTypeCardsContainer}>
              <TouchableOpacity
                style={[
                  styles.originCard,
                  pressedOrigin === "Qozoqiston" && styles.activeOriginCard,
                ]}
                onPress={() => setPressedOrigin("Qozoqiston")}
              >
                <Text style={styles.filterCardText}>Казахстан</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.originCard,
                  pressedOrigin === "Rossiya" && styles.activeOriginCard,
                ]}
                onPress={() => setPressedOrigin("Rossiya")}
              >
                <Text style={styles.filterCardText}>Россия</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.originCard,
                  pressedOrigin === "Buxoro" && styles.activeOriginCard,
                ]}
                onPress={() => setPressedOrigin("Buxoro")}
              >
                <Text style={styles.filterCardText}>Бухара</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.originCard,
                  pressedOrigin === "Surxondaryo" && styles.activeOriginCard,
                ]}
                onPress={() => setPressedOrigin("Surxondaryo")}
              >
                <Text style={styles.filterCardText}>Сурхандарья</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.originCard,
                  pressedOrigin === "Navoiy" && styles.activeOriginCard,
                ]}
                onPress={() => setPressedOrigin("Navoiy")}
              >
                <Text style={styles.filterCardText}>Навои</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#2F2F2F",
    paddingTop: 40,
    flex: 1,
    height: "100%",
  },
  filters: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  cheapestByTypeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cheapestByTypeCardsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  cheapestByTypeCard: {
    width: "48%",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  originCard: {
    width: "48%",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  activeOriginCard: {
    backgroundColor: "#0094FF",
    color: "#fff",
  },
  filterCardText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  filterCard: {
    width: "100%",
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  filterIconStyles: {
    width: 21,
    height: 21,
    objectFit: "cover",
  },
  heading: {
    fontSize: 22,
    color: "white",
  },
  containerWrapper: {
    paddingHorizontal: 20,
    height: "100%",
  },
  backButton: {
    paddingTop: 5,
  },
  bottomArrow: {
    paddingTop: 5,
    transform: [{ rotate: "-90deg" }],
  },
  showOnMapButton: {
    backgroundColor: "#0094FF",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});
