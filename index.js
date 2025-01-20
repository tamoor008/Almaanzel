import React from "react";
import { registerRootComponent } from "expo"; // Expo's equivalent to AppRegistry
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

// Wrap your App component with the Redux Provider
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the main component with Expo
registerRootComponent(RNRedux);
