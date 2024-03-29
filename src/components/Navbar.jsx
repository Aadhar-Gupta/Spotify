/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useStateProvider } from "../utils/stateProvider";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const Navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const input = e.target.value;
      Navigate(`/search/${input}`);
    }
  };
  const [{ userInfo }] = useStateProvider();
  const username = userInfo?.userName ? userInfo.userName : "";
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [username,""],
      startDelay: 300,
      typeSpeed: 500,
      backSpeed: 200,
      loop: true,
      backDelay: 200,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, [userInfo]);

  return (
    <Container>
      <div className="search__bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Artists, Songs Or Podcasts"
          onKeyDown={handleSearch}
        />
      </div>
      <div className="avatar">
        <a href={userInfo?.Link}>
          <img src={userInfo?.userProfilePic} alt="" />
          <span ref={el}></span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 7vh;
  z-index: 20;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    color: black;

    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      color: black;
      background-color: transparent;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: 700;
    }
    img {
      width: 30px;
      border-radius: 1rem;
    }
  }
`;
