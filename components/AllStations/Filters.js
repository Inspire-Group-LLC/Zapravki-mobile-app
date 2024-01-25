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

export default function Filters({ route, navigation }) {
  const { dataFromUrl } = route.params;
  const { language } = route.params;

  const getNearestGasStation = async () => {
    navigation.navigate("AllStations", {
      dataFromUrl: dataFromUrl,
      routeTitle: Languages[language].nearestGasStations,
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
          <View style={styles.nearestbyTypeContainer}></View>
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
  nearestbyTypeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
