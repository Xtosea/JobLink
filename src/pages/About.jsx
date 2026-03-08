// src/pages/About.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function About({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About JobLink</Text>

      <Text style={styles.paragraph}>
        <Text style={{ fontWeight: "bold" }}>JobLink</Text> is a career support platform designed to help job seekers find suitable employment opportunities through guidance, preparation, and professional support.
      </Text>

      <Text style={styles.paragraph}>
        Many applicants struggle not because they lack skills, but because they lack proper CVs, interview preparation, and access to job opportunities. JobLink bridges this gap by supporting applicants from application to interview readiness.
      </Text>

      <Text style={styles.subheading}>What We Do</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>• Collect and review submitted CVs</Text>
        <Text style={styles.listItem}>• Update or create professional CVs</Text>
        <Text style={styles.listItem}>• Search and apply for suitable jobs on behalf of applicants</Text>
        <Text style={styles.listItem}>• Train applicants on interview preparation</Text>
        <Text style={styles.listItem}>• Provide structured job-hunting support</Text>
      </View>

      <Text style={styles.subheading}>How It Works</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>1. Applicants submit their CV and application</Text>
        <Text style={styles.listItem}>2. An auto-response email is sent with instructions</Text>
        <Text style={styles.listItem}>3. Applicants submit proof of payment and CV</Text>
        <Text style={styles.listItem}>4. JobLink reviews or creates the CV</Text>
        <Text style={styles.listItem}>5. We begin job hunting and interview preparation</Text>
      </View>

      <Text style={styles.subheading}>Our Goal</Text>
      <Text style={styles.paragraph}>
        Our goal is to reduce unemployment stress by helping applicants present themselves professionally and prepare confidently for interviews.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.buttonText}>View Privacy Policy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subheading: { fontSize: 20, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 16, marginBottom: 10, lineHeight: 22 },
  list: { marginLeft: 10, marginBottom: 10 },
  listItem: { fontSize: 16, marginBottom: 5 },
  button: { marginTop: 20, backgroundColor: "#0a47d0", padding: 12, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
});