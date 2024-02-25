import { useEffect } from "react";
import Login from "./components/login.jsx";
import { useStateProvider } from "./utils/stateProvider.jsx";
import { reducerCases } from "./utils/Constants.js";
import Spotify from "./components/Spotify.jsx";


function App() {

  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1]
      dispatch({ type: reducerCases.SET_TOKEN, token })
    }
  }, [])
  return (
    <div className="App">
      {token ? <Spotify /> : <Login />}
    </div>
  );
}

export default App;
