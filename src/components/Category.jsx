import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";

export default function Category() {
  const [{ token, category }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCat = async ()=>{
        const response = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', {
            headers: {
              'Authorization': 'Bearer ' + token,
            }
          })
          console.log( 'categories', response.data)
    }
    getCat()
  }, []);

  return <div>Category</div>;
}
