/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import Recentlyplayed from "./Recentlyplayed";
import { Routes, Route } from "react-router-dom";
import ViewPlaylist from "./ViewPlaylist";
import Search from "./Search";
import NewSearch from "./NewSearch";
import Featured from "./Featured";

export default function Body() {
  const [{ token, recentlyPlayed }, dispatch] = useStateProvider();
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
      // var recentlyPlayed = response.data.items.slice(0, 6);
      var recentlyPlayed = response.data.items;

      var uniqueItemsArray = recentlyPlayed.filter(
        (item, index, self) => index === self.findIndex((t) => t.track.id === item.track.id)
      ).slice(0, 9);
debugger
      dispatch({ type: reducerCases.SET_RECENTLY_PLAYED, recentlyPlayed:uniqueItemsArray });
    };
    getrecentlyPlayed();
  }, []);

  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Recentlyplayed /> <Featured />{" "}
            </>
          }
        />
        <Route path="/playlist/:id" element={<ViewPlaylist />} />
        <Route path="/search/:q" element={<NewSearch />} />
      </Routes>
    </Container>
  );
}

const Container = styled.div``;
