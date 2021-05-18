import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false)

  useEffect(() => {
      setPlay(true);
    }, [trackUri])  //on change of the uri set the state of play to true, so that the song would be played

  if (!accessToken) 
    return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying)  //on change of state (song changes or ends), change to false
            setPlay(false)
        }}
      play={play} //play on click if true
      uris={trackUri ? [trackUri] : []}
    />
  )
}

export default Player;