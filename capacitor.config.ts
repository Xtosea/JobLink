import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xtosea.joblink',          // Your unique app ID (reverse domain style)
  appName: 'JobLink',                   // App name shown on device
  webDir: 'build',                      // React output folder
  bundledWebRuntime: false,             // Leave false for React apps
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,        // Show splash for 3 seconds
      launchAutoHide: true,             // Automatically hide after launchShowDuration
      backgroundColor: '#ffffff',       // Splash background color
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  server: {
    androidScheme: 'https',            // Ensures proper asset loading on Android
  }
};

export default config;