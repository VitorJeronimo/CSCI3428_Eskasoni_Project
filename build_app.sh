#!/bin/bash

cd client/
npm run build
cd ../
cp -r audio/ client/build/audio/
