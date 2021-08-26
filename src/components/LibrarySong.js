import {playAudio} from "../util";

const LibrarySong = ({
  currentSong,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  // Function
  const songSelectHandler = () => {
    // Add active state
    currentSong.active = false;
    song.active = true;
    setCurrentSong(song); 

    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library__song ${
        song.active ? "library__song__selected" : ""
      }`}
    >
      <img
        alt={song.name}
        className="library__song--cover"
        src={song.cover}
        alt="cover"
      />
      <div className="library__song__description">
        <h3 className="library__song__description--name">{song.name}</h3>
        <h4 className="library__song__description--artist">{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
