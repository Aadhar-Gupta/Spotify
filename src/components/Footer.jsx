import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";

import VolumeBar from "./VolumeBar";
// get device id from my player or api then transfer playback to this id and then use myplayer.play()&& myplayer.pause to toggle playback

export default function Footer() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();


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
