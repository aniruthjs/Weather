import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "d372483819msh8928364f8d4f599p12f155jsn45e5245c9b31", // Replace with your RapidAPI key
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      setTemperature(response.data.current.temp_c.toString());
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Button title="Get Weather" onPress={getWeather} />
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>{temperature}</Text>
        <Text style={styles.unit}>°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  temperatureContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 18,
    marginLeft: 5,
  },
});
