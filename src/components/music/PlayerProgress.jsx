
const SECOND_POWER = 100;

function PlayerProgress({ currentSecInMilis, maxStepLength, playerSlicePercentages, openedStep }) {

    const songLengthInMilis = maxStepLength * SECOND_POWER;

    const availablePercentage = (playerSlicePercentages[openedStep]);

    const percentage = (currentSecInMilis / songLengthInMilis) * 100;

    //console.debug(`songLengthInMilis:${songLengthInMilis} availablePercentage:${availablePercentage} percentage:${percentage}`)

    return (
        <div className="border-t border-custom-line">
            <div className="max-w-screen-sm w-full mx-auto px-3 flex-col">
                <div className="h-3 w-full relative overflow-hidden ">
                    <div className="h-full absolute bg-custom-mg overflow-hidden" style={{ width: availablePercentage + "%" }}>
                        <div className="h-full absolute bg-custom-positive" style={{ width: percentage + "%" }}></div>
                    </div>
                    <div className="w-full h-full absolute">
                        <div className="bg-custom-line w-px h-full absolute right-0"></div>
                        {
                            playerSlicePercentages.map((percentage, index) => {
                                if (index > openedStep)
                                    return <div key={index} className="w-px h-full absolute bg-custom-mg" style={{ left: percentage + "%" }}></div>
                                else
                                    return <div key={index} className="w-px h-full absolute bg-custom-fg" style={{ left: percentage + "%" }}></div>
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