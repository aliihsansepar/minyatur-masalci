import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import Navigation from "./src/navigation";
import { COLORS } from "./src/constants/theme";

// Geliştirme sırasındaki bazı uyarıları görmezden geliyoruz
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.kidsPrimary} />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.kidsBackground,
  },
});
