import { useModalData } from "./ModalContext";
import { useEffect } from 'react';


const getDivScore = (scores, n) => {
    let mTot = matches(scores);

    if(scores != null){ 
    
        // fails n = 6
        if (n === 6){ 
            console.info("fails")
            let fails = scores.fails;
            let failsFract = fails/mTot;
            
            switch (true) {
                case (failsFract > 0.9): return <div className="h-32 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.8): return <div className="h-28 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.7): return <div className="h-26 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.6): return <div className="h-24 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.5): return <div className="h-22 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.4): return <div className="h-20 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.3): return <div className="h-14 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0.2): return <div className="h-10 relative w-9 bg-lime-600" title={fails}></div>;
                case (failsFract > 0.1): return <div className="h-4 relative w-9 bg-red-600" title={fails}></div>;
                case (failsFract > 0): return <div className="h-1 relative w-9 bg-red-600" title={fails}></div>;
                default: return <></>
            }
            return <></>

        } 

        console.info("scores")
        let score = scores.guessList[n].count;
        let scoreFract = score/mTot;
        switch (true) {
            case (scoreFract > 0.9): return <div className="h-32 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.8): return <div className="h-28 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.7): return <div className="h-26 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.6): return <div className="h-24 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.5): return <div className="h-22 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.4): return <div className="h-20 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.3): return <div className="h-14 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.2): return <div className="h-10 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0.1): return <div className="h-4 relative w-9 bg-lime-600" title={score}></div>;
            case (scoreFract > 0): return <div className="h-1 relative w-9 bg-lime-600" title={score}></div>;
            default: return <></>
        }

   }

   return <></>
}

const matches = (scores) => {
    if(scores != null) {
        let sum = 0;
        for ( let i = 0; i < scores.guessList.length; i++) {
            sum = sum + scores.guessList[i].count;
        }
        sum = sum + scores.fails;
        return sum;
    }
     return 0;
}

const victory = (scores) => {
    if(scores != null) {
        let sum = 0;
        for ( let i = 0; i < scores.guessList.length; i++) {
            sum = sum + scores.guessList[i].count;
        }
        return sum;
    }
     return 0;
}


function Stats() {

    const { dispatch, state: { currentModal } } = useModalData();

    // get info Game in localStorage
    let scores = JSON.parse(localStorage.getItem("Game"));
 
    const onClose = () => {
        dispatch({ type: 'Reset' })
    }

    if (currentModal !== "Stats") {
        return <></>
    }

    const percentage = () => {
    
        if (victory(scores) != 0 && matches(scores) != 0) {
            let p = ((victory(scores) / matches (scores)) * 100).toFixed();
            return p;
        }else 
        return 0;
    }

    return (
        <div className="modal-background p-3 pointer-events-none">
            <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
                <div className="bg-custom-bg border border-custom-mg p-6 rounded">
                    <div className="flex items-center justify-center mb-2">
                        <div className="flex-1 pl-7">
                            <h2 className="text-sm text-center uppercase text-custom-line font-semibold tracking-widest">Statistiche</h2>
                        </div>
                        <div className="justify-self-end flex">
                            <button autofocus="" className="border-none text-custom-mg" type="button"
                                onClick={onClose}>
                                <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between py-3">
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[0].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[1].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[2].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[3].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[4].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.guessList[5].count : "0"}</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-0 relative w-9 flex justify-center items-end"></div>
                            <div className="text-center border-right text-xs pt-1"><span>{ (scores != null) ? scores.fails : "0"}</span></div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 0)}  
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>1°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 1)}                        
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>2°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                { getDivScore(scores, 2)}        
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>3°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 3)}        
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>4°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 4)} 
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>5°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 5)}        
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>6°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                {getDivScore(scores, 6)}  
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line">
                                <svg className="mx-auto mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-center w-full py-3">
                        <div className="flex-1">
                            <div className="text-xl font-semibold">{matches(scores)}</div>
                            <div className="text-custom-line text-sm ">Partite</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold">{victory(scores)}</div>
                            <div className="text-custom-line text-sm ">Vittorie</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold">{percentage()}%</div>
                            <div className="text-custom-line text-sm">Percentuale di vincita</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;