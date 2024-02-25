import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import SpotifyPlayer from "./Sdk";
import VolumeBar from "./VolumeBar";
// get device id from my player or api then transfer playback to this id and then use myplayer.play()&& myplayer.pause to toggle playback

export default function Footer() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  // useEffect(() => {
  //   function loadPlayer() {
  //     const loadScript = async () => {
  //       window.onSpotifyWebPlaybackSDKReady = () => {};
  //       async function waitForSpotifyWebPlaybackSDKToLoad() {
  //         return new Promise((resolve) => {
  //           if (window.Spotify) {
  //             resolve(window.Spotify);
  //           } else {
  //             window.onSpotifyWebPlaybackSDKReady = () => {
  //               resolve(window.Spotify);
  //             };
  //           }
  //         });
  //       }
  //       async function waitUntilUserHasSelectedPlayer(myPlayer) {
  //         return new Promise((resolve) => {
  //           let interval = setInterval(async () => {
  //             let state = await myPlayer.getCurrentState();
  //             if (state !== null) {
  //               resolve(state);
  //               clearInterval(interval);
  //             }
  //           });
  //         });
  //       }
  //       (async () => {
  //         const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
  //         var myPlayer = await new Player({
  //           name: "Aadhar Clone",
  //           volume: 1.0,
  //           enableMediaSession: true,
  //           getOAuthToken: (callback) => {
  //             callback(token);
  //           },
  //         });

  //         let connected = await myPlayer.connect();
  //         if (connected) {
  //           async function getDevices() {
  //             try {
  //               const response = await axios.get(
  //                 "https://api.spotify.com/v1/me/player/devices",
  //                 {
  //                   headers: {
  //                     Authorization: "Bearer " + token,
  //                     "Content-Type": "application/json",
  //                   },
  //                 }
  //               );
  //               return response.data.devices;
  //             } catch (error) {
  //               console.error("Error fetching devices:", error);
  //               throw error;
  //             }
  //           }

  //           async function findAadharClone() {
  //             try {
  //               let devices = [];
  //               while (true) {
  //                 devices = await getDevices();

  //                 const aadharCloneDevice = devices.find(
  //                   (device) => device.name === "Aadhar Clone"
  //                 );
  //                 if (aadharCloneDevice) {
  //                   const setDevice = await axios.put(
  //                     "https://api.spotify.com/v1/me/player",
  //                     {
  //                       device_ids: [aadharCloneDevice.id],
  //                     },
  //                     {
  //                       headers: {
  //                         Authorization: "Bearer " + token,
  //                         "Content-Type": "application/json",
  //                       },
  //                     }
  //                   );
  //                   ;
  //                   return aadharCloneDevice;
  //                 }
  //                 // Wait for a short period before making the next API call
  //                 await new Promise((resolve) => setTimeout(resolve, 1000));
  //               }
  //             } catch (error) {
  //               console.error("Error finding Aadhar Clone device:", error);
  //               throw error;
  //             }
  //           }

  //           async function main() {
  //             try {
  //               const aadharCloneDevice = await findAadharClone();
  //               console.log("Found Aadhar Clone device:", aadharCloneDevice);
  //               // Do something with the found device
  //               ;
  //             } catch (error) {
  //               console.error("Error:", error);
  //             }
  //           }

  //           main();

  //           let state = await waitUntilUserHasSelectedPlayer(myPlayer);
  //           debugger
  //           await myPlayer.resume();
  //           alert("player Connected succesfully ")
  //           // await myPlayer.setVolume(0.5);
  //           let { name: track_name, artists } =state.track_window.current_track;
  //           console.log(`You're listening to ${track_name} by ${artists[0].name}!` );
  //           // const currentlyPlaying = {
  //           //   id: state.id,
  //           //   name: item.item.name,
  //           //   artists: item.item.artists.map((artist) => artist.name),
  //           //   images: [
  //           //     item.item.album.images[1].url,
  //           //     item.item.album.images[2].url,
  //           //   ],
  //           //   context: item.context,
  //           //   currently_playing_type: item.currently_playing_type,
  //           //   is_playing: item.is_playing,
  //           //   progress_ms: item.progress_ms,
  //           // };
  //           console.log(state.track_window.current_track)
  //           console.log(state)
  //           console.log(myPlayer.getCurrentState)
  //         }
  //       })();
  //     };
  //     const script = document.createElement("script");
  //     script.id = "spotify-player";
  //     script.type = "text/javascript";
  //     script.async = "async";
  //     script.defer = "defer";
  //     script.src = "https://sdk.scdn.co/spotify-player.js";
  //     document.body.appendChild(script);

  //     script.onload = () => loadScript();
  //   }
  //   loadPlayer();
  // }, []);
  SpotifyPlayer();
  return (
    <Container>
      <CurrentTrack />
      <PlayerControls />
      <VolumeBar/>
    </Container>
  );
}

const Container = styled.div`
  background: linear-gradient(to top, #000000, #343434c4);
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
