import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Lukoil from "../../assets/png/lukoil.png";
import RatingIcon from "../../assets/png/rating.png";

export default function Stationcard(props) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardLogoContainer}>
        <Image style={styles.cardImage} source={{uri: `${props.item.logo}`,} } />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{props.item.name} аааааааааааааааааааааааааааааааааааааааааа</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.5 / 5</Text>
            <Image source={RatingIcon} style={styles.ratingIcon}/>
        </View>
        <Text style={styles.distance}>Растояние : 1.2km </Text>
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
    objectFit: "cover",
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
    textOverflow: "ellipsis",
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
    width: 15,
    height: 15,
    objectFit: "cover",
    marginLeft: 5,
  },
  distance: {
    fontSize: 16,
    color: "#CCCCCC",
  }
});
