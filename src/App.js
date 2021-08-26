import { useRef, useState } from "react";
// Import styles
import "./css/style.css";

// Import Componant
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// Import Util
import data from "./util";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  // State
  // eslint-disable-next-line
  const [songs, setSongs] = useState(data());
  // eslint-disable-next-line
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // eslint-disable-next-line
  const [isPlaying, setIsPlaying] = useState(0);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(0);

  // Ref
  const audioRef = useRef(null);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        libraryStatus={libraryStatus}
        currentSong={currentSong}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
    </div>
  );
}

export default App;
