# Atlas Staff Mobile App

This directory will hold the code for a mobile application used by on-site staff members. The goal is to provide an easy way for the team to manage day to day tasks such as guest check-ins, housekeeping and maintenance logging.

The app will consume the same API used by the admin portal and guest website. Development will start with React Native using the Expo tooling.

## Setup

1. Install the latest [Node.js](https://nodejs.org/) LTS release.
2. Install the Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```
3. From this directory, install project dependencies:
   ```bash
   npm install
   ```

## Development

- Start the development server and open the Expo app on a device or simulator:
  ```bash
  npm start
  ```
- To run on Android emulator directly:
  ```bash
  npm run android
  ```
- To run on iOS simulator (macOS only):
  ```bash
  npm run ios
  ```

The initial implementation does not yet exist. These commands are provided for when the React Native project is added.
