import Header from "./components/Header";
import PlayerContainer from "./components/player/PlayerContainer";
import AllModals from "./components/modals/AllModals";
import { ModalContextProvider } from "./components/modals/ModalContext";
import { GameContextProvider } from "./components/player/GameContext";
import { useEffect, useState } from "react";
import { getDailySong } from "./components/utils/dataService";
import { getAccessToken } from "./components/utils/spotifyService";
import { SongConfig } from "./components/game/Models";

const APP_VERSION = process.env.REACT_APP_VERSION || "0"
console.debug("v" + APP_VERSION);

const currentVersion = localStorage.getItem("version");
if (currentVersion !== APP_VERSION) {
  console.log(`version upgrated from ${currentVersion} to ${APP_VERSION}`)
  localStorage.setItem("version", APP_VERSION);
}

const EMPTY_SONG_CONFIG: SongConfig = {
  trackName: "",
  breaks: [],
  others: []
}


function App() {

  const [loading, setLoading] = useState(true);
  const [currentSongConfig, setCurrentSongConfig] = useState<SongConfig>(EMPTY_SONG_CONFIG);

  const [accessToken, setAccessToken] = useState("");
  
  useEffect(() => {

    getAccessToken().then((value: any) => {
      setAccessToken(value);
      getDailySong(value).then(songConfig => {
        setCurrentSongConfig(songConfig);
        setLoading(false)
      })
    });    

  }, [])

  return (
    <div className="bg-custom-bg text-custom-fg overflow-auto flex flex-col mobile-h">
      <ModalContextProvider>
        <Header />
        <AllModals />
      </ModalContextProvider>
      <GameContextProvider>
        {
          loading ?
            <>
              <div className="max-w-screen-sm w-full mx-auto flex-col" >
                <div className="text-center m-3 mt-6">
                  Caricamento...
                </div>
              </div>
              .</>
            : (
              <PlayerContainer songConfig={currentSongConfig} 
              accessToken = {accessToken}/>
            )
        }
      </GameContextProvider>
    </div>
  );
}

export default App;
