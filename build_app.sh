#!/bin/bash

echo "[*] Starting ./build_app.sh script..."
cd client/
npm run build
cd ../
cp -r audio/ client/build/audio/
echo "[*] ./build_app.sh finished..."
