import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Header from "./components/Header";
import PlayerContainer from "./components/player/PlayerContainer";
import AllModals from "./components/modals/AllModals";
import { ModalContextProvider } from "./components/modals/ModalContext";
import { GameContextProvider } from "./components/player/GameContext";
import { useEffect, useState } from "react";
import { getDailySong } from "./components/utils/dataService";
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

function Page() {

  const [loading, setLoading] = useState(true);
  const [currentSongConfig, setCurrentSongConfig] = useState<SongConfig>(EMPTY_SONG_CONFIG);
  const { i18n } = useTranslation();

  useEffect(() => {

    getDailySong().then(songConfig => {
      setCurrentSongConfig(songConfig);
      setLoading(false)
    })

  }, [])

  return (
    <div className="bg-custom-bg text-custom-fg overflow-auto flex flex-col mobile-h">
      <ModalContextProvider>
        <Header />
        <AllModals />
      </ModalContextProvider>

      <GameContextProvider>
        {
          loading ? (
              <Loader message={i18n.t('loading')} />
            ) : (
              <PlayerContainer songConfig={currentSongConfig} />
            )
        }
      </GameContextProvider>
    </div>
  );
};

// loading component for suspense fallback
const Loader = (props: { message: any }) => (
  <>
    <div className="max-w-screen-sm w-full mx-auto flex-col" >
      <div className="text-center m-3 mt-6">
        {props.message}
      </div>
    </div>
  .</>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader message='Loading ...' />}>
      <Page />
    </Suspense>
  );
};
