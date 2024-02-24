import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Languages } from "../AllStations/Languages";
import GasCard from "./GasCard";
import { PROVIDER_GOOGLE } from "react-native-maps";

export default function StationDetails({ route, navigation }) {
  const { dataFromUrl } = route.params;
  const { language } = route.params;
  const { item } = route.params;
  const [mapHeight, setMapHeight] = useState({
    height: "30%",
    width: "100%",
  });

  const [showMapSettings, setShowMapSettings] = useState(false);

  const [mapType, setMapType] = useState("standard");
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(true);

  const [region, setRegion] = useState({
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.003021,
    longitudeDelta: 0.003021,
  });

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationPermissionVisible(true);
        return;
      }

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

  const makeMapFullHeight = () => {
    setMapHeight({
      height: "100%",
      width: "100%",
    });
    setShowMapSettings(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      {dataFromUrl && dataFromUrl.length > 0 && (
        <MapView
          style={mapHeight}
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={false}
          showsIndoors={true}
          zoomControlEnabled={false}
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
          <Marker
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
            title={item.name}
            description={item.address}
          >
            <Callout>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.address}</Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      )}
      {showMapSettings ? (
        <>
          <TouchableOpacity
            style={styles.mapTypeButton}
            onPress={toggleMapType}
          >
            <Ionicons
              name="layers"
              size={19}
              color="black"
              style={styles.mapTypeButtonText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.showDetailsBtn}
            onPress={() => (
              setMapHeight({ height: "30%", width: "100%" }),
              setShowMapSettings(false)
            )}
          >
            <Text style={styles.buttonText}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.showMap} onPress={makeMapFullHeight}>
            <Text style={styles.buttonText}>
              <Ionicons name="expand-outline" size={30} color="white" />
            </Text>
          </TouchableOpacity>
          <ScrollView style={styles.containerWrapper}>
            <View style={styles.mainInfo}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>{item.name}</Text>
              </View>
              <View style={styles.hoursRatingContainer}>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>
                    {!item.rating ? "5.0" : item.rating} / 5
                  </Text>
                  <Ionicons
                    name="star"
                    size={16}
                    style={styles.ratingIcon}
                    color="yellow"
                  />
                </View>
              </View>
            </View>

            <Text style={styles.subheading}>{item.address}</Text>
            <Text style={styles.workingHours}>
              {Languages[language].openFrom} {item.opens_at} - {item.closes_at}
            </Text>

            {item.gasolines.map((gasoline, index) => {
              return (
                <GasCard language={language} gasoline={gasoline} key={index} />
              );
            })}

            <View style={styles.footerDetails}>
              <View style={styles.contactsTextWrapper}>
                <Text style={styles.contactsText}>
                  {Languages[language].contacts}
                </Text>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  style={styles.infoIcon}
                  color="lightblue"
                />
              </View>
              <View style={styles.phoneNum}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:+998 99 999 99 99`)}
                >
                  <Text style={styles.phoneNumText}>+998 99 999 99 99</Text>
                </TouchableOpacity>
                <Ionicons name="call-outline" size={20} color="lightblue" />
              </View>
              <View style={styles.phoneNum}>
                <Text style={styles.phoneNumText}>
                  {item.address} ({Languages[language].openFrom} {item.opens_at}{" "}
                  - {item.closes_at})
                </Text>
                <Ionicons name="location-outline" size={20} color="lightblue" />
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {locationPermissionVisible && showMapSettings && (
        <TouchableOpacity
          style={styles.locationPermissionButton}
          onPress={getLocationAsync}
        >
          <Text style={styles.locationPermissionButtonText}>
            Отслеживать Геопозицию
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
    paddingTop: 29,
    paddingBottom: 15,
    backgroundColor: "#2F2F2F",
  },
  containerWrapper: {
    paddingHorizontal: 16,
    width: "100%",
  },
  heading: {
    color: "white",
    fontSize: 22,
    textAlign: "left",
    fontWeight: "bold",
    lineHeight: 25,
  },
  subheading: {
    color: "#aaaaaa",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 5,
  },
  workingHours:{
    color: "#aaaaaa",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
  },  
  showDetailsBtn: {
    backgroundColor: "#0094FF",
    position: "absolute",
    top: 40,
    left: 12,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  contactsTextWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  contactsText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  infoIcon: {
    paddingTop: 7,
    marginLeft: 5,
  },
  showMap: {
    backgroundColor: "#0094FF",
    position: "absolute",
    top: 40,
    left: 12,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  mapTypeButton: {
    position: "absolute",
    top: 92,
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
  mainInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 5,
  },
  pricesHeading: {
    width: "100%",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 15,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    width: "70%",
  },
  hoursRatingContainer: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "30%",
  },
  ratingIcon: {
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerDetails: {
    marginTop: 20,
    marginBottom: 20,
    borderTopColor: "white",
    borderTopWidth: 1,
    paddingTop: 20,
  },
  phoneNum: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  phoneNumText: {
    fontSize: 16,
    marginRight: 7,
    color: "#ccc",
    fontWeight: "normal",
  },
});
