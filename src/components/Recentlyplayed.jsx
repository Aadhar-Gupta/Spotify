/* eslint-disable no-debugger */
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function Recentlyplayed() {
  const [{ recentlyPlayed ,token}] = useStateProvider();

  const playTrack = async (item) => {
    try {

      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: item.context.uri,
          offset: { uri: item.track.uri},
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
  return (
    <Container>
      <h2>Recently played tracks</h2>
      <ul>
        {recentlyPlayed.map((item) => {
          return (
            <Link key={item.track.id} onClick={()=>playTrack(item)}>
              <li>
                <img src={item.track.album.images[0].url} alt="" />
                <div className="trackText">
                  <h4>{item.track.name}</h4>
                  <p>{item.track.album.name}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
  }
  h2 {
    color: white;
    margin: 0%;
    margin-left: 1rem;
  }
  width: 100%;
  ul {
    display: grid; /* Change display to grid */
    grid-template-columns: repeat(3, 1fr); /* Three columns with equal width */
    grid-gap: 3rem; /* Gap between grid items */
    padding-left: 0px;
    margin-left: 1rem;
    margin-right: 1rem;
    list-style-type: none;
    li {
      transition: all 0.3s ease-in-out;
      background: linear-gradient(#2a2a2a 0%, rgba(99, 99, 99, 0.693) 100%);
      align-items: center;
      color: white;
      border-radius: 1rem;
      display: flex;
      img {
        width: 5vw;
        height: 75px;
        aspect-ratio: 1/1;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        object-fit: cover;
      }
      h4 {
        margin: 0%;
      }
      &:hover {
        scale: 1.05;
        border: 2px solid white;
      }
      p {
        margin: 0px;
        transform: translateY(50px);
      }
      .trackText {
        overflow: hidden;
      }
      &:hover {
        p {
          transform: translateY(0px);
        }
      }
    }
  }
`;
