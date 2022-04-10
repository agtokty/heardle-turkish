import { useEffect, useState } from "react";

import AsyncSelect from 'react-select/async';

import GamePlayground from "./GamePlayground";
import GameResult from "./GameResult";

import { useGameData } from "./GameContext";

import MusicPlayer from "../music/MusicPlayer";
import { checkAnswer } from "./ResultHandler";
import { OnChangeValue } from "react-select";
import { SongConfig } from "../game/Models";


type AudioscrobblerResult = {
    artist: string
    name: string
}

function PlayerContainer({ songConfig }: { songConfig: SongConfig }) {

    const [answer, setAnswer] = useState("");
    const [selectedSong, setSelectedSong] = useState("");

    const { dispatch, state: { openedStep, finished } } = useGameData();

    const onSkipClicked = () => {
        dispatch(({ type: "SKIP", payload: { step: openedStep } }))
    }

    const onSendClicked = () => {
        if (!answer) {
            return;
        }

        let score = checkAnswer(songConfig, answer);
        console.log("checkAnswer ", score)

        if (score) {
            dispatch(({ type: "SUBMIT-CORRRECT", payload: { step: openedStep, answer: answer } }));
        } else {
            dispatch(({ type: "SUBMIT-WRONG", payload: { step: openedStep, answer: answer } }));
        }

        setAnswer("");
        setSelectedSong("")
    }

    const onFinishClicked = () => {
        dispatch(({ type: "FINISH" }));
    }

    const loadOptions = (inputValue: string, callback: (res: any[]) => void) => {
        if (!inputValue || inputValue.trim().length < 3) {
            callback([]);
            return;
        }

        fetch('https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=fafacade98a9cbfbf05e65fa63daf105&format=json&track=' + inputValue)
            .then(response => response.json())
            .then((response) => {
                let result = [];
                if (response && response.results && response.results.trackmatches && response.results.trackmatches.track) {
                    result = response.results.trackmatches.track
                        .filter((item: any) => {
                            return (item && item.artist.indexOf("unknown") === -1 && item.name.indexOf("unknown") === -1)
                        })
                        .map((item: AudioscrobblerResult) => {
                            let value = item.artist + " " + item.name;
                            value = value.replaceAll("-", "");
                            value = value.replaceAll("_", "");
                            value = value.replaceAll(".", "");
                            value = value.replaceAll("?", "");
                            return { label: value, value: value }
                        });
                }
                callback(result)
                return result;
            })
            .catch((err) => {
                console.error(err)
            });
    };


    const handleInputChange = (newValue: OnChangeValue<any, any>) => {
        if (newValue) {
            setSelectedSong(newValue);
            setAnswer(newValue.value);
        }
    };

    return (
        <>
            {
                finished ?
                    (<GameResult songConfig={songConfig} />) :
                    (<GamePlayground />)
            }
            <MusicPlayer songConfig={songConfig} />
            {
                finished === false &&
                <div className="max-w-screen-sm w-full mx-auto flex-col">
                    <div className="m-3 mt-0">
                        <div>
                            <div className="">
                                <div className="autoComplete_wrapper" role="form">
                                    <AsyncSelect defaultOptions
                                        menuPlacement="top"
                                        cacheOptions
                                        components={{
                                            DropdownIndicator: () => null,
                                            IndicatorSeparator: () => null
                                        }}
                                        noOptionsMessage={({ inputValue }) => !inputValue.trim() ? "Arama yapmak icin en az 3 karakter girmelisiniz" : "Sonuc bulunamadi"}
                                        placeholder={"Tahmin ettiğiniz şarkıyı/sanatçıyı aratıp seçin."}
                                        loadOptions={loadOptions}
                                        value={selectedSong}
                                        // blurInputOnSelect={true}
                                        // inputProps={{ 'aria-labelledby': 'react-select-2-placeholder' }}
                                        menuPortalTarget={document.body}
                                        styles={{
                                            menuPortal: base => ({ ...base, zIndex: 9999 }),
                                            placeholder: base => ({ ...base, color: "black" }),
                                            noOptionsMessage: base => ({ ...base, color: "red" }),
                                            loadingMessage: base => ({ ...base, color: "black" }),
                                        }}
                                        onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="flex justify-between pt-3">
                                {
                                    openedStep < songConfig.breaks.length - 1 &&
                                    <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm rounded"
                                        type="submit"
                                        onClick={onSkipClicked}>
                                        İlerlet
                                    </button>
                                }
                                {
                                    openedStep === songConfig.breaks.length - 1 &&
                                    <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm rounded"
                                        type="submit"
                                        onClick={onFinishClicked}>
                                        Bitir
                                    </button>
                                }
                                {
                                    openedStep < songConfig.breaks.length &&
                                    <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm rounded bg-custom-positive"
                                        type="submit"
                                        onClick={onSendClicked}>
                                        Tahmin Gönder
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default PlayerContainer;