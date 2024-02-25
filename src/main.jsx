import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./utils/stateProvider";
import reducer, { initialState } from "./utils/reducer";
import { BrowserRouter } from "react-router-dom";

const script = document.createElement("script");
script.id = "spotify-player1";
script.type = "text/javascript";
script.async = "async";
script.defer = "defer";
script.src = "https://sdk.scdn.co/spotify-player.js";
document.head.appendChild(script);
script.onload = window.onSpotifyWebPlaybackSDKReady = () => {};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>
);
