// src/navigation/AppNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />

      {/* 🆕 Jobs Flow */}
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ title: "Job Details" }}
      />

      <Stack.Screen name="About" component={About} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ title: "Privacy Policy" }}
      />
    </Stack.Navigator>
  );
}