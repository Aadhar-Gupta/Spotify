/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-debugger */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { myPlayer } from "./Sdk";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    if (myPlayer !== null) {
      myPlayer.addListener("player_state_changed", (state) => {
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
        myPlayer.removeListener('ready')
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
        const playerState = state.paused;
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: playerState,
        });
      });
      console.log("listener");
    }
  }, [currentlyPlaying.name]);

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data !== "") {
        const item = response.data;
        const currentlyPlaying = {
          id: item.item.id,
          name: item.item.name,
          artists: item.item.artists.map((artist) => artist.name),
          images: [
            item.item.album.images[1].url,
            item.item.album.images[2].url,
          ],
          context: item.context,
          currently_playing_type: item.currently_playing_type,
          is_playing: item.is_playing,
          progress_ms: item.progress_ms,
        };
        console.log("current track", currentlyPlaying);
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    console.log("api");
    getPlaylistData();
  }, []);

  return (
    <Container>
      {currentlyPlaying && (
        <>
          <div className="track">
            <div className="track__image">
              <img src={currentlyPlaying.images[0]} alt="currentPlaying" />
            </div>
            <div className="track__info">
              <h4 className="track__info__track__name">
                {currentlyPlaying.name}
              </h4>
              <h6 className="track__info__track__artists">
                {currentlyPlaying.artists.map((art) => (
                  <span key={art}>{art}</span>
                ))}
              </h6>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    gap: 1rem;
    min-width: 25vw;
    align-items: center;
    flex-direction: row;
    .track__image {
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        border-radius: 10px;
        height: 8vh;
        aspect-ratio: 1/1;
        object-fit: cover;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.3rem;
      word-wrap: break-word;
      height: 100%;
      h4 {
        margin: 0px;
        padding: 0px;
        color: white;
      }
      h6 {
        margin: 0px;
        padding: 0px;
        color: white;
      }
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
    &:hover {
      h4,
      h6 {
        text-decoration: underline;
      }
    }
  }
`;
