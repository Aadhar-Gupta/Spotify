import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import SpotifyPlayer from "./Sdk";
export default function Spotify() {

  const [{ token, userInfo }, dispatch] = useStateProvider();


  useEffect(() => {
    const getUserInfo = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userName: data.display_name,
          followers: data.followers.total,
          Link: data.href,
          userProfilePic: data.images[1].url,
          accountStatus: data.product,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      }
    getUserInfo();  // eslint-disable-next-line
  }, []);
  SpotifyPlayer();
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body__contents">
            <Body />
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 90vh 10vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      #393939 80%,
      rgba(29, 26, 26, 0.693) 100%
    );
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;
