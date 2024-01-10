import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import FiltersIcon from "../../assets/png/filters.png";

export default function AllStations() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.filters}>
          <Text style={styles.heading}>Ближайшие Заправки</Text>
          <Image source={FiltersIcon} style={styles.filterIconStyles}/>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#2F2F2F",
    boxSizing: "border-box",
  },
  filters: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterIconStyles: {
    width: 21,
    height: 21,
    objectFit: "cover",
  },
  heading: {
    fontSize: 22,
    color: "white",
  }
});
