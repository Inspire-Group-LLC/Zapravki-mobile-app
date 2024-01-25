import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { Languages } from "../AllStations/Languages";
import { Ionicons } from "@expo/vector-icons";

export default function GasCard(props) {
  const { gasoline } = props;
  const { language } = props;
  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(gasoline.price);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <View style={styles.cardGazIcon}>
          <Ionicons
            name="water-outline"
            size={19}
            color="white"
            style={styles.mapTypeButtonText}
          />
          <Text style={styles.cardTitle}>{gasoline.name}</Text>
        </View>
        <View style={styles.cardTextContainer}>
          <Text style={styles.price}>{Languages[language].price}: {formattedPrice} UZS</Text>
        </View>
      </View>
      <View style={styles.origin}>
        <Text style={styles.originText}>{Languages[language].origin}: {gasoline.origin}</Text>
        <View style={styles.originWrapper}>
          {gasoline.available ? (
            <>
              <Text style={styles.availablityText}>{Languages[language].available}</Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="lightgreen"
                style={styles.iconAvailability}
              />
            </>
          ) : (
            <>
              <Text style={styles.availablityText}>{Languages[language].notAvailable}</Text>
              <Ionicons
                name="close-circle-outline"
                size={19}
                color="red"
                style={styles.iconAvailability}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    borderColor: "#4CA4FE",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
  iconAvailability: {
    marginLeft: 5,
    marginTop: 3,
  },
  availablityText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "normal",
  },
  cardGazIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginRight: 16,
  },
  price: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    objectFit: "contain",
  },
  cardTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
    marginLeft: 5,
  },
  originText: {
    fontSize: 14,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  originWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  origin: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
});
