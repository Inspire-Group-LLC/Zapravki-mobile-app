import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
// import MapView, { Marker, Callout } from "react-native-maps";
import HomePage from "./components/HomePage/HomePage";
import AllStations from "./components/AllStations/AllStations";

export default function App() {
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <HomePage isOpen={isOpen} style={styles.homePage} />
      { !isOpen && 
        <View>
          <AllStations />
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  homePage: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  }
});
