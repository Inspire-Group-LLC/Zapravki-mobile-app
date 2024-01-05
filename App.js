import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native"; // Import Image component
import MapView, { Marker, Callout } from "react-native-maps";

export default function App() {
  const apiUrl = "http://24.199.110.105:8500/api";
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
    <View style={styles.container}>
      <MapView
        style={{ height: "100%", width: "100%" }}
        initialRegion={{
          latitude: 41.310878,
          longitude: 69.279292,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {dataFromUrl &&
          dataFromUrl.map((item) => (
            // image - http://24.199.110.105:8500/logos/academic_fyORpL5.png
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            >
              <Callout style={{ width: 150, height: 300 }} >
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Text>{item.name}</Text>
                  <Text>{item.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
});
