
function PlayerProgress({ currentPositionInMilis, playerSlicePercentagesInSeconds, openedStep, maxStepLength, }) {

    const availablePercentage = (playerSlicePercentagesInSeconds[openedStep]);

    // const songLengthInMilis = maxStepLength * 1000;
    // const percentage = (currentPositionInMilis / songLengthInMilis) * 100;

    // shortened expression;
    const percentage = (currentPositionInMilis / (maxStepLength * 10));

    return (
        <div className="border-t border-gray-500">
            <div className="max-w-screen-sm w-full mx-auto px-3 flex-col">
                <div className="h-3 w-full relative overflow-hidden ">
                    <div className="h-full absolute bg-custom-mg overflow-hidden" style={{ width: availablePercentage + "%" }}>
                        <div className="h-full absolute bg-custom-positive" style={{ width: percentage + "%" }}></div>
                    </div>
                    <div className="w-full h-full absolute">
                        <div className="bg-custom-line w-px h-full absolute right-0"></div>
                        {
                            playerSlicePercentagesInSeconds.map((percentage, index) => {
                                // console.log(index);
                                // console.log(openedStep);
                                if(index === openedStep)
                                    return <div key={index} className="w-px h-full absolute bg-custom-fg" style={{ left: percentage + "%" }}></div>
                                else if( index > openedStep)
                                    return <div key={index} className="w-px h-full absolute bg-custom-mg" style={{ left: percentage + "%" }}></div>
                                else
                                    return <div key={index} className="w-px h-full absolute bg-custom-bg" style={{ left: percentage + "%" }}></div>
                            })
                        }
                        <div className="bg-custom-mg w-px h-full absolute right-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default PlayerProgress;