import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Languages } from "../AllStations/Languages";
import { Ionicons } from "@expo/vector-icons";

export default function MapRoot({ route, navigation }) {
  const { dataFromUrl } = route.params;
  const { language } = route.params;
  
  const [mapType, setMapType] = useState("standard");
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(true);

  const [region, setRegion] = useState({
    latitude: 41.310878,
    longitude: 69.279292,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationPermissionVisible(true); // Show the button
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      });

      setLocationPermissionVisible(false);
    } catch (error) {
      setLocationPermissionVisible(true);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  const toggleMapType = () => {
    setMapType(mapType === "standard" ? "hybrid" : "standard");
  };

  const handleUserLocationChange = (event) => {
    if (event.nativeEvent.coordinate) {
      setLocationPermissionVisible(false);
    } else {
      setLocationPermissionVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      {dataFromUrl && dataFromUrl.length > 0 && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          showsIndoors={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          minZoomLevel={2}
          maxZoomLevel={20}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={true}
          showsBuildings={true}
          showsIndoorLevelPicker={true}
          showsPointsOfInterest={true}
          userLocationUpdateInterval={1000}
          tintColor="#666666"
          mapType={mapType}
          onUserLocationChange={handleUserLocationChange}
        >
          {dataFromUrl.map((station) => (
            <Marker
              key={station.id}
              coordinate={{
                latitude: parseFloat(station.latitude),
                longitude: parseFloat(station.longitude),
              }}
              title={station.name}
              description={station.address}
            >
              <Callout>
                <View>
                  <Text>{station.name}</Text>
                  <Text>{station.address}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
        <Ionicons
          name="layers"
          size={19}
          color="black"
          style={styles.mapTypeButtonText}
        />
      </TouchableOpacity>
      {locationPermissionVisible && (
        <TouchableOpacity
          style={styles.locationPermissionButton}
          onPress={getLocationAsync}
        >
          <Text style={styles.locationPermissionButtonText}>
            {Languages[language].locationPermission}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 40,
    backgroundColor: "#000",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  mapTypeButton: {
    position: "absolute",
    bottom: 102,
    right: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  mapTypeButtonText: {
    fontWeight: "bold",
  },
  locationPermissionButton: {
    position: "absolute",
    bottom: 15,
    left: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  locationPermissionButtonText: {
    fontWeight: "bold",
  },
});
