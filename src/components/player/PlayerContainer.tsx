import { useEffect, useState } from "react";

import AsyncSelect from 'react-select/async';

import GamePlayground from "./GamePlayground";
import GameResult from "./GameResult";

import { useGameData } from "./GameContext";

import MusicPlayer from "../music/MusicPlayer";
import { checkAnswer } from "../game/Utils";
import { OnChangeValue } from "react-select";
import { SongConfig } from "../game/Models";
import { getList } from "../utils/spotifyService";


function PlayerContainer({ songConfig, accessToken }: {songConfig: SongConfig, accessToken: string}) {

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
        console.debug("checkAnswer ", score)

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


    const loadList = (inputValue: string, callback: (res: any[]) => void) => {

        if (!inputValue || inputValue.trim().length < 3) {
            callback([]);
            return;
        }
        
        getList(accessToken, inputValue, callback);
        
    }
    
    const handleInputChange = (newValue: OnChangeValue<any, any>) => {
        if (newValue) {
            console.log(newValue)
            setSelectedSong(newValue);
            console.log("value:", newValue.value)
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
                                        noOptionsMessage={({ inputValue }) => !inputValue.trim() ? "Inserisci almeno 3 caratteri per cercare" : "Nessuna Corrispondenza"}
                                        placeholder={"Inserisci il titolo della canzone"}
                                        loadOptions={loadList}
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
                                        onChange={handleInputChange} 
                                        maxMenuHeight={150}/>
                                </div>
                            </div>
                            <div className="flex justify-between pt-3">
                                {
                                    openedStep < songConfig.breaks.length - 1 &&
                                    <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm rounded"
                                        type="submit"
                                        onClick={onSkipClicked}>
                                        Salta
                                    </button>
                                }
                                {
                                    openedStep === songConfig.breaks.length - 1 &&
                                    <button className="px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm rounded"
                                        type="submit"
                                        onClick={onFinishClicked}>
                                        Non la so
                                    </button>
                                }
                                {
                                    openedStep < songConfig.breaks.length &&
                                    <button className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm rounded bg-custom-positive"
                                        type="submit"
                                        onClick={onSendClicked}>
                                        Conferma
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