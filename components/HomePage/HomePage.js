import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import FuelStationSvg from "../../assets/png/fuel-station.png";
import Logo from "../../assets/png/logo.png";
import Loader from "../../assets/loader.gif";
import * as Location from "expo-location";
import axios from "axios";

export default function HomePage({ navigation }) {
  const [dataFromUrl, setDataFromUrl] = useState("");

  const getNearestGasStation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      const response = await axios.get(
        `https://avtoenergy-admin.uz/api/closest/${currentLocation.coords.latitude}/${currentLocation.coords.longitude}`
      );
      setDataFromUrl(response.data);
      navigation.navigate("AllStations", {
        dataFromUrl: response.data,
      });
      
      global.AllStations = response.data;
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNearestGasStation();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image source={FuelStationSvg} style={styles.previewImage} />
        <View style={styles.buttonsWrapper}>
          {dataFromUrl ? (
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("AllStations", { dataFromUrl })
              }
            >
              <Text style={styles.buttonText}>Все заправки</Text>
            </Pressable>
          ) : (
            <Image source={Loader} style={{ width: 50, height: 50 }} />
          )}
        </View>
        <Text style={styles.heading}>
          Самая большая карта {"\n"}
          заправок в Узбекистане
        </Text>
        <Text style={styles.footerText}>avtoenergy.uz</Text>
        <Image source={Logo} style={styles.logo} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
    backgroundColor: "#2F2F2F",
    position: "relative",
  },
  footerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    bottom: 50,
    left: 43,
  },
  logo: {
    maxWidth: 200,
    height: 40,
    objectFit: "contain",
    position: "absolute",
    bottom: 43,
    right: 0,
  },
  previewImage: {
    maxWidth: "100%",
    maxWidth: 300,
    maxHeight: 300,
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  paragraph: {
    color: "#EFEFEF",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  buttonsWrapper: {
    marginTop: 50,
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    width: 150,
    height: 50,
    backgroundColor: "#0094FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
