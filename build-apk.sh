#!/bin/bash
# ===============================================
# build-apk.sh - Termux-friendly JobLink APK build
# ===============================================

echo "🚀 Starting JobLink APK build..."

# 1️⃣ Check Node version
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"
if [[ "$NODE_VERSION" < "v22" ]]; then
  echo "❌ Node 22+ is required"
  exit 1
fi

# 2️⃣ Clean old dependencies & reinstall
echo "📦 Installing npm dependencies..."
rm -f package-lock.json
npm install

# 3️⃣ Set Gradle memory options (Termux/low RAM)
echo "⚙️ Configuring Gradle for low-RAM..."
cat > android/gradle.properties <<EOL
org.gradle.jvmargs=-Xmx4096m -Dfile.encoding=UTF-8 -XX:+HeapDumpOnOutOfMemoryError
org.gradle.parallel=false
org.gradle.workers.max=1
android.useAndroidX=true
android.enableAapt2Daemon=false
EOL

# 4️⃣ Clean previous Gradle builds
echo "🧹 Cleaning previous builds..."
cd android
chmod +x gradlew
./gradlew clean --no-daemon

# 5️⃣ Build APK with reduced workers
echo "🏗️ Building release APK..."
./gradlew assembleRelease --no-daemon --max-workers=1 --stacktrace

# 6️⃣ Check for APK
APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
  echo "✅ APK successfully built at: $APK_PATH"
else
  echo "❌ Build failed. Check Gradle output above."
fi
