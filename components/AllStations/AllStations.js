import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import StationCard from "./StationCard";
import FiltersIcon from "../../assets/png/filters.png";

export default function AllStations() {
  const apiUrl = "http://24.199.110.105:8500/api/";
  const [dataFromUrl, setDataFromUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setDataFromUrl(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.containerWrapper}>
          <View style={styles.filters}>
            <Text style={styles.heading}>Ближайшие Заправки</Text>
            <Image source={FiltersIcon} style={styles.filterIconStyles} />
          </View>
          {
            dataFromUrl && dataFromUrl.map((item, index) => {
              return (
                <StationCard key={index} item={item}/>
              )
            })
          }
          
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#2F2F2F",
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
});
