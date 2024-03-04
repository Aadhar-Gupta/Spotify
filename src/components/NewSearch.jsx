/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import axios from "axios";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStateProvider } from "../utils/stateProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

export default function Search() {
  const { q } = useParams();
  const [data, setData] = useState({});
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          params: {
            q,
            type: "album,track,playlist,artist",
            limit: 10,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [q]);

  const playTrack = async (album_uri, track_number) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          context_uri: album_uri,
          offset: { uri: track_number },
          position_ms: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
        }
      );
    } catch (error) {
      console.error("Error occurred while playing track:", error);
    }
  };

  return (
    <Container>
      <h2>Search Results for: {q === ":q" ? "" : q}</h2>
      <h4>Tracks</h4>
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation={{ clickable: true }}
          modules={[Navigation]}
        >
          {data?.tracks?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => {
                  playTrack(item.album.uri, item.uri);
                }}
                className="item"
              >
                <h4>{item.name}</h4>
                <img src={item?.album?.images[0].url} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h4>Albums</h4>
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation={{ clickable: true }}
          modules={[Navigation]}
        >
          {data?.albums?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="item">
                <h4>{item.name}</h4>
                <img src={item?.images[0]?.url} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h4>Playlists</h4>
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation={{ clickable: true }}
          modules={[Navigation]}
        >
          {data?.playlists?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <Link key={item.id} to={`/playlist/${item.id}`}>
                <div className="item">
                  <h4>{item.name}</h4>
                  <img src={item?.images[0]?.url} alt="" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <h4>Artists</h4>
      <div className="artists">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          navigation={{ clickable: true }}
          modules={[Navigation]}
        >
          {data?.artists?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="item">
                <p>Followers: {item.followers.total}</p>
                <h4>{item.name}</h4>
                <p>{item.type}</p>
                <img src={item?.images[0]?.url} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 1rem;
  h4 {
    text-align: center;
    text-decoration: underline;
  }
  .swiper-pagination-bullet {
    background: #fff;
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.6);
  }
  .swiper-pagination-bullet-active {
    background: #6dff1e !important;
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 1);
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: #6dff1e;
  }
  .swiper-wrapper {
    padding-left: 50px;
  }

  a {
    text-decoration: none;
    color: white;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    /* transition: all 0.5s ease-in-out; */
    width: 195px;
    position: relative;

    h4 {
      position: absolute;
      text-decoration: none;
      opacity: 0;
      text-align: center;
      z-index: 1;
    }

    img {
      aspect-ratio: 1/1;
      object-fit: cover;
      width: 100%;
    }
  }
  .item:hover {
    h4 {
      opacity: 1;
      filter: drop-shadow(0px 0px 0px white);
    }
    img {
      filter: brightness(0.7);
    }
  }

  .artists .item {
    display: flex;
    flex-direction: column-reverse;
    align-content: center;
    align-items: center;
    justify-content: center;
    transition: none;
    background-color: #292929;
    border-radius: 5%;
    padding: 10px;
    width: 195px;
    h4 {
      position: static;
      opacity: 1;
      margin: 0px;
      padding: 0px;
      padding-top: 10px;
    }
    img {
      border-radius: 50%;
      aspect-ratio: 1/1;
      object-fit: cover;
      width: 65%;
    }
    p {
      margin: 0px;
      padding: 0px;
      padding-top: 10px;
    }
  }
`;
