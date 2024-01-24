import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import StationCard from "./StationCard";
import FiltersIcon from "../../assets/png/filters.png";

export default function AllStations({ route, navigation }) {
  const { dataFromUrl } = route.params;

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.containerWrapper}>
          <View style={styles.filters}>
            <Text style={styles.heading}>Все Заправки</Text>
            <Image source={FiltersIcon} style={styles.filterIconStyles} />
          </View>
          {dataFromUrl &&
            dataFromUrl.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("StationDetails", {
                      dataFromUrl,
                      item,
                    })
                  }
                >
                  <StationCard item={item} />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <TouchableOpacity
          style={styles.showOnMapButton}
          onPress={() => navigation.navigate("MapRoot", { dataFromUrl })}
        >
          <Text style={styles.buttonText}>Показать на карте</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
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
