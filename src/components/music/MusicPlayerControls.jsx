
function getSecondPreview(seconds) {
    if (seconds < 10) {
        return `00:0${seconds}`;
    } else if (seconds < 60) {
        return `00:${seconds}`;
    } else {
        let minute = Math.floor(seconds / 60);
        seconds = seconds % 60;

        let strMinute = minute < 10 ? "0" + minute : minute;
        let secMinute = seconds < 10 ? "0" + seconds : seconds;
        return `${strMinute}:${secMinute}`;
    }
}

function MusicPlayerControls({ currentSecReal, songLength, isPlaying, onStoped, onPlayed, gameFinished }) {

    const onPlayClicked = () => {
        console.log("onPlayClicked")
        if (onPlayed) {
            onPlayed()
        }
    }

    const onStopClicked = () => {
        console.log("onStopClicked")
        if (onStoped) {
            onStoped()
        }
    }

    return (
        <>
            <div className="border-t border-custom-line">
                <div className="max-w-screen-sm w-full mx-auto flex-col">
                    <div className="px-3 ">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                {
                                    <div>{getSecondPreview(currentSecReal)}</div>
                                }
                            </div>
                            <div className="flex justify-center items-center p-1">
                                <div className="px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm">
                                    {
                                        isPlaying === true ?
                                            (
                                                <div className="flex justify-center items-center text-custom-fg h-14 w-14 border-2 rounded-full relative overflow-hidden">
                                                    <button className="player-button" type="button" aria-label="Şarkıyı durdur" title="Şarkıyı durdur"
                                                        onClick={onStopClicked} >
                                                        <div className="ml-1 relative z-10 playing" >
                                                            <div className="scale-150 transform relative">
                                                                <i className="gg-loadbar-sound svelte-15swa4o musicIsPlaying"></i>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </div>
                                            ) :
                                            (
                                                <div className="flex justify-center items-center text-custom-fg h-14 w-14 border-2 rounded-full relative overflow-hidden">
                                                    <button className="player-button" type="button" aria-label="Şarkıyı başlat" title="Şarkıyı başlat"
                                                        onClick={onPlayClicked} >
                                                        <div className="ml-1 relative z-10" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                            </svg>
                                                        </div>
                                                    </button>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="flex items-center">
                                {gameFinished === false &&
                                    <div>{getSecondPreview(songLength)}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicPlayerControls;