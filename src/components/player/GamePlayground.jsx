import { useGameData } from "./GameContext";

const SKIP_ICON = (
    <svg xmlns="http://www.w3.org/2000/svg" className="text-custom-mg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
);

const WRONG_ICON = (
    <svg className="text-custom-negative" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

function GamePlayground() {

    const { state: { guessList } } = useGameData();

    return (
        <div className="w-full flex flex-col flex-grow relative">
            <div className="max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto">
                <div className="p-3 flex-col items-evenly">
                    {
                        guessList.map((guess, index) => {
                            let result = (<div className="w-5 h-5"></div>);

                            if (guess.isSkipped === true) {
                                result = (<>
                                    <div className="mr-2">
                                        {SKIP_ICON}
                                    </div>
                                    <div className="flex flex-1 justify-between items-center">
                                        <div className="text-custom-mg tracking-widest font-bold">SALTATO</div>
                                    </div>
                                </>);
                            } else if (guess.isSkipped === false && guess.isCorrect === false && guess.answer != "") {
                                result = (<>
                                    <div className="mr-2">
                                        {WRONG_ICON}
                                    </div>
                                    <div className="flex flex-1 justify-between items-center">
                                        <div className="tracking-widest font-semibold">{guess.answer}</div>
                                    </div>
                                </>);
                            }

                            return (
                                <div key={index} className="p-2 mb-2 border border-custom-mg flex items-center last:mb-0 border-custom-line">
                                    {result}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default GamePlayground;
