import {playAudio} from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  // Use effect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if ( song.id === currentSong.id ){
        return {
          ...song,
          active : true,
        };
      } else {
        return {
          ...song,
          active : false,
        }
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };

  // How to format time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    playAudio(isPlaying, audioRef);
  };

  return (
    <div className="player">
      <div className="player__time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={ songInfo.duration || 0}
          value={songInfo.currentTime}
          type="range"
          name=""
          id=""
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="player__play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="player__play-control--skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="player__play-control--play"
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="player__play-control--skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
