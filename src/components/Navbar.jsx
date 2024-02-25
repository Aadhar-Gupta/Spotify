import React from "react";
import { useStateProvider } from "../utils/stateProvider";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const [{ userInfo }] = useStateProvider();
  return (
    <Container>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists,Songs Or Podcasts" />
      </div>
      <div className="avatar">
        <a href={userInfo?.Link}>
          <img src={userInfo?.userProfilePic} alt="" />
          <span>{userInfo?.userName}</span>
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
      background-color:transparent;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar{
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: 700;
    }
    img{
      width: 30px;
      border-radius: 1rem;
    }
  }
`;
