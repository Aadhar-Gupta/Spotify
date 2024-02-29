/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
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
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
        >
          {featuredPlaylists?.playlists?.items?.map((item) => (
            <SwiperSlide key={item.id}>
              <Link key={item.id} to={`/playlist/${item.id}`}>
                <div className="item">
                  <h5>{item.name}</h5>
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
   a{
        text-decoration: none;
        color: white;
    }
  .item {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    h5 {
      position: absolute;
      opacity: 0;
    }
    &:hover {
      h5 {
        opacity: 1;
      }
    }

    img {
      aspect-ratio: 1/1;
      object-fit: cover;
      width: 50%;
    }
  }

`;
