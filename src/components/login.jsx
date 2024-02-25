
import styled from "styled-components";

export default function Login() {
  const handleClick = () => {
    const clientId = "03f4f30e0fe94fd6b0f6d72c1d4c1313"
    const redirectUrl = "http://localhost:5173/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = [
        "user-library-modify",
        "user-library-read",
        "user-read-recently-played",
        "user-read-playback-position",
        "user-follow-read",
        "user-follow-modify",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
        "app-remote-control",
        "streaming",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-email",
        "user-read-private",
        'user-top-read',
        'user-read-recently-played',
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt=""
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5em;
    border: none;
    background-color: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
