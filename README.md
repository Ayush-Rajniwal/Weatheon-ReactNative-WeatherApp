# Weatheon - React Native Weather App

<p align="center">
 <img width="200" heigh="500" src="./static/preview.gif">
</p>

## Download link

- Android

## About App

- Current weather of any valid city. The Weather update include current temperature, humidity and wind speed.
- It uses **openweathermap API** for fething current weather.
- Tap on `Location name` to change the city.
- Double tap to refresh the data.
- Remeber your last search, on closing the app.

## How to build and test

1. Clone the repo.
2. `npm install` to install dependencies.
3. Open `Main.js` in `components` folder.
4. Assign your `openweathermap API key` to `const API_KEY`. Get it from [here](https://openweathermap.org/).
5. `npm run` to test.
6. `expo build:android` to build for android. (You can definitely build for iOS as well but I haven't tested).
