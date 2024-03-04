/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function Featured() {
  const [featuredPlaylists, setfeaturedPlaylists] = useState({});
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=10",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setfeaturedPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Container>
      <div>
        <h2>Playlists for you</h2>
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          navigation={{ clickable: true }}
          modules={[Navigation]}
        >
          {featuredPlaylists?.playlists?.items?.map((item) => (
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
    </Container>
  );
}

const Container = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;

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
    background-color: black;
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
`;
