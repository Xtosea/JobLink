// src/pages/PrivacyPolicy.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://yourusername.github.io/JobLink-Privacy/" }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});