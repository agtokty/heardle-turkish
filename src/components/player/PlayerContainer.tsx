import { useEffect, useState } from "react";

import AsyncSelect from 'react-select/async';

import GamePlayground from "./GamePlayground";
import GameResult from "./GameResult";

import { useGameData } from "./GameContext";

import MusicPlayer from "../music/MusicPlayer";
import { checkAnswer } from "../game/Utils";
import { OnChangeValue } from "react-select";
import { SongConfig } from "../game/Models";
import {getListTracks} from "../utils/spotifyService";


type AudioscrobblerResult = {
    artist: string
    name: string
}



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

    const options = [
        { label: 'Blanco - Paraocchi', value: "Blanco Paraocchi"},
        { label: 'Blanco - Prova', value: "Blanco Prova"},
        { label: 'Blanco - Prova', value: "Blanco Prova"},
        { label: 'Frah Quintale - Chicchi di riso', value: 'Frah Quintale Chicchi di riso' },
        { label: 'Ghali - Cara Italia', value: 'Ghali Cara Italia' },
        { label: 'Octopus', value: 'Octopus' },
        { label: 'Crab', value: 'Crab' },
        { label: 'Lobster', value: 'Lobster' },
      ];
      

    //const sortedOptions = [...options].sort((a,b) => a.label.localeCompare(b.label))


    const loadListTracks = (inputValue: string, callback: (res: any[]) => void) => {

        let sortedOptions = [...options].sort((a,b) => a.label.localeCompare(b.label))
        if (!inputValue || inputValue.trim().length < 3) {
            callback([]);
            return;
        }
        
        //getListTracks(accessToken);
        //const search = getSearch(accessToken, inputValue, callback);
        //console.log(listTracks)
        getListTracks(accessToken, inputValue, callback);
        

    }

    const loadOptions2 = (inputValue: string, callback: (res: any[]) => void) => {

        let sortedOptions = [...options].sort((a,b) => a.label.localeCompare(b.label))
        if (!inputValue || inputValue.trim().length < 3) {
            callback([]);
            return;
        }
        else {
        [...sortedOptions].forEach(value => {
            if(value.value.toLowerCase()===inputValue.toLowerCase()) {
                var index = sortedOptions.indexOf(value); 
                sortedOptions.forEach(value => {
                    if(sortedOptions[index]!=value)
                    delete sortedOptions[sortedOptions.indexOf(value)]
                })
             callback(sortedOptions)   
                return
            }
            else if(value.value.toLowerCase().includes(inputValue.toLowerCase())) {
                sortedOptions.forEach(value =>{
                    if(!value.value.toLowerCase().includes(inputValue.toLowerCase())) {
                        delete sortedOptions[sortedOptions.indexOf(value)]
                    }
                })
                callback(sortedOptions)
            }
            return
        })
        callback([])
        return
       
    }
}
      

    const loadOptions = (inputValue: string, callback: (res: any[]) => void) => {
        if (!inputValue || inputValue.trim().length < 3) {
            callback([]);
            return;
        }
            //http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=YOUR_API_KEY&format=json
        fetch('https://ws.audioscrobbler.com/2.0/?method=track.search&api_key=48fec4d16077b7d1437f1472e9de1fad&format=json&limit=5&track=' + inputValue)
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
                            value = value.replaceAll("!", "");
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
                                        noOptionsMessage={({ inputValue }) => !inputValue.trim() ? "Devi inserire almeno 3 caratteri per cercare" : "Nessuna Corrispondenza"}
                                        placeholder={"Inserisci il titolo della canzone"}
                                        loadOptions={loadListTracks}
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