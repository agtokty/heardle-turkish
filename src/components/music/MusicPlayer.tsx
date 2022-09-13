import React, { useEffect, useState } from "react";

import { SILENT_SONG } from '../game/Constants';

import PlayerProgress from "./PlayerProgress";
import MusicPlayerControls from "./MusicPlayerControls";
import { useGameData } from "../player/GameContext";
import ReactPlayer from 'react-player';

const DEFAULT_START_MILIS = 15;

let SC_WIDGET: any = null;

function calculateSlicePercentages(songLength: number, breaks: number[]) {
    let playerSlices = [];
    for (let index = 0; index < breaks.length; index++) {
        const b = breaks[index];
        playerSlices.push(Number(Number(b * 100 / songLength).toFixed(3)))
    }

    playerSlices.push(100)

    return playerSlices;
}

type MusicPlayerProps = {
    songConfig: any
}


function MusicPlayer({ songConfig }: MusicPlayerProps) {

    const ref = React.useRef<ReactPlayer>(null)
    const [playerSlicePercentages, setplayerSlicePercentages] = useState<any[]>([]);
    const [musicReady, setMusicReady] = useState(false);
    const [currentPositionInMilis, setCurrentPositionInMilis] = useState(DEFAULT_START_MILIS);// not second, second*10
    const [isPlaying, setPlaying] = useState(false);
    const [songFullDurationInMilis, setSongFullDurationInMilis] = useState(0);

    const { state: { openedStep, finished } } = useGameData();

    const onStoped = (reset = false) => {
        //console.debug("onStoped")
        setPlaying(false);
        SC_WIDGET.pause();
        if (reset) {
            //console.debug("resetted")
            SC_WIDGET.seekTo(0)
            ref.current!.seekTo(0,'seconds');
        }
    }

    const onPlayed = () => {
        setPlaying(true);
        SC_WIDGET.play();
        
    }

    useEffect(() => {
        console.debug("MusicPlayer calculateSlicePercentages")
        const percentages = calculateSlicePercentages(songConfig.songLength, songConfig.breaks);
        setplayerSlicePercentages(percentages);
    }, [])

    useEffect(() => {
        let iframeElement = document.getElementById('soundcloud-iframe');


        SC_WIDGET = window.SC.Widget(iframeElement);

        SC_WIDGET.unbind(window.SC.Widget.Events.PLAY_PROGRESS);
        SC_WIDGET.unbind(window.SC.Widget.Events.READY);
        SC_WIDGET.unbind(window.SC.Widget.Events.FINISH);

        SC_WIDGET.bind(window.SC.Widget.Events.FINISH, () => {
            setPlaying(false);
        });

        if (finished) {
            
            console.debug("1 useEffect openedStep=", openedStep)
            SC_WIDGET.bind(window.SC.Widget.Events.READY, () => {
                SC_WIDGET.setVolume(0);

                setSongFullDurationInMilis(ref.current!.getDuration()*1000)
 
                SC_WIDGET.bind(window.SC.Widget.Events.PLAY_PROGRESS, function () {
                    SC_WIDGET.setVolume(0);
                    SC_WIDGET.getPosition(function (currentPosition: number) {
                        let _currentPositionInMilis = Math.floor((ref.current!.getCurrentTime()*1000));
                        setCurrentPositionInMilis(_currentPositionInMilis);

                        if (_currentPositionInMilis >= 28999) {
                            SC_WIDGET.pause();
                            SC_WIDGET.seekTo(0)
                            ref.current!.seekTo(0,'seconds');
                            
                            setPlaying(false);
                            console.debug("STOPPED !!!")

                        }
                    });
                    

                });
                setMusicReady(true);
            });
        } else {
            console.debug("2 useEffect openedStep=", openedStep)

            SC_WIDGET.bind(window.SC.Widget.Events.READY, () => {

                SC_WIDGET.setVolume(0);

                setSongFullDurationInMilis(ref.current!.getDuration()*1000)

                var stopTimeInMs = songConfig.breaks[openedStep] * 1000;


                SC_WIDGET.bind(window.SC.Widget.Events.PLAY_PROGRESS, function () {
                    SC_WIDGET.getPosition(function (currentPosition: number) {
                        SC_WIDGET.setVolume(0);
                        let _currentPositionInMilis = Math.floor((ref.current!.getCurrentTime()*1000));
                        setCurrentPositionInMilis(_currentPositionInMilis);
                        
                        // if(isPlaying === true && finished === true){
                        //     return;
                        // }
                        if (_currentPositionInMilis >= stopTimeInMs) {
                            SC_WIDGET.pause();
                            SC_WIDGET.seekTo(0)
                            ref.current!.seekTo(0,'seconds');

                            setPlaying(false);
                            console.debug("STOPPED !!!")
                        }
                    });
                });

                setMusicReady(true);

            });
        }
    }, [openedStep, finished])


    return (
        <>
            {
                finished === false &&
                <PlayerProgress
                    currentPositionInMilis={currentPositionInMilis}
                    maxStepLength={songConfig.breaks[openedStep]}
                    playerSlicePercentagesInSeconds={playerSlicePercentages}
                    openedStep={openedStep} />
            }
            {
                musicReady === true ?
                    (
                        <MusicPlayerControls
                            currentPositionInMilis={currentPositionInMilis}
                            songLengthInSeconds={songConfig.songLength}
                            songFullDurationInMilis={songFullDurationInMilis}
                            onStoped={onStoped}
                            onPlayed={onPlayed}
                            isPlaying={isPlaying}
                            gameFinished={finished}
                        />
                    ) :
                    (
                        <div className="border-t border-gray-500 p-3">
                            <div className="text-center max-w-screen-sm w-full mx-auto flex-col">
                                caricamento...
                            </div>
                        </div>
                    )
            }
            <div style={{ display: "none" }}>
                <iframe id="soundcloud-iframe" allow="autoplay" title="Heardle" src={SILENT_SONG}></iframe>
            </div>
            <div style={{ display: "none" }}>
                <div style={{ display: "none" }} className="video-player">
                    <ReactPlayer 
                        ref={ref}
                        playing={isPlaying}
                        controls={false}
                        pip={false}
                        volume={0.5}
                        onDuration={(duration:any)=> {setSongFullDurationInMilis(parseFloat(duration)*1000)}}
                        url={songConfig.soundCloudLink}
                        playsinline={true}
                        />
                </div>
            </div>
        </>
    );
}



export default MusicPlayer;