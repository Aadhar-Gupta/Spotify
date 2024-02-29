/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useStateProvider } from "../utils/stateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
export default function ViewPlaylist() {
  const [{ token, ViewPlaylist }, dispatch] = useStateProvider();
  const selectedPlaylistId = useParams();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      let response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      response = response.data;
      const selectedPlaylist = {
        id: response.id,
        playlist_uri: response.uri,
        name: response.name,
        description: response.description,
        image: response.images && response.images.length > 0 ? response.images[0].url : "",
        tracks: response.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          image: track.album.images && track.album.images.length > 0 ? track.album.images[0].url : "",
          artists: track.artists.map((artist) => artist.name),
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({
        type: reducerCases.SET_VIEW_PLAYLISTS,
        ViewPlaylist: selectedPlaylist,
      });
    };
    getInitialPlaylist();
  }, []);

  const playTrack = async (playlist_uri, context_uri) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: playlist_uri,
          offset: { uri: context_uri },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("Error occurred while playing track:", error);
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <Container>
      {ViewPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={ViewPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{ViewPlaylist.name}</h1>
              <p className="description">{ViewPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {ViewPlaylist.tracks.map(
                (
                  { id, name, artists, context_uri, image, duration, album },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(ViewPlaylist.playlist_uri, context_uri)
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image||""} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 0 0 0;
      color: #dddcdc;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
