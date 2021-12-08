#!/bin/bash
# Author: Vitor Jeronimo (A00431599)

echo "[*] Starting ./build_app.sh script..."

echo "[*] Checking if all npm packages are installed..."
npm install
cd client/
npm install
cd ../

echo "[*] Pulling changes from GitHub..."
git pull

echo "[*] Building React app in client/"
export NODE_OPTIONS=--openssl-legacy-provider
cd client/
npm run build
cd ../

echo "[*] Copying audio folder to client/build/"
cp -r audio/ client/build/audio/

echo "[*] Done"
