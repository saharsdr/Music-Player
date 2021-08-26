import LibrarySong from "./LibrarySong";

const Library = ({
  currentSong,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'library--active' : ""}`}>
      <h2>Library</h2>
      <div className="library__content">
        {songs.map((song) => (
          <LibrarySong
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            song={song}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
