/* eslint-disable no-inner-declarations */
import { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";
import { reducerCases } from "../utils/Constants";

export let myPlayer = null;
let state = null;
async function waitUntilUserHasSelectedPlayer(myPlayer) {
  return myPlayer.getCurrentState().then(async (state) => {
    if (state !== null) {
      return state;
    } else {
      return waitUntilUserHasSelectedPlayer(myPlayer);
    }
  });
}
export default function SpotifyPlayer() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    function loadPlayer() {
      const loadScript = async () => {
        // window.onSpotifyWebPlaybackSDKReady = () => {};
        async function waitForSpotifyWebPlaybackSDKToLoad() {
          return new Promise((resolve) => {
            if (window.Spotify) {
              resolve(window.Spotify);
            } else {
              window.onSpotifyWebPlaybackSDKReady = () => {
                resolve(window.Spotify);
              };
            }
          });
        }

        (async () => {
          const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
          myPlayer = await new Player({
            name: "Aadhar Clone",
            volume: 1.0,
            enableMediaSession: true,
            getOAuthToken: (callback) => {
              callback(token);
            },
          });

          let connected = await myPlayer.connect();
          if (connected) {
            async function getDevices() {
              try {
                const response = await axios.get(
                  "https://api.spotify.com/v1/me/player/devices",
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                      "Content-Type": "application/json",
                    },
                  }
                );
                return response.data.devices;
              } catch (error) {
                console.error("Error fetching devices:", error);
                throw error;
              }
            }

            async function findAadharClone() {
              try {
                let devices = [];
                while (true) {
                  devices = await getDevices();
                  const aadharCloneDevice = devices.find(
                    (device) => device.name === "Aadhar Clone"
                  );
                  if (aadharCloneDevice) {
                    const setDevice = await axios.put(
                      "https://api.spotify.com/v1/me/player",
                      {
                        device_ids: [aadharCloneDevice.id],
                      },
                      {
                        headers: {
                          Authorization: "Bearer " + token,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    return aadharCloneDevice;
                  }
                  await new Promise((resolve) => setTimeout(resolve, 500));
                }
              } catch (error) {
                console.error("Error finding Aadhar Clone device:", error);
                throw error;
              }
            }

            async function main() {
              try {
                const aadharCloneDevice = await findAadharClone();
                console.log("Found Aadhar Clone device:", aadharCloneDevice);
                let state = await waitUntilUserHasSelectedPlayer(myPlayer);
                // let state = await myPlayer.getCurrentState();
                console.log(state);
                await myPlayer.resume();
                // alert("player Connected succesfully ");
                await myPlayer.setVolume(0.5);
                let { name: track_name, artists } =
                  state.track_window.current_track;
                console.log(
                  `You're listening to ${track_name} by ${artists[0].name}!`
                );
                // console.log(state.track_window.current_track);
                // console.log(state);
                // console.log(myPlayer.getCurrentState);
                const current_track = state.track_window.current_track;
                const currentlyPlaying = {
                  id: current_track.id,
                  name: current_track.name,
                  artists: current_track.artists.map((artist) => artist.name),
                  images: [
                    current_track.album.images[1].url,
                    current_track.album.images[2].url,
                  ],
                  context: current_track.context,
                  currently_playing_type: current_track.currently_playing_type,
                  progress_ms: current_track.progress_ms,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
                window.addEventListener("keydown", async (e) => {
                  debugger
                  if (e.key === " ") {
                    await myPlayer.togglePlay();
                  }
                });
              } catch (error) {
                console.error("Error:", error);
              }
            }
            main();
          }
        })();
      };
      const script = document.createElement("script");
      script.id = "spotify-player";
      script.type = "text/javascript";
      script.async = "async";
      script.defer = "defer";
      script.src = "https://sdk.scdn.co/spotify-player.js";
      document.body.appendChild(script);
      script.onload = () => loadScript();
    }

    loadPlayer();
  }, []);

  return null;
}
