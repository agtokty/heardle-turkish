import Header from "./components/Header";
import PlayerContainer from "./components/player/PlayerContainer";
import AllModals from "./components/modals/AllModals";
import { ModalContextProvider } from "./components/modals/ModalContext";
import { GameContextProvider } from "./components/player/GameContext";
import { useEffect, useState } from "react";
import { getDailySong } from "./components/utils/dataService";


const APP_VERSION = process.env.REACT_APP_VERSION || "0"
console.debug("v" + APP_VERSION);

const currentVersion = localStorage.getItem("version");
if (currentVersion !== APP_VERSION) {
  console.log(`version upgrated from ${currentVersion} to ${APP_VERSION}`)
  localStorage.setItem("version", APP_VERSION);
}


function App() {

  const [loading, setLoading] = useState(true);
  const [CURRENT_SONG_CONFIG, SET_CURRENT_SONG_CONFIG] = useState();



  useEffect(() => {

    getDailySong().then(songConfig => {
      SET_CURRENT_SONG_CONFIG(songConfig);

      setLoading(false)
    })

  }, [])

  return (
    <div className="bg-custom-bg text-custom-fg overflow-auto flex flex-col h-screen">
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
                  Yükleniyor...
                </div>
              </div>
              .</>
            : (
              <PlayerContainer CURRENT_SONG_CONFIG={CURRENT_SONG_CONFIG} />
            )
        }
      </GameContextProvider>
    </div>
  );
}

export default App;
