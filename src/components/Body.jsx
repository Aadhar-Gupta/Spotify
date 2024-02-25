import React, {useEffect} from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import Recentlyplayed from "./Recentlyplayed";
import { Routes, Route } from "react-router-dom";
import ViewPlaylist from "./ViewPlaylist";
import Category from "./Category";

export default function Body() {
  const [{ token ,recentlyPlayed}, dispatch] = useStateProvider();
  useEffect(() => {
    const getrecentlyPlayed = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/recently-played",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      var recentlyPlayed = response.data.items.slice(0, 6);
      dispatch({ type: reducerCases.SET_RECENTLY_PLAYED, recentlyPlayed });
    };
    getrecentlyPlayed();

  }, []);


  return (
    <Container>
      <Routes>
        <Route path="/" element={ <><Recentlyplayed /> <Category/>  </> } />
        <Route path="/playlist/:id" element={<ViewPlaylist />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div``;
