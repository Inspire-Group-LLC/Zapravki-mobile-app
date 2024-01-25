import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { Languages } from "./Languages";

export default function StationCard(props) {
  const { item } = props;
  const { language } = props;
  const [distance, setDistance] = useState(0);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLogoContainer}>
        <Image
          style={styles.cardImage}
          source={{ uri: `${props.item.logo}` }}
        />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{props.item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            {!props.item.rating ? "5.0" : props.item.rating} / 5
          </Text>
          <Ionicons
            name="star"
            size={15}
            style={styles.ratingIcon}
            color="yellow"
          />
        </View>
        <Text style={styles.distance}>
          {Languages[language].distance} : {item.distance} km
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
    height: 132,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderColor: "#4CA4FE",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    objectFit: "cover",
    // objectFit: "contain",
  },
  cardTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "100%",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
    paddingRight: 16,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  ratingIcon: {
    marginLeft: 5,
  },
  distance: {
    fontSize: 16,
    color: "#CCCCCC",
  }
});
