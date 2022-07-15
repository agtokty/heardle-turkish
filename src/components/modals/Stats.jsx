import { useModalData } from "./ModalContext";
import buildScore from "../player/GameResult";

function Stats() {

    const { dispatch, state: { currentModal } } = useModalData();

    const onClose = () => {
        dispatch({ type: 'Reset' })
    }

    if (currentModal !== "Stats") {
        return <></>
    }

    return (
        <div className="modal-background p-3 pointer-events-none">
            <div className="pointer-events-auto modal max-w-screen-xs w-full mx-auto top-20 relative rounded-sm" role="dialog" aria-modal="true">
                <div className="bg-custom-bg border border-custom-mg p-6 rounded">
                    <div className="flex items-center justify-center mb-6">
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
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>1°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>2°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>3°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>4°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>5°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-xs"> </div>
                                </div>
                            </div>
                            <div className="text-center border-right text-xs pt-1 text-custom-line"><span>6°</span></div>
                        </div>
                        <div className="flex flex-col items-stretch ">
                            <div className="h-32 relative w-9 flex justify-center items-end">
                                <div className="absolute bg-custom-mg w-6">
                                    <div className="h-full absolute text-center w-full py-1 text-custom-line"></div>
                                </div>
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
                            <div className="text-xl font-semibold">0</div>
                            <div className="text-custom-line text-sm ">Partite</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold">0</div>
                            <div className="text-custom-line text-sm ">Vittorie</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold">0%</div>
                            <div className="text-custom-line text-sm">Percentuale di vincita</div>
                        </div>
                    </div>
                    <div className="flex justify-between text-center w-full py-3 pt-0">
                        <div className="flex-1">
                            <div className="text-xl font-semibold">0</div>
                            <div className="text-custom-line text-sm">Punteggio Attuale</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-xl font-semibold">0</div>
                            <div className="text-custom-line text-sm">Miglior Punteggio</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;