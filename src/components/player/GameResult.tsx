import { useGameData } from "./GameContext";
import copy from 'copy-to-clipboard';

import SoundCloudLogo from '../icons/SoundCloudLogo.svg';
import NextTimer from "./NextTimer";
import { useState } from "react";
import { GAME_RESULT_FAILED_MESSAGE, GAME_RESULT_MESSAGES, HEARDLE_SPOTIFY_LIST_URL, HEARDLE_TR_WEB_URL } from "../game/Constants";
import { getDayFormattedText } from "../utils";

const buildScore = (guessList: any[]): number => {
  let max = 100;

  const isCorrect = guessList.some((guess) => guess.isCorrect);
  if (isCorrect === false) {
    return 0;
  }

  // kaybedilecek puanlar: 12, 10, 8, 6, 4
  for (let i = 0; i < guessList.length; i++) {
    if (guessList[i].isSkipped) {
      max = max - ((guessList.length - i) * 2);
    }
  }

  return max;
}

const buildBoxIcons = (guessList: any[]) => {
  let icons = guessList.map((item, i) => {
    if (item.isSkipped) {
      return "⬛"
    }
    if (item.isCorrect) {
      return "🟩"
    }
    if (item.isSkipped === false && item.isCorrect === false && item.answer) {
      return "🟥"
    }
    return "⬜️"
  }).join("");

  return icons;
}

const getSpeakerIcon = (score: number) => {
  if (score === 100) {
    return "🔊";
  } else if (score === 0) {
    return "🔇";
  } else if (score < 50) {
    return "🔈";
  } else {
    return "🔉";
  }
}

const getResultIcons = (guessList: any[]) => {
  let score = buildScore(guessList);
  console.log("score:", score)
  return getSpeakerIcon(score) + buildBoxIcons(guessList);
}

const buildShareText = (guessList: any[]) => {
  let score = buildScore(guessList);
  console.debug(score)

  let icons = getResultIcons(guessList);
  let todayStr = getDayFormattedText();

  // return ` ${icons} \n #HeardleTr #Heardle #${score} \n \n ${HEARDLE_TR_WEB_URL}`;
  return `${icons} \n #HeardleTr ${todayStr} \n \n ${HEARDLE_TR_WEB_URL}`;
}

function GameResult({ songConfig }: { songConfig: any }) {

  const { state: { guessList } } = useGameData();
  const guessScore = guessList.findIndex((guess: any) => guess.isCorrect);

  const [showCopied, setShowCopied] = useState(false);

  const onCopyClicked = () => {
    const text = buildShareText(guessList);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000)

    copy(text, {
      debug: true,
      message: 'Press #{key} to copy',
    });
  }

  const onTwitterShareClicked = () => {
    const text = buildShareText(guessList);
    const url = `https://twitter.com/intent/tweet?original_referer=${HEARDLE_TR_WEB_URL}&text=${encodeURIComponent(text)}`;

    const winProxy = window.open(url, '_blank');
    if (winProxy) {
      winProxy.focus();
    }
  }

  return (
    <div className="w-full flex flex-col flex-grow relative">
      <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
        <div className="p-3 pb-0 flex-col items-evenly">
          {
            songConfig.showSoundCloud &&
            <a href={songConfig.soundCloudLink} title={"SoundCloud uzerinden " + songConfig.trackName + " dinle"} target="_blank" rel="noreferrer"
              className="no-underline song-link">
              <div className="p-2 flex items-center rounded-sm bg-soundcloud">
                <img src={songConfig.image} className="h-14 w-14 " alt="Fleetwood Mac - Dreams" />
                <div className="flex-1 mx-3 text-white">
                  <p className="">{songConfig.trackName}</p>
                  <p className="text-sm ">{songConfig.album}</p>
                </div>
                <div className="text-center flex justify-center">
                  <img src={SoundCloudLogo} alt={"Soundcloud üzerinden " + songConfig.trackName + " dinle"} />
                </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </div>
              </div>
            </a>
          }
          {
            songConfig.soundSpotifyLink &&
            <div className="mt-2">
              <iframe id="spotify" src={songConfig.soundSpotifyLink + "?utm_source=heardle-tr.app"}
                title={"Spotify uzerinden " + songConfig.trackName + " dinle"}
                className="song-link"
                width="100%" height="80" frameBorder="0" allowFullScreen={false}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
          }
        </div>
        <div className="text-center px-3">
          {
            guessScore > -1 && guessScore < 6 &&
            <>
              <p className="text-lg text-custom-line">{GAME_RESULT_MESSAGES[guessScore]}</p>
            </>
          }
          {
            guessScore < 0 &&
            <p className="text-lg text-custom-line">{GAME_RESULT_FAILED_MESSAGE}</p>
          }

          <div className="flex justify-center my-2">
            {
              getResultIcons(guessList)
            }
          </div>

          <div className="flex flex-col justify-center items-center mt-3 pt-3">
            <button className="w-full px-2 py-2 mb-2 uppercase tracking-widest border-none rounded content-center font-semibold text-sm bg-slate-500 text-black"
              onClick={onCopyClicked}>
              {showCopied ? "Kopyalandi" : "Sonucu Kopyala"}
            </button>
            <button className="w-full px-2 py-2 mb-2 uppercase tracking-widest border-none rounded content-center font-semibold text-sm bg-cyan-400 text-black"
              onClick={onTwitterShareClicked}>
              Twitter'da Paylaş
            </button>
            <a className="w-full px-2 py-2 mb-2 uppercase tracking-widest border-none rounded content-center font-semibold text-sm bg-green-500 text-black"
              href={HEARDLE_SPOTIFY_LIST_URL} target="_blank" rel="noreferrer">
              Daha önce çıkan tüm şarkılar - Spotify
            </a>
          </div>
        </div>
        <div>
          <NextTimer />
        </div>
      </div>
    </div>
  );
}

export default GameResult;