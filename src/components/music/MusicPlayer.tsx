import { useEffect, useState } from "react";

import PlayerProgress from "./PlayerProgress";
import MusicPlayerControls from "./MusicPlayerControls";
import { useGameData } from "../player/GameContext";


const DEFAULT_START_MILIS = 15;
const SECOND_POWER = 100;

let SC_WIDGET: any = null;

function calculateSlicePercentages(songLength: number, breaks: number[]) {
    console.log("calculateSlicePercentages");

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


    const [playerSlicePercentages, setplayerSlicePercentages] = useState<any[]>([]);
    const [musicReady, setMusicReady] = useState(false);
    const [currentSecInMilis, setCurrentSecInMilis] = useState(DEFAULT_START_MILIS);// not second, second*10
    const [isPlaying, setPlaying] = useState(false);

    const { state: { openedStep, finished } } = useGameData();

    const onStoped = (reset = false) => {
        //console.debug("onStoped")
        setPlaying(false);
        SC_WIDGET.pause();
        if (reset) {
            //console.debug("resetted")
            SC_WIDGET.seekTo(0)
        }
    }

    const onPlayed = () => {
        setPlaying(true);
        SC_WIDGET.play();
    }

    useEffect(() => {
        console.log("MusicPlayer calculateSlicePercentages")
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
            console.log("1 useEffect openedStep=", openedStep)
            SC_WIDGET.bind(window.SC.Widget.Events.READY, () => {
                SC_WIDGET.bind(window.SC.Widget.Events.PLAY_PROGRESS, function () {
                    SC_WIDGET.getPosition(function (currentPosition: number) {
                        let currentPositionInMilis = Math.floor(currentPosition / 10);
                        setCurrentSecInMilis(currentPositionInMilis);
                    });
                });
                setMusicReady(true);
            });
        } else {
            console.log("2 useEffect openedStep=", openedStep)

            SC_WIDGET.bind(window.SC.Widget.Events.READY, () => {
                var stopTimeInMs = songConfig.breaks[openedStep] * 100;

                SC_WIDGET.bind(window.SC.Widget.Events.PLAY_PROGRESS, function () {
                    SC_WIDGET.getPosition(function (currentPosition: number) {
                        let currentPositionInMilis = Math.floor(currentPosition / 10);

                        setCurrentSecInMilis(currentPositionInMilis);
                        // if(isPlaying === true && finished === true){
                        //     return;
                        // }
                        if (currentPositionInMilis >= stopTimeInMs) {
                            SC_WIDGET.pause();
                            SC_WIDGET.seekTo(0)
                            setPlaying(false);
                            console.log("STOPPED !!!")
                        }
                    });
                });

                setMusicReady(true);
            });
        }
    }, [openedStep, finished])


    const currentSecReal = Math.floor(currentSecInMilis / SECOND_POWER);

    return (
        <>
            {
                finished === false &&
                <PlayerProgress
                    currentSecInMilis={currentSecInMilis}
                    maxStepLength={songConfig.breaks[openedStep]}
                    playerSlicePercentages={playerSlicePercentages}
                    openedStep={openedStep} />

            }
            {
                musicReady === true ?
                    (
                        <MusicPlayerControls
                            currentSecReal={currentSecReal}
                            songLength={songConfig.songLength}
                            onStoped={onStoped}
                            onPlayed={onPlayed}
                            isPlaying={isPlaying}
                            gameFinished={finished}
                        />
                    ) :
                    (
                        <div className="border-t border-custom-line p-3">
                            <div className="text-center max-w-screen-sm w-full mx-auto flex-col">
                                player yukleniyor...
                            </div>
                        </div>
                    )
            }
            <div style={{ display: "none" }}>
                <iframe id="soundcloud-iframe" allow="autoplay" title="Heardle" src={"https://w.soundcloud.com/player/?url=" + songConfig.soundCloudLink}></iframe>
            </div>
        </>
    );
}



export default MusicPlayer;