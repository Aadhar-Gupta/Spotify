/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";
import { Link } from "react-router-dom";




export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  let newPlaylists = useRef(playlists);
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id, images }) => {
        const iconUrl = images[0].url;
        return { name, id, iconUrl };
      });    
      newPlaylists.current = playlists.reverse();
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: newPlaylists.current });
    };
    getPlaylistData();
    console.log("newPlaylists", newPlaylists);
  }, []);





  return (
    <Container>
      <ul>
        {newPlaylists.current.map(({ name, id, iconUrl }) => {
          return (
            <Link key={id} to={`/playlist/${id}`}>
              <li>
                <img src={iconUrl} alt="" /> <h3>{name}</h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    /* width: 100%; */
    flex-direction: column;
    gap: 1rem;
    padding-left: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    a {
      text-decoration: none;
    }
    li {
      color: white;
      width: 100%;
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      h3 {
        transition: 0.3s ease-in-out;
        cursor: pointer;
      }
      &:hover h3 {
        color: white;
      }
      img {
        width: 20%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 1/1;
        transition: all 0.2s ease-in-out;
        border-radius: 10px;
      }
      &:hover img {
        border-radius: 5px;
        scale: 1.1;
        border: 2px solid white;
      }
      &:hover {
        background-color: #7171716f;
      }
    }
  }
`;
