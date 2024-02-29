import React from "react";
import styled from "styled-components";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
// import Playlists from "./Playlists";
import { Link } from "react-router-dom";
import Playlists from "./Playlists";
// import ViewPlaylist from "./ViewPlaylist";



export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt=""
          />
          <p>A lil good a lil bad </p>
        </div>
        <ul>
          <Link to='/' >          
          <li>
            <MdHomeFilled/>
            <span>home</span>
          </li>
          </Link>
          <Link to='/search/:q' >  
          <li>
            <MdSearch/>
            <span>Search</span>
          </li>
            </Link>
          <li>
            <IoLibrary/>
            <span>Library</span>
          </li>
        </ul>
      </div>
      <Playlists/>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .top__links{
    display: flex;
    flex-direction: column;
    .logo{
      p{
        margin: 0px;
      }
      text-align: center;
      margin: 1rem 0rem;
      img{
        max-inline-size: 80%;
        block-size: auto;

      }
    }
    ul{
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      a{
        text-decoration: none;
        color: #b3b3b3;
      }
      li{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
          color: white;
          scale: 1.05;
        }
      }
    }
  }
`;
